import {Type, Static} from '@sinclair/typebox';

export const GetOrderByIdParams = Type.Object(
  {
    id: Type.String({format: 'uuid'}),
  },
  {
    additionalProperties: false,
  },
);
export type GetOrderByIdParamsType = Static<typeof GetOrderByIdParams>;

export const DeleteOrderByIdParams = Type.Object(
  {
    id: Type.String({format: 'uuid'}),
  },
  {additionalProperties: false},
);
export type DeleteOrderByIdParamsType = Static<typeof DeleteOrderByIdParams>;
