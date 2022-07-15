import { Type, Static } from '@sinclair/typebox';
import { UserAddressTag } from '@prisma/client';
import {
  LATITUDE_REGEX,
  LONGITUDE_REGEX,
  PHONE_NUMBER_REGEX,
  DNI_REGEX,
} from '@fastly/constants/regex';

export const UpdateNewUserBody = Type.Object(
  {
    avatar: Type.Optional(Type.String()),
    email: Type.String({ format: 'email' }),
    phone: Type.RegEx(PHONE_NUMBER_REGEX),
    dni: Type.RegEx(DNI_REGEX),
    address: Type.Object(
      {
        name: Type.String(),
        street: Type.String(),
        instructions: Type.String(),
        zip: Type.String(),
        city: Type.String(),
        tag: Type.Enum(UserAddressTag),
        latitude: Type.Number(Type.RegEx(LATITUDE_REGEX)),
        longitude: Type.Number(Type.RegEx(LONGITUDE_REGEX)),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);
export type UpdateNewUserBodyType = Static<typeof UpdateNewUserBody>;

export const MyAddressParams = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
  },
  {
    additionalProperties: false,
  },
);
export type MyAddressParamsType = Static<typeof MyAddressParams>;

export const DeleteAddressParams = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
  },
  {
    additionalProperties: false,
  },
);
export type DeleteAddressParamsType = Static<typeof DeleteAddressParams>;

export const AddAddressBody = Type.Object(
  {
    name: Type.String(),
    street: Type.String(),
    instructions: Type.String(),
    zip: Type.String(),
    city: Type.String(),
    tag: Type.Enum(UserAddressTag),
    latitude: Type.Number(Type.RegEx(LATITUDE_REGEX)),
    longitude: Type.Number(Type.RegEx(LONGITUDE_REGEX)),
  },
  { additionalProperties: false },
);
export type AddAddressBodyType = Static<typeof AddAddressBody>;

export const MyFavoriteParams = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
  },
  { additionalProperties: false },
);
export type MyFavoriteParamsType = Static<typeof MyFavoriteParams>;

export const UpdateUserProfileBody = Type.Object(
  {
    avatar: Type.Optional(Type.String()),
    email: Type.String({ format: 'email' }),
    phone: Type.RegEx(PHONE_NUMBER_REGEX),
    dni: Type.RegEx(DNI_REGEX),
  },
  { additionalProperties: false },
);
export type UpdateUserProfileBodyType = Static<typeof UpdateUserProfileBody>;

export const MyItemCartParams = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
  },
  { additionalProperties: false },
);
export type MyItemCartParamsType = Static<typeof MyItemCartParams>;

export const AddItemCartBody = Type.Object(
  {
    productId: Type.String({ format: 'uuid' }),
    quantity: Type.Number({ minimum: 0, default: 0 }),
  },
  { additionalProperties: false },
);
export type AddItemCartBodyType = Static<typeof AddItemCartBody>;

export const EditItemCartQuantityParams = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
  },
  { additionalProperties: false },
);
export type EditItemCartQuantityParamsType = Static<
  typeof EditItemCartQuantityParams
>;

export const EditItemCartQuantityBody = Type.Object(
  {
    quantity: Type.Number({ minimum: 0, default: 1 }),
  },
  {
    additionalProperties: false,
  },
);
export type EditItemCartQuantityBodyType = Static<
  typeof EditItemCartQuantityBody
>;

export const DeleteFavoriteParams = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
  },
  {
    additionalProperties: false,
  },
);
export type DeleteFavoriteParamsType = Static<typeof DeleteFavoriteParams>;
