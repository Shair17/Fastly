import { Controller, GET, POST } from 'fastify-decorators';
import { Request, Reply } from '@fastly/interfaces/http';
import {
	hasBearerToken,
	userIsAuthenticated,
	customerIsAuthenticated,
} from '@fastly/shared/hooks/auth';
import { StoreService } from './store.service';
import {
	CreateStoreBody,
	GetStoreParams,
	CreateStoreBodyType,
	GetStoreParamsType,
	GetStoresQueryString,
	GetStoresQueryStringType,
} from './store.schema';

@Controller('/stores')
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	@GET('/', {
		schema: {
			querystring: GetStoresQueryString,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async getStoresByQueryString(
		request: Request<{
			Querystring: GetStoresQueryStringType;
		}>,
		reply: Reply
	) {
		if (request.query.category) {
			return this.storeService.getStoresByCategory(request.query.category);
		}

		// fallback
		return this.storeService.getStores();
	}

	@GET('/:id', {
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

	@GET('/categories')
	async getCategories() {
		return this.storeService.getCategories();
	}

	@POST('/create', {
		schema: {
			body: CreateStoreBody,
		},
		onRequest: [hasBearerToken, customerIsAuthenticated],
	})
	async createStore(
		request: Request<{
			Body: CreateStoreBodyType;
		}>
	) {
		return this.storeService.createStore(request.body);
	}
}
