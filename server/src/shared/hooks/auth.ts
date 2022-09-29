import {onRequestHookHandler} from 'fastify';
import {getInstanceByToken} from 'fastify-decorators';
import {AdminService} from '../../modules/admin/admin.service';
import {CustomerService} from '../../modules/customer/customer.service';
import {DealerService} from '../../modules/dealer/dealer.service';
import {UserService} from '../../modules/user/user.service';
import {Unauthorized} from 'http-errors';
import {BEARER_SCHEME_REGEX} from '../../constants/regex';
import * as jwt from 'jsonwebtoken';
import {isValidToken} from '../../utils/isValidToken';

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET!;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET!;
const JWT_CUSTOMER_SECRET = process.env.JWT_CUSTOMER_SECRET!;
const JWT_DEALER_SECRET = process.env.JWT_DEALER_SECRET!;

// Utils
const isValidEntity = (entity: string | null): entity is string => {
  return entity !== null && typeof entity === 'string';
};

const verifyToken = (token: string) => {
  if (!token) throw new Unauthorized(`invalid_token`);

  if (!isValidToken(token)) throw new Unauthorized(`invalid_token`);

  const decoded = jwt.decode(token) as jwt.JwtPayload;

  if (!decoded) throw new Unauthorized(`invalid_token`);

  if (new Date(decoded.exp! * 1000) < new Date())
    throw new Unauthorized(`token_expired`);

  return true;
};

const getAdminIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) return null;

  try {
    const adminDecoded = jwt.verify(token, JWT_ADMIN_SECRET) as {
      id: string;
    };

    if (adminDecoded && adminDecoded.id) return adminDecoded.id;

    return null;
  } catch (error) {
    return null;
  }
};

const getUserIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) return null;

  try {
    const userDecoded = jwt.verify(token, JWT_USER_SECRET) as {
      id: string;
    };

    if (userDecoded && userDecoded.id) return userDecoded.id;

    return null;
  } catch (error) {
    return null;
  }
};

const getCustomerIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) return null;

  try {
    const customerDecoded = jwt.verify(token, JWT_CUSTOMER_SECRET) as {
      id: string;
    };

    if (customerDecoded && customerDecoded.id) return customerDecoded.id;

    return null;
  } catch (error) {
    return null;
  }
};

const getDealerIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) return null;

  try {
    const dealerDecoded = jwt.verify(token, JWT_DEALER_SECRET) as {
      id: string;
    };

    if (dealerDecoded && dealerDecoded.id) return dealerDecoded.id;

    return null;
  } catch (error) {
    return null;
  }
};

export const hasBearerToken: onRequestHookHandler = async (request, reply) => {
  const {authorization} = request.headers;
  let token: string;

  if (!!authorization) {
    const parts = authorization.split(' ');

    if (parts.length === 2 && parts[1].split('.').length === 3) {
      const scheme = parts[0];
      token = parts[1];

      if (!BEARER_SCHEME_REGEX.test(scheme)) {
        throw new Unauthorized('malformed_token');
      }

      if (!isValidToken(token)) {
        throw new Unauthorized('malformed_token');
      }
    } else {
      throw new Unauthorized('malformed_token');
    }
  } else {
    throw new Unauthorized('token_not_provided');
  }

  const decoded = jwt.decode(token) as jwt.JwtPayload;

  if (!decoded) {
    throw new Unauthorized(`malformed_token`);
  }

  if (new Date(decoded.exp! * 1000) < new Date()) {
    throw new Unauthorized(`token_expired`);
  }
};

export const adminIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token!, JWT_ADMIN_SECRET) as {
      id: string;
    };

    const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
    const admin = await adminService.getByIdOrThrow(decoded.id);

    if (admin.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!admin.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.adminId = admin.id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Unauthorized(`token_expired`);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized(`invalid_token`);
    }

    throw new Unauthorized();
  }
};

export const userIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token!, JWT_USER_SECRET) as {
      id: string;
    };

    const userService: UserService =
      getInstanceByToken<UserService>('UserServiceToken');
    const user = await userService.getByIdOrThrow(decoded.id);

    if (user.isBanned) {
      throw new Unauthorized('banned');
    }

    request.userId = user.id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Unauthorized(`token_expired`);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized(`invalid_token`);
    }

    throw new Unauthorized();
  }
};

export const customerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token!, JWT_CUSTOMER_SECRET) as {
      id: string;
    };

    const customerService = getInstanceByToken<CustomerService>(
      'CustomerServiceToken',
    );
    const customer = await customerService.getByIdOrThrow(decoded.id);

    if (customer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!customer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.customerId = customer.id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Unauthorized(`token_expired`);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized(`invalid_token`);
    }

    throw new Unauthorized();
  }
};

export const dealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token!, JWT_DEALER_SECRET) as {
      id: string;
    };

    const dealerService =
      getInstanceByToken<DealerService>('DealerServiceToken');
    const dealer = await dealerService.getByIdOrThrow(decoded.id);

    if (dealer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!dealer.isActive) {
      throw new Unauthorized('inactive_account');
    }
    request.dealerId = dealer.id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Unauthorized(`token_expired`);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized(`invalid_token`);
    }

    throw new Unauthorized();
  }
};

export const adminOrUserIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isValidEntity(adminId);

  const userId = getUserIdFromToken(token);
  const isUser = isValidEntity(userId);

  if (!isAdmin && !isUser) {
    throw new Unauthorized();
  }

  if (isAdmin) {
    const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
    const admin = await adminService.getByIdOrThrow(adminId);

    if (admin.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!admin.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.adminId = admin.id;
  } else if (isUser) {
    const userService = getInstanceByToken<UserService>('UserServiceToken');
    const user = await userService.getByIdOnlyUserOrThrow(userId);

    if (user.isBanned) {
      throw new Unauthorized('banned');
    }

    request.userId = user.id;
  } else {
    throw new Unauthorized();
  }
};

export const adminOrCustomerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isValidEntity(adminId);

  const customerId = getCustomerIdFromToken(token);
  const isCustomer = isValidEntity(customerId);

  if (!isAdmin && !isCustomer) {
    throw new Unauthorized();
  }

  if (isAdmin) {
    const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
    const admin = await adminService.getByIdOrThrow(adminId);

    if (admin.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!admin.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.adminId = admin.id;
  } else if (isCustomer) {
    const customerService = getInstanceByToken<CustomerService>(
      'CustomerServiceToken',
    );
    const customer = await customerService.getByIdOrThrow(customerId);

    if (customer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (customer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.customerId = customer.id;
  } else {
    throw new Unauthorized();
  }
};

export const userOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

  const userId = getUserIdFromToken(token);
  const isUser = isValidEntity(userId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isValidEntity(dealerId);

  if (!isUser && !isDealer) {
    throw new Unauthorized();
  }

  if (isUser) {
    const userService = getInstanceByToken<UserService>('UserServiceToken');
    const user = await userService.getByIdOnlyUserOrThrow(userId);

    if (user.isBanned) {
      throw new Unauthorized('banned');
    }

    request.userId = user.id;
  } else if (isDealer) {
    const dealerService =
      getInstanceByToken<DealerService>('DealerServiceToken');
    const dealer = await dealerService.getByIdOnlyDealerOrThrow(dealerId);

    if (dealer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!dealer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.dealerId = dealer.id;
  } else {
    throw new Unauthorized();
  }
};

export const adminOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isValidEntity(adminId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isValidEntity(dealerId);

  if (!isAdmin && !isDealer) {
    throw new Unauthorized();
  }

  if (isAdmin) {
    const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
    const admin = await adminService.getByIdOrThrow(adminId);

    if (admin.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!admin.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.adminId = admin.id;
  } else if (isDealer) {
    const dealerService =
      getInstanceByToken<DealerService>('DealerServiceToken');
    const dealer = await dealerService.getByIdOnlyDealerOrThrow(dealerId);

    if (dealer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!dealer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.dealerId = dealer.id;
  } else {
    throw new Unauthorized();
  }
};

export const adminOrUserOrCustomerIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isValidEntity(adminId);

    const userId = getUserIdFromToken(token);
    const isUser = isValidEntity(userId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isValidEntity(customerId);

    if (!isAdmin && !isUser && !isCustomer) {
      throw new Unauthorized();
    }

    if (isAdmin) {
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminId);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (isUser) {
      const userService = getInstanceByToken<UserService>('UserServiceToken');
      const user = await userService.getByIdOnlyUserOrThrow(userId);

      if (user.isBanned) {
        throw new Unauthorized('banned');
      }

      request.userId = user.id;
    } else if (isCustomer) {
      const customerService = getInstanceByToken<CustomerService>(
        'CustomerServiceToken',
      );
      const customer = await customerService.getByIdOrThrow(customerId);

      if (customer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else {
      throw new Unauthorized();
    }
  };

export const adminOrUserOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isValidEntity(adminId);

  const userId = getUserIdFromToken(token);
  const isUser = isValidEntity(userId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isValidEntity(dealerId);

  if (!isAdmin && !isUser && !isDealer) {
    throw new Unauthorized();
  }

  if (isAdmin) {
    const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
    const admin = await adminService.getByIdOrThrow(adminId);

    if (admin.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!admin.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.adminId = admin.id;
  } else if (isUser) {
    const userService = getInstanceByToken<UserService>('UserServiceToken');
    const user = await userService.getByIdOnlyUserOrThrow(userId);

    if (user.isBanned) {
      throw new Unauthorized('banned');
    }

    request.userId = user.id;
  } else if (isDealer) {
    const dealerService =
      getInstanceByToken<DealerService>('DealerServiceToken');
    const dealer = await dealerService.getByIdOnlyDealerOrThrow(dealerId);

    if (dealer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!dealer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.dealerId = dealer.id;
  } else {
    throw new Unauthorized();
  }
};

export const adminOrDealerOrCustomerIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isValidEntity(adminId);

    const dealerId = getDealerIdFromToken(token);
    const isDealer = isValidEntity(dealerId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isValidEntity(customerId);

    if (!isAdmin && !isDealer && !isCustomer) {
      throw new Unauthorized();
    }

    if (isAdmin) {
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminId);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (isDealer) {
      const dealerService =
        getInstanceByToken<DealerService>('DealerServiceToken');
      const dealer = await dealerService.getByIdOnlyDealerOrThrow(dealerId);

      if (dealer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!dealer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.dealerId = dealer.id;
    } else if (isCustomer) {
      const customerService = getInstanceByToken<CustomerService>(
        'CustomerServiceToken',
      );
      const customer = await customerService.getByIdOrThrow(customerId);

      if (customer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else {
      throw new Unauthorized();
    }
  };

export const customerOrDealerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isValidEntity(customerId);

    const dealerId = getDealerIdFromToken(token);
    const isDealer = isValidEntity(dealerId);

    const userId = getUserIdFromToken(token);
    const isUser = isValidEntity(userId);

    if (!isDealer && !isCustomer && !isUser) {
      throw new Unauthorized();
    }

    if (isCustomer) {
      const customerService = getInstanceByToken<CustomerService>(
        'CustomerServiceToken',
      );
      const customer = await customerService.getByIdOrThrow(customerId);

      if (customer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else if (isDealer) {
      const dealerService =
        getInstanceByToken<DealerService>('DealerServiceToken');
      const dealer = await dealerService.getByIdOnlyDealerOrThrow(dealerId);

      if (dealer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!dealer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.dealerId = dealer.id;
    } else if (isUser) {
      const userService = getInstanceByToken<UserService>('UserServiceToken');
      const user = await userService.getByIdOnlyUserOrThrow(userId);

      if (user.isBanned) {
        throw new Unauthorized('banned');
      }

      request.userId = user.id;
    } else {
      throw new Unauthorized();
    }
  };

export const adminOrCustomerOrDealerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) throw new Unauthorized(`invalid_token`);

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isValidEntity(adminId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isValidEntity(customerId);

    const dealerId = getDealerIdFromToken(token);
    const isDealer = isValidEntity(dealerId);

    const userId = getUserIdFromToken(token);
    const isUser = isValidEntity(userId);

    if (!isDealer && !isCustomer && !isUser) {
      throw new Unauthorized();
    }

    if (isAdmin) {
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminId);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (isCustomer) {
      const customerService = getInstanceByToken<CustomerService>(
        'CustomerServiceToken',
      );
      const customer = await customerService.getByIdOrThrow(customerId);

      if (customer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else if (isDealer) {
      const dealerService =
        getInstanceByToken<DealerService>('DealerServiceToken');
      const dealer = await dealerService.getByIdOnlyDealerOrThrow(dealerId);

      if (dealer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!dealer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.dealerId = dealer.id;
    } else if (isUser) {
      const userService = getInstanceByToken<UserService>('UserServiceToken');
      const user = await userService.getByIdOnlyUserOrThrow(userId);

      if (user.isBanned) {
        throw new Unauthorized('banned');
      }

      request.userId = user.id;
    } else {
      throw new Unauthorized();
    }
  };
