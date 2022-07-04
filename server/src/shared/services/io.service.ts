import { FastifyInstance } from 'fastify';
import {
	Controller,
	FastifyInstanceToken,
	GET as Get,
	getInstanceByToken,
	Service,
} from 'fastify-decorators';

@Service()
export class IOService {
	private readonly fastify: FastifyInstance =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	public get io() {
		return this.fastify.io;
	}
}
