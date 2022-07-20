import {Controller, GET} from 'fastify-decorators';
import {CustomerService} from './customer.service';
import {GetCustomerParams, GetCustomerParamsType} from './customer.schema';
import {Request, Reply} from '@fastly/interfaces/http';
import {
  adminOrCustomerIsAuthenticated,
  hasBearerToken,
  customerIsAuthenticated,
  adminIsAuthenticated,
} from '@fastly/shared/hooks/auth';

@Controller('/customers')
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
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async getCustomers(request: Request, reply: Reply) {
    return this.customerService.getCustomers();
  }

  @GET('/me', {
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async me(request: Request, reply: Reply) {
    return this.customerService.me(request.customerId);
  }
}
