import 'reflect-metadata';

import Fastify, {
	FastifyServerOptions,
	FastifyInstance,
	FastifyLoggerInstance,
} from 'fastify';
import { Server as IServer, IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { StatusCodes } from 'http-status-codes';
import { bootstrap } from 'fastify-decorators';
import { AppModule } from './app.module';
import { ConfigSchema, ConfigSchemaType } from './config/config.schema';

declare module 'fastify' {
	interface FastifyRequest {
		userId: string;
		adminId: string;
		customerId: string;
		dealerId: string;
	}

	interface FastifyInstance {
		config: ConfigSchemaType;
		// config: {
		// 	PORT: string;

		// 	DATABASE_TYPE: string;
		// 	DATABASE_HOST: string;
		// 	DATABASE_PORT: number;
		// 	DATABASE_USERNAME: string;
		// 	DATABASE_PASSWORD: string;
		// 	DATABASE_NAME: string;

		// 	JWT_USER_SECRET: string;
		// 	JWT_USER_SECRET_EXPIRES_IN: string;
		// 	JWT_USER_REFRESH_SECRET: string;
		// 	JWT_USER_REFRESH_SECRET_EXPIRES_IN: string;
		// 	JWT_ADMIN_SECRET: string;
		// 	JWT_ADMIN_SECRET_EXPIRES_IN: string;
		// 	JWT_ADMIN_REFRESH_SECRET: string;
		// 	JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN: string;
		// 	JWT_FORGOT_ADMIN_PASSWORD_SECRET: string;
		// 	JWT_FORGOT_ADMIN_PASSWORD_SECRET_EXPIRES_IN: string;
		// 	JWT_CUSTOMER_SECRET: string;
		// 	JWT_CUSTOMER_SECRET_EXPIRES_IN: string;
		// 	JWT_CUSTOMER_REFRESH_SECRET: string;
		// 	JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN: string;
		// 	JWT_FORGOT_CUSTOMER_PASSWORD_SECRET: string;
		// 	JWT_FORGOT_CUSTOMER_PASSWORD_SECRET_EXPIRES_IN: string;
		// 	JWT_DEALER_SECRET: string;
		// 	JWT_DEALER_SECRET_EXPIRES_IN: string;
		// 	JWT_DEALER_REFRESH_SECRET: string;
		// 	JWT_DEALER_REFRESH_SECRET_EXPIRES_IN: string;
		// 	JWT_FORGOT_DEALER_PASSWORD_SECRET: string;
		// 	JWT_FORGOT_DEALER_PASSWORD_SECRET_EXPIRES_IN: string;
		// };
	}
}

export default async function Server(
	opts?: FastifyServerOptions
): Promise<
	FastifyInstance<
		IServer,
		IncomingMessage,
		ServerResponse,
		FastifyLoggerInstance
	>
> {
	const server: FastifyInstance = Fastify(opts);

	server.register(import('@fastify/env'), {
		dotenv: {
			path: resolve(__dirname, '../.env'),
			debug: true,
		},
		confKey: 'config',
		schema: ConfigSchema,
	});

	server.register(import('@fastify/rate-limit'), {
		max: 100,
		timeWindow: '1 minute',
	});

	server.setErrorHandler((error, _, reply) => {
		if (reply.statusCode === StatusCodes.TOO_MANY_REQUESTS) {
			error.message = `¡Llegaste al límite de velocidad! ¡Más despacio, por favor!`;
		}
		reply.send(error);
	});

	server.register(import('@fastify/compress'));

	server.register(import('@fastify/helmet'), {
		global: true,
		hidePoweredBy: true,
	});

	server.register(import('@fastify/routes'));

	server.register(import('@fastify/static'), {
		root: resolve(__dirname, '../public'),
	});

	server.register(import('fastify-favicon'), {
		path: './public',
	});

	server.register(import('fastify-healthcheck'), {
		exposeUptime: true,
		healthcheckUrl: '/v1/health',
	});

	server.register(bootstrap, {
		prefix: '/v1',
		controllers: [...AppModule],
	});

	return server;
}
