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

export const newProductSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  publisher: yup.string().required("Publisher is required"),
  author: yup.string().required("Author is required"),
  stock: yup
    .number()
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  genreId: yup
    .number()
    .required("Genre ID is required")
    .integer("Genre ID must be an integer"),
  images: yup
    .array()
    .of(yup.mixed().required("An image file is required"))
    .min(1, "At least one image is required"),
});

export const updateProductSchema = yup.object().shape({
  title: yup.string().optional(),
  description: yup.string().optional(),
  price: yup.number().positive("Price must be a positive number").optional(),
  publisher: yup.string().optional(),
  author: yup.string().optional(),
  stock: yup
    .number()
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .optional(),
  genreId: yup.number().integer("Genre ID must be an integer").optional(),
  images: yup
    .array()
    .of(yup.mixed().required("An image file is required"))
    .min(1, "At least one image is required")
    .optional(),
});

export const genreSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});
