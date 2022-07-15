import { Static, Type } from '@sinclair/typebox';
import { StoreCategory } from '@prisma/client';

export const GetStoreParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
});
export type GetStoreParamsType = Static<typeof GetStoreParams>;

export const GetStoresQueryString = Type.Object(
  {
    category: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);
export type GetStoresQueryStringType = Static<typeof GetStoresQueryString>;

export const CreateStoreBody = Type.Object(
  {
    owner: Type.String({ format: 'uuid' }),
    logo: Type.Optional(Type.String({ format: 'uri' })),
    name: Type.String(),
    description: Type.Optional(Type.String()),
    address: Type.String(),
    category: Type.Enum(StoreCategory),
    categoryDescription: Type.Optional(Type.String()),
    openTime: Type.Optional(Type.String({ format: 'date-time' })),
    closeTime: Type.Optional(Type.String({ format: 'date-time' })),
  },
  { additionalProperties: false },
);
export type CreateStoreBodyType = Static<typeof CreateStoreBody>;
