import { FastifyInstance } from 'fastify';
import {
	Service,
	FastifyInstanceToken,
	getInstanceByToken,
} from 'fastify-decorators';
import { ConfigSchemaType } from './config.schema';

@Service('ConfigServiceToken')
export class ConfigService {
	private readonly fastify =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	configExists(key: keyof ConfigSchemaType): boolean {
		return !!this.fastify.config[key];
	}

	get(key: keyof ConfigSchemaType) {
		return this.fastify.config[key];
	}

	getOrThrow(key: keyof ConfigSchemaType) {
		const config = this.fastify.config[key];

		if (!config) {
			throw new Error(`Config with key ${key} doesn't exists.`);
		}

		return config;
	}
}
