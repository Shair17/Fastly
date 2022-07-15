import { FastifyInstance } from 'fastify';
import {
  Service,
  Initializer,
  Destructor,
  FastifyInstanceToken,
  getInstanceByToken,
} from 'fastify-decorators';
import { PrismaClient } from '@prisma/client';

interface OnModuleInit {
  onModuleInit(): any;
}

interface OnModuleDestroy {
  onModuleDestroy(): any;
}

@Service('DatabaseServiceToken')
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly fastify =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  constructor() {
    super({ log: ['query'] });
  }

  @Initializer()
  async onModuleInit() {
    let startTime = performance.now();
    await this.$connect();
    let endTime = performance.now();

    this.fastify.log.info(
      `Prisma Module has established the connection to the database and it took ${Math.floor(
        endTime - startTime,
      )} ms`,
    );
  }

  @Destructor()
  async onModuleDestroy() {
    let startTime = performance.now();
    await this.$disconnect();
    let endTime = performance.now();

    this.fastify.log.info(
      `Prisma Module has been disconnected from the database and it took ${Math.floor(
        endTime - startTime,
      )} ms`,
    );
  }
}
