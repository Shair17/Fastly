import { Controller, GET as Get } from 'fastify-decorators';
import { CustomerService } from './customer.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import { GetCustomerParams, GetCustomerParamsType } from './customer.schema';
import {
	hasBearerToken,
	customerIsAuthenticated,
	adminIsAuthenticated,
} from '../../shared/hooks/auth.hook';

@Controller('/customers')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get('/count')
	async count() {
		return this.customerService.count();
	}

	@Get('/:id', {
		schema: {
			params: GetCustomerParams,
		},
	})
	async getAdmin(
		request: Request<{
			Params: GetCustomerParamsType;
		}>,
		reply: Reply
	) {
		return this.customerService.me(request.params.id);
	}

	@Get('/', {
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async getCustomers(request: Request, reply: Reply) {
		return this.customerService.getCustomers();
	}

	@Get('/me', {
		onRequest: [hasBearerToken, customerIsAuthenticated],
	})
	async me({ customerId }: Request, reply: Reply) {
		return this.customerService.me(customerId);
	}
}
