import {FastifyInstance} from 'fastify';
import {CreateFastifyContextOptions} from '@trpc/server/adapters/fastify';

export type Context = {
  req: CreateFastifyContextOptions['req'];
  res: CreateFastifyContextOptions['res'];
  app: FastifyInstance;
};
