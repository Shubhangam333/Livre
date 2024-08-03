import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

const SignUpPassword = {
  password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password should be at least 8 chars long!")
    .matches(passwordRegex, "Password is too simple."),
};

const SignInPassword = {
  password: yup.string().required("Password is missing"),
};

export const SignUpInputSchema = yup.object({
  name: yup.string().required("Name is missing"),
  email: yup.string().email("Invalid email!").required("Email is missing"),
  ...SignUpPassword,
});

export const SignInInputSchema = yup.object({
  email: yup.string().email("Invalid email!").required("Email is missing"),
  ...SignInPassword,
});

export const productInputValidatorSchema = yup.object().shape({
  title: yup.string().required().max(255),
  description: yup.string().required(),
  price: yup.number().required().positive(),
  rating: yup.number().min(0).max(5).nullable(),
  publisher: yup.string().required().max(255),
  author: yup.string().required().max(255),
  stock: yup.number().required().min(0),
  genreId: yup.number().required(),
});
