import {Type, Static} from '@sinclair/typebox';
import {StoreCategory} from '@prisma/client';
import {CUID_REGEX} from '../../constants/regex';

export const GetStoreForFeedParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type GetStoreForFeedParamsType = Static<typeof GetStoreForFeedParams>;

export const GetStoresByCategoryQueryString = Type.Object({
  category: Type.Enum(StoreCategory),

  skip: Type.Optional(Type.Number({minimum: 0})),
  take: Type.Optional(Type.Number({minimum: 0})),
  orderBy: Type.Union([Type.Literal('asc'), Type.Literal('desc')]),
});
export type GetStoresByCategoryQueryStringType = Static<
  typeof GetStoresByCategoryQueryString
>;

export const GetFeedStoresQueryString = Type.Object({
  skip: Type.Optional(Type.Number({minimum: 0})),
  take: Type.Optional(Type.Number({minimum: 0})),
  orderBy: Type.Union([Type.Literal('asc'), Type.Literal('desc')]),
});
export type GetFeedStoresQueryStringType = Static<
  typeof GetFeedStoresQueryString
>;

export const GetFeedProductsQueryString = Type.Object({
  skip: Type.Optional(Type.Number({minimum: 0})),
  take: Type.Optional(Type.Number({minimum: 0})),
  orderBy: Type.Union([Type.Literal('asc'), Type.Literal('desc')]),
});
export type GetFeedProductsQueryStringType = Static<
  typeof GetFeedProductsQueryString
>;
