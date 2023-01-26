import {FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {PrismaClient} from '@prisma/client';
import {prisma} from '../database/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, _) => {
  // const prisma = new PrismaClient({
  // log:
  // server.config.NODE_ENV === 'development'
  // ? ['query', 'error', 'warn']
  // : ['error'],
  // });

  // await prisma.$connect();

  server.log.info(`Prisma has established the connection to the database.`);

  server.decorate('prisma', prisma);

  server.addHook('onClose', async server => {
    await server.prisma.$disconnect();

    server.log.info(`Prisma has been disconnected from the database.`);
  });
});

export default prismaPlugin;
