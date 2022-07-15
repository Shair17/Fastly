import { Service, Destructor, Initializer } from 'fastify-decorators';
import { PrismaClient } from '@prisma/client';

interface OnModuleInit {
	onModuleInit(): any;
}

interface OnModuleDestroy {
	onModuleDestroy(): any;
}

@Service('PrismaServiceToken')
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	@Initializer()
	async onModuleInit() {
		await this.$connect();
	}

	@Destructor()
	async onModuleDestroy() {
		await this.$disconnect();
	}
}
