import {Static, Type} from '@sinclair/typebox';
import {PASSWORD_REGEX, DNI_REGEX} from '../../constants/regex';

export const GetCustomerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetCustomerParamsType = Static<typeof GetCustomerParams>;

export const DeleteCustomerByAdminParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type DeleteCustomerByAdminParamsType = Static<
  typeof DeleteCustomerByAdminParams
>;

export const EditCustomerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type EditCustomerParamsType = Static<typeof EditCustomerParams>;
export const EditCustomerBody = Type.Object(
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
export type EditCustomerBodyType = Static<typeof EditCustomerBody>;

export const BanCustomerByAdminParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type BanCustomerByAdminParamsType = Static<
  typeof BanCustomerByAdminParams
>;

export const BanCustomerByAdminBody = Type.Object({
  reason: Type.Optional(Type.String()),
});
export type BanCustomerByAdminBodyType = Static<typeof BanCustomerByAdminBody>;

export const CreateCustomerBody = Type.Object(
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
export type CreateCustomerBodyType = Static<typeof CreateCustomerBody>;
