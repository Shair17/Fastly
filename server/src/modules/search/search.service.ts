import { Service } from 'fastify-decorators';
import { ProductService } from '../product/product.service';
import { StoreService } from '../store/store.service';

@Service('SearchServiceToken')
export class SearchService {
	constructor(
		private readonly productService: ProductService,
		private readonly storeService: StoreService
	) {}
}
