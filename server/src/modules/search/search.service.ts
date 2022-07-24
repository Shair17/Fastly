import {Service} from 'fastify-decorators';
import {DatabaseService} from '@fastly/database/DatabaseService';
import {ProductService} from '@fastly/modules/product/product.service';
import {StoreService} from '@fastly/modules/store/store.service';

@Service('SearchServiceToken')
export class SearchService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
  ) {}
}
