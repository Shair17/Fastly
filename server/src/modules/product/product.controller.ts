import {Controller, GET, POST, PUT, DELETE} from 'fastify-decorators';
import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {ProductService} from './product.service';
import {
  GetProductByIdParams,
  GetProductByIdParamsType,
  CreateProductBody,
  CreateProductBodyType,
  EditProductParams,
  EditProductBody,
  EditProductParamsType,
  EditProductBodyType,
  DeleteProductParams,
  DeleteProductParamsType,
} from './product.schema';
import {
  hasBearerToken,
  adminOrCustomerIsAuthenticated,
  customerIsAuthenticated,
} from '../../shared/hooks/auth';

@Controller('/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GET('/my-products', {
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async getMyProducts(request: Request, reply: Reply) {
    return this.productService.getMyProducts(request.customerId);
  }

  @GET('/', {
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async getProducts() {
    return this.productService.getProducts();
  }

  @GET('/:id', {
    schema: {
      params: GetProductByIdParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async getProduct(
    request: Request<{
      Params: GetProductByIdParamsType;
    }>,
    reply: Reply,
  ) {
    return this.productService.getByIdOrThrow(request.params.id);
  }

  @POST('/', {
    schema: {
      body: CreateProductBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async createProduct(
    request: Request<{
      Body: CreateProductBodyType;
    }>,
    reply: Reply,
  ) {
    return this.productService.createProduct(request.body);
  }

  @PUT('/:id', {
    schema: {
      params: EditProductParams,
      body: EditProductBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async editProduct(
    request: Request<{
      Params: EditProductParamsType;
      Body: EditProductBodyType;
    }>,
    reply: Reply,
  ) {
    return this.productService.editProduct(request.params.id, request.body);
  }

  @DELETE('/:id', {
    schema: {
      params: DeleteProductParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async deleteProduct(
    request: Request<{
      Params: DeleteProductParamsType;
    }>,
    reply: Reply,
  ) {
    return this.productService.deleteProduct(request.params.id);
  }
}
