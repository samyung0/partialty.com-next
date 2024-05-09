import z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(256, "Email is too long")
    .email("The email address is badly formatted."),
  password: z
    .string()
    .trim()
    .min(1, "Please enter your password.")
    .min(8, "You password must have 8 characters or more.")
    .max(36, "Password is too long"),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      formErrors?: string[];
      message?: string;
      success: boolean;
    }
  | undefined;
