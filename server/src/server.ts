import 'reflect-metadata';

import type {Server as IServer, IncomingMessage, ServerResponse} from 'http';
import Fastify, {
  FastifyServerOptions,
  FastifyInstance,
  FastifyLoggerInstance,
} from 'fastify';
import {bootstrap} from 'fastify-decorators';
import {resolve} from 'path';
import Env from '@fastify/env';
import Compress from '@fastify/compress';
import Helmet from '@fastify/helmet';
import Cors from '@fastify/cors';
import HealthCheck from 'fastify-healthcheck';
import Static from '@fastify/static';
import Routes from '@fastify/routes';
import RateLimit from '@fastify/rate-limit';
import IO from 'fastify-socket.io';
import {ConfigSchema} from './config/config.schema';
import {AppModule} from './app.module';
import {MapRoutes, NoFavicon} from './plugins';

const publicDir = resolve(__dirname, '../public');

declare module 'fastify' {
  interface FastifyRequest {
    userId: string;
    adminId: string;
    customerId: string;
    dealerId: string;
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
  const server = Fastify(opts);

  server.log.info(
    `Starting Fastly server application at ${new Date().toLocaleString()}`,
  );

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
  // server.setErrorHandler((error, _, reply) => {
  // if (reply.statusCode === StatusCodes.TOO_MANY_REQUESTS) {
  // error.message = `¡Llegaste al límite de velocidad! ¡Más despacio, por favor!`;
  // }
  // reply.send(error);
  // });
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
  // server.register(Favicon, {
  // path: publicDir,
  // name: 'favicon.ico',
  // });
  server.register(HealthCheck, {
    exposeUptime: true,
    healthcheckUrl: '/health',
  });
  server.register(IO, {
    serveClient: false,
    cors: {
      origin: '*',
    },
  });
  server.register(bootstrap, {
    controllers: [...AppModule],
  });
  server.register(MapRoutes);
  server.register(NoFavicon);

  return server;
}
