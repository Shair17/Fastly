import { Controller, GET as Get } from 'fastify-decorators';
import { DealerService } from './dealer.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	dealerIsAuthenticated,
	adminIsAuthenticated,
	adminOrCustomerOrDealerOrUserIsAuthenticated,
} from '../../shared/hooks/auth.hook';
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

	@Get('/count')
	async count() {
		return this.dealerService.count();
	}

	@Get('/:id', {
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

	@Get('/:id/ranking', {
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

	@Get('/:id/rankings', {
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

	@Get('/', {
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async getDealers(request: Request, reply: Reply) {
		return this.dealerService.getDealers();
	}

	@Get('/me', {
		onRequest: [hasBearerToken, dealerIsAuthenticated],
	})
	async me({ dealerId }: Request, reply: Reply) {
		return this.dealerService.me(dealerId);
	}
}
