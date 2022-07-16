import { Static, Type } from '@sinclair/typebox';

export const GetCouponByIdParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
});
export type GetCouponByIdParamsType = Static<typeof GetCouponByIdParams>;

export const GetCouponByCodeParams = Type.Object({
  code: Type.String({ minLength: 10, maxLength: 10 }),
});
export type GetCouponByCodeParamsType = Static<typeof GetCouponByCodeParams>;

export const CreateCouponBody = Type.Object({
  description: Type.Optional(Type.String()),
  discount: Type.Number({ default: 0 }),
  expiration: Type.Optional(Type.String({ format: 'date-time' })),
  productId: Type.String({ format: 'uuid' }),
});
export type CreateCouponBodyType = Static<typeof CreateCouponBody>;

export const EditCouponByIdParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
});
export type EditCouponByIdParamsType = Static<typeof EditCouponByIdParams>;
export const EditCouponByIdBody = Type.Object({
  description: Type.String(),
  discount: Type.Number({ default: 0 }),
  expiration: Type.String({ format: 'date-time' }),
  productId: Type.String({ format: 'uuid' }),
});
export type EditCouponByIdBodyType = Static<typeof EditCouponByIdBody>;
export const EditCouponByCodeParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
});
export type EditCouponByCodeParamsType = Static<typeof EditCouponByCodeParams>;
export const EditCouponByCodeBody = Type.Object({
  description: Type.String(),
  discount: Type.Number({ default: 0 }),
  expiration: Type.String({ format: 'date-time' }),
  productId: Type.String({ format: 'uuid' }),
});
export type EditCouponByCodeBodyType = Static<typeof EditCouponByCodeBody>;

export const DeleteCouponByIdParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
});
export type DeleteCouponByIdParamsType = Static<typeof DeleteCouponByIdParams>;

export const DeleteCouponByCodeParams = Type.Object({
  code: Type.String({ minLength: 10, maxLength: 10 }),
});
export type DeleteCouponByCodeParamsType = Static<
  typeof DeleteCouponByCodeParams
>;
