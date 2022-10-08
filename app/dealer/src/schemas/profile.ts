import z from 'zod';
import {PHONE_NUMBER_REGEX} from '@fastly/constants/regex';
import {VehicleEnum} from '@fastly/interfaces/app';

export const ProfileInformationSchema = z.object({
  email: z.string().email({message: 'Introduce un correo eletrónico válido.'}),
  name: z.string(),
  address: z.string(),
  phone: z.string().max(9).regex(PHONE_NUMBER_REGEX, {
    message: 'Introduce un número de celular válido.',
  }),
  // vehicle: z.nativeEnum(VehicleEnum)
});

// avatar
