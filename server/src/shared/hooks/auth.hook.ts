import { onRequestHookHandler } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { BadRequest, Unauthorized, InternalServerError } from 'http-errors';
import { DataSource } from 'typeorm';
import { Admin } from '../../modules/admin/admin.entity';
import { User } from '../../modules/user/user.entity';
import { Customer } from '../../modules/customer/customer.entity';
import { Dealer } from '../../modules/dealer/dealer.entity';

const dataSource = new DataSource({
	type: 'mysql',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT!,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [Admin, Customer, Dealer, User],
});

const adminRepository = dataSource.getRepository(Admin);
const userRepository = dataSource.getRepository(User);
const customerRepository = dataSource.getRepository(Customer);
const dealerRepository = dataSource.getRepository(Dealer);

// Creo que tengo que reemplazar todos los throw new con return reply.send(...)...
export const hasBearerToken: onRequestHookHandler = async (
	{ headers },
	reply
) => {
	const { authorization } = headers;
	let token: string;

	if (authorization) {
		const parts = authorization.split(' ');

		if (parts.length === 2 && parts[1].split('.').length === 3) {
			const scheme = parts[0];
			token = parts[1];

			if (!/^Bearer$/i.test(scheme)) {
				throw new BadRequest('malformed_token');
			}
		} else {
			throw new BadRequest('malformed_token');
		}
	} else {
		throw new Unauthorized('token_not_provided');
	}

	const decoded = jwt.decode(token) as jwt.JwtPayload;

	if (!decoded) {
		throw new BadRequest(`malformed_token`);
	}

	if (new Date(decoded.exp! * 1000) < new Date()) {
		throw new BadRequest(`token_expired`);
	}
};

export const adminIsAuthenticated: onRequestHookHandler = async (
	{ headers, adminId },
	reply
) => {
	try {
		const token = headers.authorization?.split(' ')[1];

		const decoded = jwt.verify(token!, process.env.JWT_ADMIN_SECRET!) as {
			adminId: string;
		};

		const admin = await adminRepository.findOneBy({ id: decoded.adminId });

		if (!admin) {
			throw new Unauthorized();
		}

		if (admin.isBanned) {
			throw new Unauthorized('banned');
		}

		if (!admin.isActive) {
			throw new Unauthorized('inactive_account');
		}

		adminId = admin.id;
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new Unauthorized(`token_expired`);
		}

		if (error instanceof jwt.JsonWebTokenError) {
			throw new Unauthorized(`invalid_token`);
		}

		throw new InternalServerError();
	}
};

export const userIsAuthenticated: onRequestHookHandler = async (
	{ headers, userId },
	reply
) => {
	try {
		const token = headers.authorization?.split(' ')[1];

		const decoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
			userId: string;
		};

		const user = await userRepository.findOneBy({ id: decoded.userId });

		if (!user) {
			throw new Unauthorized();
		}

		if (user.isBanned) {
			throw new Unauthorized('banned');
		}

		userId = user.id;
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new Unauthorized(`token_expired`);
		}

		if (error instanceof jwt.JsonWebTokenError) {
			throw new Unauthorized(`invalid_token`);
		}

		throw new InternalServerError();
	}
};

export const customerIsAuthenticated: onRequestHookHandler = async (
	{ headers, customerId },
	reply
) => {
	try {
		const token = headers.authorization?.split(' ')[1];

		const decoded = jwt.verify(token!, process.env.JWT_CUSTOMER_SECRET!) as {
			customerId: string;
		};

		const customer = await customerRepository.findOneBy({
			id: decoded.customerId,
		});

		if (!customer) {
			throw new Unauthorized();
		}

		if (customer.isBanned) {
			throw new Unauthorized('banned');
		}

		if (!customer.isActive) {
			throw new Unauthorized('inactive_account');
		}

		customerId = customer.id;
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new Unauthorized(`token_expired`);
		}

		if (error instanceof jwt.JsonWebTokenError) {
			throw new Unauthorized(`invalid_token`);
		}

		throw new InternalServerError();
	}
};

export const dealerIsAuthenticated: onRequestHookHandler = async (
	{ headers, dealerId },
	reply
) => {
	const token = headers.authorization?.split(' ')[1];

	const decoded = jwt.verify(token!, process.env.JWT_DEALER_SECRET!) as {
		dealerId: string;
	};

	const dealer = await dealerRepository.findOneBy({ id: decoded.dealerId });

	if (!dealer) {
		throw new Unauthorized();
	}

	if (dealer.isBanned) {
		throw new Unauthorized('banned');
	}

	if (!dealer.isActive) {
		throw new Unauthorized('inactive_account');
	}

	dealerId = dealer.id;
	try {
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new Unauthorized(`token_expired`);
		}

		if (error instanceof jwt.JsonWebTokenError) {
			throw new Unauthorized(`invalid_token`);
		}

		throw new InternalServerError();
	}
};
