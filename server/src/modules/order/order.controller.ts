import { FastifyInstance } from 'fastify';
import {
	Controller,
	FastifyInstanceToken,
	GET as Get,
	getInstanceByToken,
} from 'fastify-decorators';
import { Request } from '../../interfaces/http.interfaces';

@Controller('/orders')
export class OrderController {
	private readonly fastify: FastifyInstance =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	@Get('/')
	index() {
		this.fastify.io.emit('hello from server');
		// return 'hello from /orders rest or websocket?';
	}
}
