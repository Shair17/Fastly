import {Type, Static} from '@sinclair/typebox';

export const CreateOrderBody = Type.Object({
  userId: Type.String({format: 'uri'}),
  dealerId: Type.Optional(Type.String({format: 'uri'})),
  addressId: Type.String({format: 'uuid'}),
  productIDs: Type.Array(Type.String({format: 'uri'})),
  quantity: Type.Number(),
  message: Type.Optional(Type.String()),
});
export type CreateOrderBodyType = Static<typeof CreateOrderBody>;

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
