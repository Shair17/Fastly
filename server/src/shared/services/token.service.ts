import { FastifyInstance } from 'fastify';
import {
	Service,
	FastifyInstanceToken,
	getInstanceByToken,
} from 'fastify-decorators';
import { JwtService } from './jwt.service';
import {
	AuthTokenType,
	ForgotPasswordTokenPayload,
	ForgotPasswordTokenType,
} from './token.type';

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
	private readonly JWT_FORGOT_ADMIN_PASSWORD_SECRET: string =
		this.fastify.config.JWT_FORGOT_ADMIN_PASSWORD_SECRET;
	private readonly JWT_FORGOT_ADMIN_PASSWORD_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_FORGOT_ADMIN_PASSWORD_SECRET_EXPIRES_IN;
	private readonly JWT_CUSTOMER_SECRET: string =
		this.fastify.config.JWT_CUSTOMER_SECRET;
	private readonly JWT_CUSTOMER_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_CUSTOMER_SECRET_EXPIRES_IN;
	private readonly JWT_CUSTOMER_REFRESH_SECRET: string =
		this.fastify.config.JWT_CUSTOMER_REFRESH_SECRET;
	private readonly JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN;
	private readonly JWT_FORGOT_CUSTOMER_PASSWORD_SECRET: string =
		this.fastify.config.JWT_FORGOT_CUSTOMER_PASSWORD_SECRET;
	private readonly JWT_FORGOT_CUSTOMER_PASSWORD_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_FORGOT_CUSTOMER_PASSWORD_SECRET_EXPIRES_IN;
	private readonly JWT_DEALER_SECRET: string =
		this.fastify.config.JWT_DEALER_SECRET;
	private readonly JWT_DEALER_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_DEALER_SECRET_EXPIRES_IN;
	private readonly JWT_DEALER_REFRESH_SECRET: string =
		this.fastify.config.JWT_DEALER_REFRESH_SECRET;
	private readonly JWT_DEALER_REFRESH_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_DEALER_REFRESH_SECRET_EXPIRES_IN;
	private readonly JWT_FORGOT_DEALER_PASSWORD_SECRET: string =
		this.fastify.config.JWT_FORGOT_DEALER_PASSWORD_SECRET;
	private readonly JWT_FORGOT_DEALER_PASSWORD_SECRET_EXPIRES_IN: string =
		this.fastify.config.JWT_FORGOT_DEALER_PASSWORD_SECRET_EXPIRES_IN;

	constructor(private readonly jwtService: JwtService) {}

	generateForgotPasswordToken(
		type: ForgotPasswordTokenType,
		payload: ForgotPasswordTokenPayload
	) {
		switch (type) {
			case 'admin':
				return this.jwtService.sign(
					payload,
					this.JWT_FORGOT_ADMIN_PASSWORD_SECRET,
					{ expiresIn: this.JWT_FORGOT_ADMIN_PASSWORD_SECRET_EXPIRES_IN }
				);

			case 'customer':
				return this.jwtService.sign(
					payload,
					this.JWT_FORGOT_CUSTOMER_PASSWORD_SECRET,
					{ expiresIn: this.JWT_FORGOT_CUSTOMER_PASSWORD_SECRET_EXPIRES_IN }
				);

			case 'dealer':
				return this.jwtService.sign(
					payload,
					this.JWT_FORGOT_DEALER_PASSWORD_SECRET,
					{ expiresIn: this.JWT_FORGOT_DEALER_PASSWORD_SECRET_EXPIRES_IN }
				);

			default:
				throw new Error('Invalid token type');
		}
	}

	generateTokens(type: AuthTokenType) {
		switch (type) {
			case 'admin':
				return {
					accessToken: '',
					refreshToken: '',
				};

			case 'customer':
				return {
					accessToken: '',
					refreshToken: '',
				};

			case 'dealer':
				return {
					accessToken: '',
					refreshToken: '',
				};

			case 'user':
				return {
					accessToken: '',
					refreshToken: '',
				};

			default:
				throw new Error('Invalid token type');
		}
	}
}
