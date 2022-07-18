import z from 'zod';
import {EMAIL_REGEX, PASSWORD_REGEX} from '@fastly/constants/regex';

export const SignInSchema = z.object({
  email: z.string().email({message: 'Correo electrónico inválido'}),
  password: z.string().regex(PASSWORD_REGEX, {message: 'Contraseña inválida'}),
});
