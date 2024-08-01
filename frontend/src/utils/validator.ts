import * as yup from "yup";

type ValidationResult<T> = { error?: string; values?: T };

export const yupValidate = async <T extends object>(
  schema: yup.Schema,
  value: T
): Promise<ValidationResult<T>> => {
  try {
    const data = await schema.validate(value);
    return { values: data };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: error.message };
    } else {
      return { error: (error as any).message };
    }
  }
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

const PasswordAndEmailValidation = {
  email: yup.string().email("Invalid email!").required("Email is missing"),
  password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password should be at least 8 chars long!"),
};

export const newUserSchema = yup.object({
  name: yup.string().required("Name is missing"),
  ...PasswordAndEmailValidation,
});

export const signInSchema = yup.object({
  ...PasswordAndEmailValidation,
});

export const EditProfileSchema = yup.object({
  name: yup.string().required("Name is missing"),
  email: yup.string().email("Invalid email!").required("Email is missing"),
});
