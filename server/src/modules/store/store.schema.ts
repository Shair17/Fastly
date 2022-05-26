import { Static, Type } from '@sinclair/typebox';
import { StoreCategory } from '../../shared/enums/store-categories.enum';

export const GetStoreParams = Type.Object({
	id: Type.String({ format: 'uuid' }),
});
export type GetStoreParamsType = Static<typeof GetStoreParams>;

export const GetStoresQueryString = Type.Object(
	{
		category: Type.Optional(Type.String()),
	},
	{ additionalProperties: false }
);
export type GetStoresQueryStringType = Static<typeof GetStoresQueryString>;
