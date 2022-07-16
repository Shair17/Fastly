import 'reflect-metadata';

import Fastify, {
  FastifyServerOptions,
  FastifyInstance,
  FastifyLoggerInstance,
} from 'fastify';
import { bootstrap } from 'fastify-decorators';
import type { Server as IServer, IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { StatusCodes } from 'http-status-codes';
import Env from '@fastify/env';
import Compress from '@fastify/compress';
import Helmet from '@fastify/helmet';
import Cors from '@fastify/cors';
import HealthCheck from 'fastify-healthcheck';
import Static from '@fastify/static';
import Favicon from 'fastify-favicon';
import Routes from '@fastify/routes';
import RateLimit from '@fastify/rate-limit';
import IO from 'fastify-socket.io';
import { ConfigSchema, ConfigSchemaType } from '@fastly/config/config.schema';
import { AppModule } from '@fastly/app.module';
import { MapRoutes } from '@fastly/plugins';

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
  opts?: FastifyServerOptions,
): Promise<
  FastifyInstance<
    IServer,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  >
> {
  const server: FastifyInstance = Fastify(opts);
  const publicDir = resolve(__dirname, '../public');

  server.log.info(`Starting Fastly server application at ${new Date()}`);

  server.register(Env, {
    dotenv: {
      path: resolve(__dirname, '../.env'),
      debug: false,
    },
    confKey: 'config',
    schema: ConfigSchema,
  });
  server.register(RateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
  server.setErrorHandler((error, _, reply) => {
    if (reply.statusCode === StatusCodes.TOO_MANY_REQUESTS) {
      error.message = `¡Llegaste al límite de velocidad! ¡Más despacio, por favor!`;
    }
    reply.send(error);
  });
  server.register(Cors);
  server.register(Compress);
  server.register(Helmet, {
    global: true,
    hidePoweredBy: true,
  });
  server.register(Routes);
  server.register(Static, {
    root: publicDir,
  });
  server.register(Favicon, {
    path: publicDir,
    name: 'favicon.ico',
  });
  server.register(HealthCheck, {
    exposeUptime: true,
    healthcheckUrl: '/health',
  });
  server.register(bootstrap, {
    prefix: 'v1',
    controllers: [...AppModule],
  });
  server.register(IO, {
    cors: {
      origin: '*',
    },
  });
  server.register(MapRoutes);

  return server;
}
