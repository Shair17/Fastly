import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {Controller, DELETE, GET, POST, PUT} from 'fastify-decorators';
import {CustomerService} from './customer.service';
import {EditCustomerBodyType, EditCustomerParamsType} from './customer.schema';
import {
  GetCustomerParams,
  GetCustomerParamsType,
  CreateCustomerBody,
  CreateCustomerBodyType,
  DeleteCustomerByAdminParams,
  DeleteCustomerByAdminParamsType,
  EditCustomerBody,
  EditCustomerParams,
} from './customer.schema';
import {
  adminOrCustomerIsAuthenticated,
  hasBearerToken,
  customerIsAuthenticated,
  adminIsAuthenticated,
} from '../../shared/hooks/auth';

@Controller('/v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @GET('/count')
  async count() {
    return this.customerService.count();
  }

  @GET('/:id', {
    schema: {
      params: GetCustomerParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async getCustomer(
    request: Request<{
      Params: GetCustomerParamsType;
    }>,
    reply: Reply,
  ) {
    return this.customerService.me(request.params.id);
  }

  @GET('/', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async getCustomers(request: Request, reply: Reply) {
    return this.customerService.getCustomers();
  }

  @POST('/', {
    schema: {
      body: CreateCustomerBody,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async createCustomer(
    request: Request<{
      Body: CreateCustomerBodyType;
    }>,
    reply: Reply,
  ) {
    await this.customerService.createCustomer(request.body);

    return {
      statusCode: 200,
      message: 'Admin Created',
      success: true,
    };
  }

  @PUT('/:id', {
    schema: {
      body: EditCustomerBody,
      params: EditCustomerParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async EditAdmin(
    request: Request<{
      Body: EditCustomerBodyType;
      Params: EditCustomerParamsType;
    }>,
    reply: Reply,
  ) {
    await this.customerService.editCustomer(request.params.id, request.body);

    return {
      statusCode: 200,
      message: 'Customer Edited',
      success: true,
    };
  }

  @DELETE('/:id', {
    schema: {
      params: DeleteCustomerByAdminParams,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async deleteCustomer(
    request: Request<{
      Params: DeleteCustomerByAdminParamsType;
    }>,
    reply: Reply,
  ) {
    await this.customerService.deleteCustomer(request.params);

    return {
      statusCode: 200,
      message: 'Customer Deleted',
      success: true,
    };
  }

  @GET('/me', {
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async me(request: Request, reply: Reply) {
    return this.customerService.me(request.customerId);
  }

  @GET('/me/stores', {
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async getMyStores(request: Request, reply: Reply) {
    return this.customerService.getMyStores(request.customerId);
  }
}
