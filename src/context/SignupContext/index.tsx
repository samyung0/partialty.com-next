import { createContext } from 'react';
import { type z } from 'zod';
import { type BioFormCombinedSchema } from '~/definition/signup';

export const defaultSignupValue = {
  email: '',
  password: '',
  rePassword: '',
  avatar: '',
  nickname: '',
  customAvatar: false,
};

export const signupContext = createContext<Partial<z.infer<typeof BioFormCombinedSchema>>>(defaultSignupValue);
