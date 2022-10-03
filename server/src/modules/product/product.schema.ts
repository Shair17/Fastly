import {Type, Static} from '@sinclair/typebox';

export const GetProductByIdParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetProductByIdParamsType = Static<typeof GetProductByIdParams>;

export const CreateProductBody = Type.Object({
  storeId: Type.String({format: 'uuid'}),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  price: Type.Number({minimum: 0}),
  image: Type.String(),
  blurHash: Type.String(),
});
export type CreateProductBodyType = Static<typeof CreateProductBody>;

export const EditProductParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type EditProductParamsType = Static<typeof EditProductParams>;

export const EditProductBody = Type.Object({
  storeId: Type.String({format: 'uuid'}),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  price: Type.Number({minimum: 0}),
  image: Type.String(),
  blurHash: Type.String(),
});
export type EditProductBodyType = Static<typeof EditProductBody>;

export const DeleteProductParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type DeleteProductParamsType = Static<typeof DeleteProductParams>;
