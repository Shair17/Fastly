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
import {isString} from '../../utils';

// Json Web Token Secrets
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET!;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET!;
const JWT_CUSTOMER_SECRET = process.env.JWT_CUSTOMER_SECRET!;
const JWT_DEALER_SECRET = process.env.JWT_DEALER_SECRET!;

const verifyToken = (token: string) => {
  if (!token) {
    throw new Unauthorized(`invalid_token`);
  }

  const tokenIsValid = isValidToken(token);

  if (!tokenIsValid) {
    throw new Unauthorized(`invalid_token`);
  }

  const decoded = jwt.decode(token) as jwt.JwtPayload;

  if (!decoded) {
    throw new Unauthorized(`invalid_token`);
  }

  if (new Date(decoded.exp! * 1000) < new Date()) {
    throw new Unauthorized(`token_expired`);
  }

  return true;
};

const getAdminIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) {
    return null;
  }

  try {
    const adminDecoded = jwt.verify(token, JWT_ADMIN_SECRET) as {
      id: string;
    };

    if (adminDecoded && adminDecoded.id) {
      return adminDecoded.id;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getUserIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) {
    return null;
  }

  try {
    const userDecoded = jwt.verify(token, JWT_USER_SECRET) as {
      id: string;
    };

    if (userDecoded && userDecoded.id) {
      return userDecoded.id;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getCustomerIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) {
    return null;
  }

  try {
    const customerDecoded = jwt.verify(token, JWT_CUSTOMER_SECRET) as {
      id: string;
    };

    if (customerDecoded && customerDecoded.id) {
      return customerDecoded.id;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getDealerIdFromToken = (token: string): string | null => {
  if (!verifyToken(token)) {
    return null;
  }

  try {
    const dealerDecoded = jwt.verify(token, JWT_DEALER_SECRET) as {
      id: string;
    };

    if (dealerDecoded && dealerDecoded.id) {
      return dealerDecoded.id;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const hasBearerToken: onRequestHookHandler = async (request, reply) => {
  const authorization = request.headers.authorization;

  if (!isString(authorization)) {
    throw new Unauthorized('token_not_provided');
  }

  const parts = <[string, string]>authorization.split(' ');
  const [scheme, token] = parts;

  if (!(parts.length === 2 && token.split('.').length === 3)) {
    throw new Unauthorized('malformed_token');
  }

  if (!BEARER_SCHEME_REGEX.test(scheme)) {
    throw new Unauthorized('malformed_token');
  }

  if (!isValidToken(token)) {
    throw new Unauthorized('malformed_token');
  }

  const decoded = jwt.decode(token) as jwt.JwtPayload;

  if (!decoded) {
    throw new Unauthorized(`malformed_token`);
  }

  if (new Date(decoded.exp! * 1000) < new Date()) {
    throw new Unauthorized(`token_expired`);
  }
};

// Hook for check if admin is authenticated
export const adminIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isString(adminId);

  if (!isAdmin) {
    throw new Unauthorized();
  }

  const adminService = getInstanceByToken<AdminService>('AdminServiceToken');
  const admin = await adminService.getByIdOrThrow(adminId);

  if (admin.isBanned) {
    throw new Unauthorized('banned');
  }

  if (!admin.isActive) {
    throw new Unauthorized('inactive_account');
  }

  request.adminId = admin.id;
};

// Hook for check if user is authenticated
export const userIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const userId = getUserIdFromToken(token);
  const isUser = isString(userId);

  if (!isUser) {
    throw new Unauthorized();
  }

  const userService = getInstanceByToken<UserService>('UserServiceToken');
  const user = await userService.getByIdOnlyUserOrThrow(userId);

  if (user.isBanned) {
    throw new Unauthorized('banned');
  }

  request.userId = user.id;
};

// Hook for check if customer is authenticated
export const customerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const customerId = getCustomerIdFromToken(token);
  const isCustomer = isString(customerId);

  if (!isCustomer) {
    throw new Unauthorized();
  }

  const customerService = getInstanceByToken<CustomerService>(
    'CustomerServiceToken',
  );
  const customer = await customerService.getByIdOrThrow(customerId);

  if (customer.isBanned) {
    throw new Unauthorized('banned');
  }

  if (!customer.isActive) {
    throw new Unauthorized('inactive_account');
  }

  request.customerId = customer.id;
};

// Hook for check if dealer is authenticated
export const dealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isString(dealerId);

  if (!isDealer) {
    throw new Unauthorized();
  }

  const dealerService = getInstanceByToken<DealerService>('DealerServiceToken');
  const dealer = await dealerService.getByIdOrThrow(dealerId);

  if (dealer.isBanned) {
    throw new Unauthorized('banned');
  }

  if (!dealer.isActive) {
    throw new Unauthorized('inactive_account');
  }

  request.dealerId = dealer.id;
};

// Hook for check if admin - user is authenticated
export const adminOrUserIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isString(adminId);

  const userId = getUserIdFromToken(token);
  const isUser = isString(userId);

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

// Hook for check if admin - customer is authenticated
export const adminOrCustomerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isString(adminId);

  const customerId = getCustomerIdFromToken(token);
  const isCustomer = isString(customerId);

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

    if (!customer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.customerId = customer.id;
  } else {
    throw new Unauthorized();
  }
};

// Hook for check if user - dealer is authenticated
export const userOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const userId = getUserIdFromToken(token);
  const isUser = isString(userId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isString(dealerId);

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

// Hook for check if admin - dealer is authenticated
export const adminOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isString(adminId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isString(dealerId);

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

// Hook for check if admin - user - customer is authenticated
export const adminOrUserOrCustomerIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) {
      throw new Unauthorized(`invalid_token`);
    }

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isString(adminId);

    const userId = getUserIdFromToken(token);
    const isUser = isString(userId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isString(customerId);

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

      if (!customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else {
      throw new Unauthorized();
    }
  };

// Hook for check if admin - user - dealer is authenticated
export const adminOrUserOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const adminId = getAdminIdFromToken(token);
  const isAdmin = isString(adminId);

  const userId = getUserIdFromToken(token);
  const isUser = isString(userId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isString(dealerId);

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

// Hook for check if admin - dealer - customer is authenticated
export const adminOrDealerOrCustomerIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) {
      throw new Unauthorized(`invalid_token`);
    }

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isString(adminId);

    const dealerId = getDealerIdFromToken(token);
    const isDealer = isString(dealerId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isString(customerId);

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

      if (!customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else {
      throw new Unauthorized();
    }
  };

// Hook for check if customer - dealer - user is authenticated
export const customerOrDealerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) {
      throw new Unauthorized(`invalid_token`);
    }

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isString(customerId);

    const dealerId = getDealerIdFromToken(token);
    const isDealer = isString(dealerId);

    const userId = getUserIdFromToken(token);
    const isUser = isString(userId);

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

      if (!customer.isActive) {
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

// Hook for check if admin - customer - dealer - user is authenticated
export const adminOrCustomerOrDealerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) {
      throw new Unauthorized(`invalid_token`);
    }

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isString(adminId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isString(customerId);

    const dealerId = getDealerIdFromToken(token);
    const isDealer = isString(dealerId);

    const userId = getUserIdFromToken(token);
    const isUser = isString(userId);

    if (!isAdmin && !isDealer && !isCustomer && !isUser) {
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

      if (!customer.isActive) {
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

// Hook for check if admin - customer - user is authenticated
export const adminOrCustomerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1]!;

    if (!verifyToken(token)) {
      throw new Unauthorized(`invalid_token`);
    }

    const adminId = getAdminIdFromToken(token);
    const isAdmin = isString(adminId);

    const customerId = getCustomerIdFromToken(token);
    const isCustomer = isString(customerId);

    const userId = getUserIdFromToken(token);
    const isUser = isString(userId);

    if (!isAdmin && !isCustomer && !isUser) {
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

      if (!customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
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

// Hook for check if customer - dealer is authenticated
export const customerOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const customerId = getCustomerIdFromToken(token);
  const isCustomer = isString(customerId);

  const dealerId = getDealerIdFromToken(token);
  const isDealer = isString(dealerId);

  if (!isCustomer && !isDealer) {
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

    if (!customer.isActive) {
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
  } else {
    throw new Unauthorized();
  }
};

// Hook for check if customer - user is authenticated
export const customerOrUserIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  const token = request.headers.authorization?.split(' ')[1]!;

  if (!verifyToken(token)) {
    throw new Unauthorized(`invalid_token`);
  }

  const customerId = getCustomerIdFromToken(token);
  const isCustomer = isString(customerId);

  const userId = getUserIdFromToken(token);
  const isUser = isString(userId);

  if (!isCustomer && !isUser) {
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

    if (!customer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    request.customerId = customer.id;
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
