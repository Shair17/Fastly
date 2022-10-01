import { z } from 'zod';

export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: 'Correo electrónico inválido' }),
});
