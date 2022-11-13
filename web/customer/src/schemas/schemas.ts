import {z} from 'zod';
import {
  DNI_REGEX,
  PASSWORD_REGEX,
  URL_REGEX,
  UUID_REGEX,
} from '@fastly/constants/regex.constants';
import {StoreCategory, Vehicle} from '@fastly/interfaces/appInterfaces';

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(PASSWORD_REGEX, {message: 'Nueva contraseña inválida'}),
    confirmPassword: z.string().regex(PASSWORD_REGEX, {
      message: 'Confirmación de nueva contraseña inválida',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email({message: 'Correo electrónico inválido'}),
  password: z.string().regex(PASSWORD_REGEX, {message: 'Contraseña inválida'}),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({message: 'Correo electrónico inválido'}),
});

export const registerStoreSchema = z.object({
  owner: z.string().email({message: 'Correo electrónico inválido'}),
  name: z.string(),
  address: z.string(),
  description: z.string(),
  categoryDescription: z.optional(z.string()),
  openTime: z.optional(z.date()),
  closeTime: z.optional(z.date()),
  logo: z.any(),
  category: z.nativeEnum(StoreCategory),
});

export const registerDealerSchema = z
  .object({
    fullName: z.string().min(5, {message: 'Introduce tu nombre completo'}),
    email: z.string().email({message: 'Correo electrónico inválido'}),
    password: z
      .string()
      .regex(PASSWORD_REGEX, {message: 'Contraseña inválida'}),
    confirmPassword: z
      .string()
      .regex(PASSWORD_REGEX, {message: 'Contraseña inválida'}),
    dni: z.string().min(8).max(8).regex(DNI_REGEX, {message: 'DNI inválido'}),
    phone: z.string().min(9).max(9, {message: 'Número de celular inválido'}),
    address: z.string().min(5, {message: 'Dirección inválida'}),
    birthDate: z.date(),
    isActive: z.boolean(),
    available: z.boolean(),
    isBanned: z.boolean(),
    banReason: z.optional(z.string()),
    vehicle: z.nativeEnum(Vehicle),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export const registerSchema = z
  .object({
    fullName: z.string().min(5, {message: 'Introduce tu nombre completo'}),
    email: z.string().email({message: 'Correo electrónico inválido'}),
    password: z
      .string()
      .regex(PASSWORD_REGEX, {message: 'Contraseña inválida'}),
    confirmPassword: z
      .string()
      .regex(PASSWORD_REGEX, {message: 'Contraseña inválida'}),
    dni: z.string().min(8).max(8).regex(DNI_REGEX, {message: 'DNI inválido'}),
    phone: z.string().min(9).max(9, {message: 'Número de celular inválido'}),
    address: z.string().min(5, {message: 'Dirección inválida'}),
    birthDate: z.date(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export const editStoreSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  address: z.string(),
  category: z.nativeEnum(StoreCategory),
  categoryDescription: z.optional(z.string()),
  openTime: z.optional(z.date()),
  closeTime: z.optional(z.date()),
  logo: z.any(),
});

export const createProductSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  price: z.number().min(0, {message: 'Ingresa un precio válido.'}),
  image: z.any(),
  blurHash: z.string(),
});

export const registerProductSchema = z.object({
  storeId: z
    .string()
    .regex(UUID_REGEX, {message: 'Identificador del negocio inválido.'}),
  name: z.string(),
  description: z.optional(z.string()),
  price: z.number().min(0, {message: 'Ingresa un precio válido.'}),
  image: z.any(),
  blurHash: z.string(),
});

export const editProductSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  price: z.number(),
  blurHash: z.string(),
  storeId: z
    .string()
    .regex(UUID_REGEX, {message: 'Identificador del negocio inválido.'}),
  image: z.any(),
});
