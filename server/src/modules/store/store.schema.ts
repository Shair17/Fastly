import { Static, Type } from '@sinclair/typebox';

export const GetStoreParams = Type.Object({
	id: Type.String({ format: 'uuid' }),
});
export type GetStoreParamsType = Static<typeof GetStoreParams>;
