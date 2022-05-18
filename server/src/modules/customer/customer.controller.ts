import { Controller, GET as Get } from 'fastify-decorators';
import { CustomerService } from './customer.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	customerIsAuthenticated,
} from '../../shared/hooks/auth.hook';

@Controller('/customers')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get('/count')
	async count() {
		return this.customerService.count();
	}

	@Get('/me', {
		onRequest: [hasBearerToken, customerIsAuthenticated],
	})
	async me({ customerId }: Request, reply: Reply) {
		return this.customerService.me(customerId);
	}
}
