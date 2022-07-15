import 'reflect-metadata';

import Fastify, {
	FastifyServerOptions,
	FastifyInstance,
	FastifyLoggerInstance,
} from 'fastify';
import { Server as IServer, IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { StatusCodes } from 'http-status-codes';
import { AppModule } from './app.module';
import { ConfigSchema, ConfigSchemaType } from '@fastly/config/config.schema';

declare module 'fastify' {
	interface FastifyRequest {
		userId: string;
		adminId: string;
		customerId: string;
		dealerId: string;
	}

	interface FastifyInstance {
		config: ConfigSchemaType;
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

	server.log.info(
		`Starting Fastly server application at ${new Date().toString()}`
	);

	server.register(import('@fastify/env'), {
		dotenv: {
			path: resolve(__dirname, '../.env'),
			// debug: true,
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

	server.register(import('@fastify/cors'));

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
		healthcheckUrl: '/health',
	});

	server.register((await import('fastify-decorators')).bootstrap, {
		prefix: 'v1',
		controllers: [...AppModule],
	});

	server.register(import('fastify-socket.io'), {
		cors: {
			origin: '*',
		},
	});

	server.register(import('@fastly/plugins/map-routes'));

	return server;
}
