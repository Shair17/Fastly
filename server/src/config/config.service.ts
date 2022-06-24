import { FastifyInstance } from 'fastify';
import {
	Service,
	Initializer,
	Destructor,
	FastifyInstanceToken,
	getInstanceByToken,
} from 'fastify-decorators';
import { ConfigSchemaType } from './config.schema';

@Service('ConfigServiceToken')
export class ConfigService {
	private readonly fastify =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	get(key: keyof ConfigSchemaType) {
		return this.fastify.config[key];
	}

	getOrThrow(key: keyof ConfigSchemaType) {
		const config = this.fastify.config[key];

		if (config === undefined || config === null) {
			throw new Error(`Config with key ${key} doesn't exists.`);
		}

		return config;
	}
}
