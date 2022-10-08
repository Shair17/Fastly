import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
import {NotFound} from 'http-errors';
import {StoreService} from '../store/store.service';
import {CreateProductBodyType, EditProductBodyType} from './product.schema';
import {trimStrings} from '../../utils/trimStrings';
import {CustomerService} from '../customer/customer.service';

@Service('ProductServiceToken')
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly customerService: CustomerService,
    private readonly storeService: StoreService,
  ) {}

  async getMyProducts(customerId: string) {
    const foundCustomer = await this.customerService.getByIdOrThrow(customerId);

    const products = await this.databaseService.product.findMany({
      where: {
        store: {
          owner: {
            id: foundCustomer.id,
          },
        },
      },
    });

    if (!products) {
      throw new NotFound();
    }

    const response = products.map(store => {
      return {
        ...store,
        owner: {
          id: foundCustomer.id,
          email: foundCustomer.email,
        },
      };
    });

    return response;
  }

  count() {
    return this.databaseService.product.count();
  }

  async getProducts() {
    return this.databaseService.product.findMany();
  }

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

  async createProduct(data: CreateProductBodyType) {
    const [storeId, name, image, blurHash] = trimStrings(
      data.storeId,
      data.name,
      data.image,
      data.blurHash,
    );
    const {description, price} = data;

    const store = await this.storeService.getByIdOrThrow(storeId);

    const newProduct = await this.databaseService.product.create({
      data: {
        blurHash,
        description,
        price,
        image,
        name,
        store: {
          connect: {
            id: store.id,
          },
        },
      },
    });

    return {
      statusCode: 200,
      product: {
        ...newProduct,
      },
      success: true,
    };
  }

  async editProduct(id: string, data: EditProductBodyType) {
    const [storeId, name, image, blurHash] = trimStrings(
      data.storeId,
      data.name,
      data.image,
      data.blurHash,
    );
    const {price, description} = data;

    const [product, store] = await Promise.all([
      await this.getByIdOrThrow(id),
      await this.storeService.getByIdOrThrow(storeId),
    ]);

    const updatedProduct = await this.databaseService.product.update({
      where: {
        id: product.id,
      },
      data: {
        blurHash,
        description,
        image,
        name,
        price,
        store: {
          connect: {
            id: store.id,
          },
        },
      },
    });

    return {
      statusCode: 200,
      product: {
        ...updatedProduct,
      },
      success: true,
    };
  }

  async deleteProduct(id: string) {
    const product = await this.getByIdOrThrow(id);

    const deletedProduct = await this.databaseService.product.delete({
      where: {id: product.id},
    });

    return {
      statusCode: 200,
      success: true,
      message: `Product with id ${deletedProduct.id} was deleted.`,
    };
  }
}
