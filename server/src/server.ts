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
		healthcheckUrl: '/v1/health',
	});

	/**
	server.register(import('@fastify/swagger'), {
		routePrefix: '/documentation',
		swagger: {
			info: {
				title: 'Test swagger',
				description: 'Testing the Fastify swagger API',
				version: '0.1.0',
			},
			externalDocs: {
				url: 'https://swagger.io',
				description: 'Find more info here',
			},
			host: 'localhost',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
				{ name: 'user', description: 'User related end-points' },
				{ name: 'code', description: 'Code related end-points' },
			],
			definitions: {
				User: {
					type: 'object',
					required: ['id', 'email'],
					properties: {
						id: { type: 'string', format: 'uuid' },
						firstName: { type: 'string' },
						lastName: { type: 'string' },
						email: { type: 'string', format: 'email' },
					},
				},
			},
			securityDefinitions: {
				apiKey: {
					type: 'apiKey',
					name: 'apiKey',
					in: 'header',
				},
			},
		},
		uiConfig: {
			docExpansion: 'full',
			deepLinking: false,
		},
		uiHooks: {
			onRequest: function (request, reply, next) {
				next();
			},
			preHandler: function (request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		exposeRoute: true,
	});*/

	server.register(bootstrap, {
		prefix: '/v1',
		controllers: [...AppModule],
	});

	return server;
}
