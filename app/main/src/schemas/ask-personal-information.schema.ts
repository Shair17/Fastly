import z from 'zod';
import {DNI_REGEX, PHONE_NUMBER_REGEX} from '../constants/regex';

export const AskPersonalInformationSchema = z.object({
  email: z.string().email({message: 'Introduce un correo eletrónico válido.'}),
  phone: z.string().max(9).regex(PHONE_NUMBER_REGEX, {
    message: 'Introduce un número de celular válido.',
  }),
  dni: z
    .string()
    .min(8)
    .max(8)
    .regex(DNI_REGEX, {message: 'Introduce un DNI válido.'}),
});
