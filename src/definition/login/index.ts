import z from 'zod';

export const LoginFormSchema = z.object({
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
