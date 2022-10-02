import { z } from 'zod';
import { PASSWORD_REGEX } from '@fastly/constants/regex.constants';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Correo electrónico inválido' }),
	password: z
		.string()
		.regex(PASSWORD_REGEX, { message: 'Contraseña inválida' }),
});
