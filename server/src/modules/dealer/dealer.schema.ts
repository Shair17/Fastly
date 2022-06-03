import { Static, Type } from '@sinclair/typebox';

export const GetDealerParams = Type.Object({
	id: Type.String({ format: 'uuid' }),
});
export type GetDealerParamsType = Static<typeof GetDealerParams>;
