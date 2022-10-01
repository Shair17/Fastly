import { z } from 'zod';
import { DNI_REGEX, PASSWORD_REGEX } from '../constants/regex.constants';
import { Vehicle } from '../interfaces/appInterfaces';

export const registerDealerSchema = z
	.object({
		fullName: z.string().min(5, { message: 'Introduce tu nombre completo' }),
		email: z.string().email({ message: 'Correo electrónico inválido' }),
		password: z
			.string()
			.regex(PASSWORD_REGEX, { message: 'Contraseña inválida' }),
		confirmPassword: z
			.string()
			.regex(PASSWORD_REGEX, { message: 'Contraseña inválida' }),
		dni: z.string().min(8).max(8).regex(DNI_REGEX, { message: 'DNI inválido' }),
		phone: z.string().min(9).max(9, { message: 'Número de celular inválido' }),
		address: z.string().min(5, { message: 'Dirección inválida' }),
		birthDate: z.date(),
		isActive: z.boolean(),
		available: z.boolean(),
		isBanned: z.boolean(),
		banReason: z.optional(z.string()),
		vehicle: z.nativeEnum(Vehicle),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'], // path of error
	});

export const registerSchema = z
	.object({
		fullName: z.string().min(5, { message: 'Introduce tu nombre completo' }),
		email: z.string().email({ message: 'Correo electrónico inválido' }),
		password: z
			.string()
			.regex(PASSWORD_REGEX, { message: 'Contraseña inválida' }),
		confirmPassword: z
			.string()
			.regex(PASSWORD_REGEX, { message: 'Contraseña inválida' }),
		dni: z.string().min(8).max(8).regex(DNI_REGEX, { message: 'DNI inválido' }),
		phone: z.string().min(9).max(9, { message: 'Número de celular inválido' }),
		address: z.string().min(5, { message: 'Dirección inválida' }),
		birthDate: z.date(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'], // path of error
	});
