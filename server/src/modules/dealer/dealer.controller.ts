import { Controller, GET as Get } from 'fastify-decorators';
import { DealerService } from './dealer.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	dealerIsAuthenticated,
} from '../../shared/hooks/auth.hook';

@Controller('/dealers')
export class DealerController {
	constructor(private readonly dealerService: DealerService) {}

	@Get('/me', {
		onRequest: [hasBearerToken, dealerIsAuthenticated],
	})
	async me({ dealerId }: Request, reply: Reply) {
		return this.dealerService.me(dealerId);
	}
}
