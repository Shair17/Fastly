import { onRequestHookHandler } from 'fastify';
import { getInstanceByToken } from 'fastify-decorators';
import { AdminService } from '../../modules/admin/admin.service';
import { CustomerService } from '../../modules/customer/customer.service';
import { DealerService } from '../../modules/dealer/dealer.service';
import { UserService } from '../../modules/user/user.service';
import * as jwt from 'jsonwebtoken';
import { BadRequest, Unauthorized, InternalServerError } from 'http-errors';

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
			id: string;
		};

		const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
		const admin = await adminService.getById(decoded.id);

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
			id: string;
		};

		const userService = getInstanceByToken<UserService>('UserServiceToken');
		const user = await userService.getById(decoded.id);

		if (!user) {
			throw new Unauthorized();
		}

		if (user.isBanned) {
			throw new Unauthorized('banned');
		}

		userId = user.id;
	} catch (error) {
		console.log(error);
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
			id: string;
		};

		const customerService = getInstanceByToken<CustomerService>(
			'CustomerServiceToken'
		);
		const customer = await customerService.getById(decoded.id);

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
		console.log(error);
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
	try {
		const token = headers.authorization?.split(' ')[1];

		const decoded = jwt.verify(token!, process.env.JWT_DEALER_SECRET!) as {
			id: string;
		};

		const dealerService =
			getInstanceByToken<DealerService>('DealerServiceToken');
		const dealer = await dealerService.getById(decoded.id);

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
	} catch (error) {
		console.log(error);

		if (error instanceof jwt.TokenExpiredError) {
			throw new Unauthorized(`token_expired`);
		}
		if (error instanceof jwt.JsonWebTokenError) {
			throw new Unauthorized(`invalid_token`);
		}
		throw new InternalServerError();
	}
};
