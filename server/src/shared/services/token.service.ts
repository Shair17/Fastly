import { FastifyInstance } from 'fastify';
import {
	Service,
	FastifyInstanceToken,
	getInstanceByToken,
} from 'fastify-decorators';
import { JwtService } from './jwt.service';

@Service()
export class TokenService {
	private readonly fastify: FastifyInstance =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	private readonly JWT_USER_SECRET: string =
		this.fastify.config.JWT_USER_SECRET;
	private readonly JWT_USER_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_USER_SECRET_EXPIRES_IN;
	private readonly JWT_USER_REFRESH_SECRET: string =
		this.fastify.config.JWT_USER_REFRESH_SECRET;
	private readonly JWT_USER_REFRESH_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_USER_REFRESH_SECRET_EXPIRES_IN;
	private readonly JWT_ADMIN_SECRET: string =
		this.fastify.config.JWT_ADMIN_SECRET;
	private readonly JWT_ADMIN_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_ADMIN_SECRET_EXPIRES_IN;
	private readonly JWT_ADMIN_REFRESH_SECRET: string =
		this.fastify.config.JWT_ADMIN_REFRESH_SECRET;
	private readonly JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN;
	private readonly JWT_CUSTOMER_SECRET: string =
		this.fastify.config.JWT_CUSTOMER_SECRET;
	private readonly JWT_CUSTOMER_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_CUSTOMER_SECRET_EXPIRES_IN;
	private readonly JWT_CUSTOMER_REFRESH_SECRET: string =
		this.fastify.config.JWT_CUSTOMER_REFRESH_SECRET;
	private readonly JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN;
	private readonly JWT_DEALER_SECRET: string =
		this.fastify.config.JWT_DEALER_SECRET;
	private readonly JWT_DEALER_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_DEALER_SECRET_EXPIRES_IN;
	private readonly JWT_DEALER_REFRESH_SECRET: string =
		this.fastify.config.JWT_DEALER_REFRESH_SECRET;
	private readonly JWT_DEALER_REFRESH_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_DEALER_REFRESH_SECRET_EXPIRES_IN;

	constructor(private readonly jwtService: JwtService) {}
}
