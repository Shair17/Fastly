import z from 'zod';

export const AskPersonalInformationSchema = z.object({
  email: z.string().email({message: 'Introduce un correo eletrónico válido.'}),
  phone: z
    .string()
    .max(9)
    .regex(/^[9]\d{8}$/, {message: 'Introduce un número de celular válido.'}),
  dni: z.string().min(8).max(8, {message: 'Introduce un DNI válido.'}),
});
