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

	private get io() {
		return this.fastify.io;
	}

	@Get('/')
	index() {
		this.io.on('connection', (socket) => {
			console.log('a user has been connected');
		});
	}
}
