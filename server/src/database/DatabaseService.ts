import {Service, Initializer, Destructor} from 'fastify-decorators';
import {PrismaClient} from '@prisma/client';
import type {OnModuleDestroy, OnModuleInit} from '@fastly/interfaces/module';
import {LoggerService} from '@fastly/shared/services/logger.service';

@Service('DatabaseServiceToken')
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly loggerService: LoggerService) {
    super({
      log: ['info', 'warn', 'error'],
    });
  }

  @Initializer()
  async onModuleInit() {
    let startTime = performance.now();
    await this.$connect();
    let endTime = performance.now();

    this.loggerService.info(
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

    this.loggerService.info(
      `Prisma Module has been disconnected from the database and it took ${Math.floor(
        endTime - startTime,
      )} ms`,
    );
  }
}
