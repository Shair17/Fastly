import { FastifyInstance } from 'fastify';
import {
	Controller,
	FastifyInstanceToken,
	GET as Get,
	getInstanceByToken,
} from 'fastify-decorators';

@Controller('/orders')
export class OrderController {
	private readonly fastify: FastifyInstance =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	@Get('/')
	index() {
		return {};
	}
}
