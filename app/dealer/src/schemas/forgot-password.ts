import z from 'zod';
import {EMAIL_REGEX} from '@fastly/constants/regex';

export const ForgotPasswordSchema = z.object({
  email: z.string().email({message: 'Correo electrónico inválido'}),
});
