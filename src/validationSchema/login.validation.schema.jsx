import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .trim()
    .email("Must be a valid email address.")
    .lowercase(),
  password: Yup.string().required("Password is required."),
});
