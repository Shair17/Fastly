import {Static, Type} from '@sinclair/typebox';
import {StoreCategory} from '@prisma/client';
import {CUID_REGEX} from '../../constants/regex';

export const EditStoreParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type EditStoreParamsType = Static<typeof EditStoreParams>;

export const GetStoreParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type GetStoreParamsType = Static<typeof GetStoreParams>;

export const GetProductsByStore = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type GetProductsByStoreType = Static<typeof GetProductsByStore>;

export const GetStoresQueryString = Type.Object(
  {
    category: Type.Optional(Type.String()),
  },
  {additionalProperties: false},
);
export type GetStoresQueryStringType = Static<typeof GetStoresQueryString>;

export const CreateStoreBody = Type.Object(
  {
    owner: Type.String({format: 'email'}),
    logo: Type.String(),
    name: Type.String(),
    description: Type.String(),
    address: Type.String(),
    category: Type.Enum(StoreCategory),
    categoryDescription: Type.Optional(Type.String()),
    openTime: Type.Optional(Type.String({format: 'date-time'})),
    closeTime: Type.Optional(Type.String({format: 'date-time'})),
  },
  {additionalProperties: false},
);
export type CreateStoreBodyType = Static<typeof CreateStoreBody>;

export const EditStoreBody = Type.Object(
  {
    owner: Type.RegEx(CUID_REGEX, {
      description: 'cuid unique identifier',
    }),
    logo: Type.String(),
    name: Type.String(),
    description: Type.String(),
    address: Type.String(),
    category: Type.Enum(StoreCategory),
    categoryDescription: Type.String(),
    openTime: Type.Optional(Type.String({format: 'date-time'})),
    closeTime: Type.Optional(Type.String({format: 'date-time'})),
  },
  {additionalProperties: false},
);
export type EditStoreBodyType = Static<typeof EditStoreBody>;

export const DeleteStoreParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type DeleteStoreParamsType = Static<typeof DeleteStoreParams>;

export const CreateRankingByStoreIdParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type CreateRankingByStoreIdParamsType = Static<
  typeof CreateRankingByStoreIdParams
>;

export const CreateRankingByStoreIdBody = Type.Object({
  userId: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
  comment: Type.Optional(Type.String()),
  value: Type.Number({minimum: 0, maximum: 5}),
});
export type CreateRankingByStoreIdBodyType = Static<
  typeof CreateRankingByStoreIdBody
>;

export const GetRankingsByStoreIdParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type GetRankingsByStoreIdParamsType = Static<
  typeof GetRankingsByStoreIdParams
>;
