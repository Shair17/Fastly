import {Service} from 'fastify-decorators';
import {DatabaseService} from '@fastly/database/DatabaseService';
import {NotFound} from 'http-errors';
import {Product} from '@prisma/client';
import {StoreService} from '../store/store.service';

@Service('ProductServiceToken')
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storeService: StoreService,
  ) {}

  async getById(id: string) {
    return this.databaseService.product.findUnique({where: {id}});
  }

  async getByIdOrThrow(id: string) {
    const product = await this.getById(id);

    if (!product) {
      throw new NotFound(`Product with id ${id} doesn't exists.`);
    }

    return product;
  }

  async createProduct(data: Product) {
    const store = await this.storeService.getByIdOrThrow(data.storeId);
    const {blurHash, image, name, description, price} = data;

    return this.databaseService.product.create({
      data: {
        blurHash,
        image,
        name,
        description,
        price,
        store: {
          connect: {
            id: store.id,
          },
        },
      },
    });
  }
}
