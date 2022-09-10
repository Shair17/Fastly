import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
import {ProductService} from '../../modules/product/product.service';
import {StoreService} from '../../modules/store/store.service';

@Service('SearchServiceToken')
export class SearchService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
  ) {}
}
