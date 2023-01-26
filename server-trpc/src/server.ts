import fastify from 'fastify';
import {
  fastifyTRPCPlugin,
  CreateFastifyContextOptions,
} from '@trpc/server/adapters/fastify';
import fastifyEnv from '@fastify/env';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyRateLimit from '@fastify/rate-limit';
import {ConfigSchema, ConfigSchemaType} from './config/config.schema';
import shutdownPlugin from './plugins/shutdown';
import prismaPlugin from './plugins/prisma';
import fastifyRealtime from './plugins/realtime';
import cloudinaryPlugin from './plugins/cloudinary';
import fastifyNoIconPlugin from './plugins/no-icon';
import fastifyMail from './plugins/mail';
import {appRouter} from './router';
import {Context} from './context';
import {
  AdminPayload,
  UserPayload,
  CustomerPayload,
  DealerPayload,
} from './types';
import {server as serverConstants} from './constants/app';
import {resolve} from 'path';

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigSchemaType;
  }

  interface FastifyRequest {
    admin: AdminPayload | null;
    user: UserPayload | null;
    customer: CustomerPayload | null;
    dealer: DealerPayload | null;
  }
}

const publicDir = resolve(__dirname, '../public');

const server = fastify(serverConstants.config);

server.log.info(
  `Starting Fastly server application at ${new Date().toLocaleString()}`,
);

server.register(fastifyEnv, {
  dotenv: true,
  confKey: 'config',
  schema: ConfigSchema,
});
server.register(fastifyCompress);
server.register(fastifyHelmet, {
  global: true,
  hidePoweredBy: true,
});
server.register(fastifyCors);
server.register(fastifyStatic, {
  root: publicDir,
});
server.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
});
server.register(fastifyNoIconPlugin);
server.register(prismaPlugin);
server.register(cloudinaryPlugin);
server.register(fastifyRealtime, {
  serveClient: false,
  cors: {
    origin: '*',
  },
});
server.register(fastifyMail);

['admin', 'user', 'customer', 'dealer'].forEach(entity => {
  server.decorateRequest(entity, null);
});

// server.decorateRequest('admin', null);
// server.decorateRequest('user', null);
// server.decorateRequest('customer', null);
// server.decorateRequest('dealer', null);

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext: ({req, res}: CreateFastifyContextOptions): Context => ({
      req,
      res,
      app: server,
    }),
  },
});
server.register(shutdownPlugin);

export default server;
