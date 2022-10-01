import { z } from 'zod';
import { PASSWORD_REGEX } from '../constants/regex.constants';

export const newPasswordSchema = z
	.object({
		password: z
			.string()
			.regex(PASSWORD_REGEX, { message: 'Nueva contraseña inválida' }),
		confirmPassword: z.string().regex(PASSWORD_REGEX, {
			message: 'Confirmación de nueva contraseña inválida',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	});
