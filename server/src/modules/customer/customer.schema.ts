import {Static, Type} from '@sinclair/typebox';

export const GetCustomerParams = Type.Object({
  id: Type.String({format: 'uuid'}),
});
export type GetCustomerParamsType = Static<typeof GetCustomerParams>;
