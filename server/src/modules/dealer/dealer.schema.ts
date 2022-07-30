import {Static, Type} from '@sinclair/typebox';

export const GetMyOrdersQueryString = Type.Object({
  skip: Type.Optional(Type.Number({minimum: 0})),
  take: Type.Optional(Type.Number({minimum: 0})),
  orderBy: Type.Union([Type.Literal('asc'), Type.Literal('desc')]),
});
export type GetMyOrdersQueryStringType = Static<typeof GetMyOrdersQueryString>;

export const GetIsActiveDealerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetIsActiveDealerParamsType = Static<
  typeof GetIsActiveDealerParams
>;

export const GetMyRankingsQueryString = Type.Object({
  skip: Type.Optional(Type.Number({minimum: 0})),
  take: Type.Optional(Type.Number({minimum: 0})),
  orderBy: Type.Union([Type.Literal('asc'), Type.Literal('desc')]),
});
export type GetMyRankingsQueryStringType = Static<
  typeof GetMyRankingsQueryString
>;

export const CreateDealerRankingParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type CreateDealerRankingParamsType = Static<
  typeof CreateDealerRankingParams
>;

export const CreateDealerRankingBody = Type.Object({
  userId: Type.String({format: 'uuid'}),
  comment: Type.Optional(Type.String()),
  value: Type.Number({minimum: 0, maximum: 5}),
});
export type CreateDealerRankingBodyType = Static<
  typeof CreateDealerRankingBody
>;

export const GetDealerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetDealerParamsType = Static<typeof GetDealerParams>;

export const GetDealerRankingParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetDealerRankingParamsType = Static<typeof GetDealerRankingParams>;

export const GetDealerRankingsParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetDealerRankingsParamsType = Static<
  typeof GetDealerRankingsParams
>;
