import 'reflect-metadata';

import Fastify, {
	FastifyServerOptions,
	FastifyInstance,
	FastifyLoggerInstance,
} from 'fastify';
import fastifyEnv from '@fastify/env';
import { Server as IServer, IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { StatusCodes } from 'http-status-codes';
import { bootstrap } from 'fastify-decorators';
// import { noFavicon } from './plugins/no-favicon.plugin';
import { schema } from './config/config.schema';
import { AppModule } from './app.module';

// https://github.com/L2jLiga/fastify-decorators/

declare module 'fastify' {
	// interface FastifyRequest {
	// 	userId: string;
	// }

	interface FastifyInstance {
		config: {
			PORT: string;
		};
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

	server.register(fastifyEnv, {
		dotenv: {
			path: resolve(__dirname, '../.env'),
			// debug: true,
		},
		confKey: 'config',
		schema,
	});

	server.register(require('@fastify/rate-limit'), {
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

	// server.register(noFavicon);
	server.register(import('fastify-favicon'), {
		path: './public',
	});

	server.register(import('fastify-healthcheck'), {
		exposeUptime: true,
	});

	server.register(bootstrap, {
		controllers: [...AppModule],
	});

	return server;
}
