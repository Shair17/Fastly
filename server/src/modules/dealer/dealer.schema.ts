import { Static, Type } from '@sinclair/typebox';

export const GetDealerParams = Type.Object({
	id: Type.String({ format: 'uuid' }),
});
export type GetDealerParamsType = Static<typeof GetDealerParams>;

export const GetDealerRankingParams = Type.Object({
	id: Type.String({ format: 'uuid' }),
});
export type GetDealerRankingParamsType = Static<typeof GetDealerRankingParams>;

export const GetDealerRankingsParams = Type.Object({
	id: Type.String({ format: 'uuid' }),
});
export type GetDealerRankingsParamsType = Static<
	typeof GetDealerRankingsParams
>;
