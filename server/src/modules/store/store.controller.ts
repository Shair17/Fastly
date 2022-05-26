import { Controller, GET as Get } from 'fastify-decorators';
import { StoreService } from './store.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	userIsAuthenticated,
} from '../../shared/hooks/auth.hook';
import { GetStoreParams, GetStoreParamsType } from './store.schema';

@Controller('/stores')
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	@Get('/', {
		// onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async getStores() {
		return this.storeService.getStores();
	}

	@Get('/:id', {
		schema: {
			params: GetStoreParams,
		},
		// onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async getById(
		request: Request<{
			Params: GetStoreParamsType;
		}>,
		reply: Reply
	) {
		return this.storeService.getById(request.params.id);
	}

	@Get('/shair', {
		// onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async pruebita(request: Request, reply: Reply) {
		const { id, params, query } = request;
		console.log(id, params, query);
		return 'pruebita';
	}
}
