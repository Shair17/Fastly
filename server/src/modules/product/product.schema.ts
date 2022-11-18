import {Type, Static} from '@sinclair/typebox';
import {CUID_REGEX} from '../../constants/regex';

export const GetProductByIdParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type GetProductByIdParamsType = Static<typeof GetProductByIdParams>;

export const CreateProductBody = Type.Object({
  storeId: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  price: Type.Number({minimum: 0}),
  image: Type.String(),
  blurHash: Type.String(),
});
export type CreateProductBodyType = Static<typeof CreateProductBody>;

export const EditProductParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type EditProductParamsType = Static<typeof EditProductParams>;

export const EditProductBody = Type.Object({
  storeId: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  price: Type.Number({minimum: 0}),
  image: Type.String(),
  blurHash: Type.String(),
});
export type EditProductBodyType = Static<typeof EditProductBody>;

export const DeleteProductParams = Type.Object({
  id: Type.RegEx(CUID_REGEX, {
    description: 'cuid unique identifier',
  }),
});
export type DeleteProductParamsType = Static<typeof DeleteProductParams>;
