import z from 'zod';
import { CloudinarySchema } from '../cloudinary';

export const PasswordFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Wheres your email bro.')
    .max(256, 'Email is too long')
    .email("Nah, this ain't an email."),
  password: z
    .string()
    .trim()
    .min(1, 'Where the password bro.')
    .min(8, 'Too short, make it at least 8 charcacters.')
    .max(36, 'Too long, limit it to 36 characters.'),
  rePassword: z.string().trim().min(1, 'Gotta re-enter your password.'),
});

export const BioFormCombinedSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Wheres your email bro.')
    .max(256, 'Email is too long')
    .email("Nah, this ain't an email."),
  password: z
    .string()
    .trim()
    .min(1, 'Where the password bro.')
    .min(8, 'Too short, make it at least 8 charcacters.')
    .max(36, 'Too long, limit it to 36 characters.'),
  rePassword: z.string().trim().min(1, 'Gotta re-enter your password.'),
  avatar: z.string(),
  nickname: z.string().trim().min(1, 'Make yourself a nice nickname.').max(50, 'Too long, limit it to 50 characters.'),
  customAvatar: z.boolean(),
});

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
      success: boolean;
    }
  | undefined;
