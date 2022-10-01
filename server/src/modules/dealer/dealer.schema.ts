import {Vehicle} from '@prisma/client';
import {Static, Type} from '@sinclair/typebox';
import {DNI_REGEX, PASSWORD_REGEX} from '../../constants/regex';

export const CreateDealerBody = Type.Object(
  {
    name: Type.String({minLength: 5}),
    email: Type.String({format: 'email'}),
    password: Type.RegEx(PASSWORD_REGEX),
    dni: Type.RegEx(DNI_REGEX),
    phone: Type.String({minLength: 9, maxLength: 9}),
    address: Type.String({minLength: 5}),
    avatar: Type.Optional(Type.String()),
    birthDate: Type.String({format: 'date-time'}),
    vehicle: Type.Enum(Vehicle),
  },
  {
    additionalProperties: false,
  },
);
export type CreateDealerBodyType = Static<typeof CreateDealerBody>;

export const EditDealerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type EditDealerParamsType = Static<typeof EditDealerParams>;

export const EditDealerBody = Type.Object(
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
    available: Type.Boolean(),
    isBanned: Type.Boolean(),
    banReason: Type.Optional(Type.String()),
    vehicle: Type.Enum(Vehicle),
  },
  {
    additionalProperties: false,
  },
);
export type EditDealerBodyType = Static<typeof EditDealerBody>;

export const DeleteDealerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type DeleteDealerParamsType = Static<typeof DeleteDealerParams>;

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
