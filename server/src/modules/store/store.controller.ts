import { Controller, GET as Get, POST as Post } from 'fastify-decorators';
import { StoreService } from './store.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	userIsAuthenticated,
	customerIsAuthenticated,
} from '../../shared/hooks/auth.hook';
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

	@Get('/', {
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
			return this.storeService.getByCategory(request.query.category);
		}

		// fallback
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

	@Get('/categories')
	async getCategories() {
		return this.storeService.getCategories();
	}

	@Post('/create', {
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
