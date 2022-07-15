import { Controller, GET } from 'fastify-decorators';
import { DealerService } from './dealer.service';
import { Request, Reply } from '@fastly/interfaces/http';
import {
	hasBearerToken,
	dealerIsAuthenticated,
	adminIsAuthenticated,
	adminOrCustomerOrDealerOrUserIsAuthenticated,
} from '@fastly/shared/hooks/auth';
import {
	GetDealerParams,
	GetDealerParamsType,
	GetDealerRankingParams,
	GetDealerRankingParamsType,
	GetDealerRankingsParams,
	GetDealerRankingsParamsType,
} from './dealer.schema';

@Controller('/dealers')
export class DealerController {
	constructor(private readonly dealerService: DealerService) {}

	@GET('/count')
	async count() {
		return this.dealerService.count();
	}

	@GET('/:id', {
		schema: {
			params: GetDealerParams,
		},
	})
	async getDealer(
		request: Request<{
			Params: GetDealerParamsType;
		}>,
		reply: Reply
	) {
		return this.dealerService.me(request.params.id);
	}

	@GET('/:id/ranking', {
		schema: {
			params: GetDealerRankingParams,
		},
		onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
	})
	getDealerRanking(
		request: Request<{
			Params: GetDealerRankingParamsType;
		}>,
		reply: Reply
	) {
		return this.dealerService.getDealerRanking(request.params.id);
	}

	@GET('/:id/rankings', {
		schema: {
			params: GetDealerRankingsParams,
		},
		onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
	})
	getDealerRankings(
		request: Request<{
			Params: GetDealerRankingsParamsType;
		}>,
		reply: Reply
	) {
		return this.dealerService.getDealerRankings(request.params.id);
	}

	@GET('/', {
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async getDealers(request: Request, reply: Reply) {
		return this.dealerService.getDealers();
	}

	@GET('/me', {
		onRequest: [hasBearerToken, dealerIsAuthenticated],
	})
	async me({ dealerId }: Request, reply: Reply) {
		return this.dealerService.me(dealerId);
	}
}
