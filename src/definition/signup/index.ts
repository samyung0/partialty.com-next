import z from "zod";
import { CloudinarySchema } from "../cloudinary";

export const SignupFormSchema = z
  .object({
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
    rePassword: z.string().min(1, "Please re-enter your password."),
  })
  .refine(
    (obj) => obj.rePassword === obj.password,
    "The two passwords are not the same!",
  );

export const SignupFormCombinedSchema = z
  .object({
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
    rePassword: z.string().min(1, "Please re-enter your password."),
    avatar: CloudinarySchema,
    nickname: z
      .string()
      .trim()
      .min(1, "You must enter a nickname!")
      .max(50, "Nickname is too long"),
    customAvatar: z.boolean(),
  })
  .refine(
    (obj) => obj.rePassword === obj.password,
    "The two passwords are not the same!",
  );

export type SignupFormCombinedState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        rePassword?: string[];
        nickname?: string[];
        avatar?: string[];
      };
      formErrors?: string[];
      message?: string;
      success: boolean
    }
  | undefined;
