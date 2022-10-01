import {Static, Type} from '@sinclair/typebox';
import {PASSWORD_REGEX, DNI_REGEX} from '../../constants/regex';

export const GetAdminParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetAdminParamsType = Static<typeof GetAdminParams>;

export const CreateAdminBody = Type.Object(
  {
    name: Type.String({minLength: 5}),
    email: Type.String({format: 'email'}),
    password: Type.RegEx(PASSWORD_REGEX),
    dni: Type.RegEx(DNI_REGEX),
    phone: Type.String({minLength: 9, maxLength: 9}),
    address: Type.String({minLength: 5}),
    avatar: Type.Optional(Type.String()),
    birthDate: Type.String({format: 'date-time'}),
  },
  {
    additionalProperties: false,
  },
);
export type CreateAdminBodyType = Static<typeof CreateAdminBody>;

export const EditAdminParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type EditAdminParamsType = Static<typeof EditAdminParams>;
export const EditAdminBody = Type.Object(
  {
    name: Type.String({minLength: 5}),
    email: Type.String({format: 'email'}),
    password: Type.RegEx(PASSWORD_REGEX),
    dni: Type.RegEx(DNI_REGEX),
    phone: Type.String({minLength: 9, maxLength: 9}),
    address: Type.String({minLength: 5}),
    avatar: Type.Optional(Type.String()),
    birthDate: Type.String({format: 'date-time'}),
    isActive: Type.Boolean(),
  },
  {
    additionalProperties: false,
  },
);
export type EditAdminBodyType = Static<typeof EditAdminBody>;

export const DeleteAdminParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type DeleteAdminParamsType = Static<typeof DeleteAdminParams>;
