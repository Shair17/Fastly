import {onRequestHookHandler} from 'fastify';
import {getInstanceByToken} from 'fastify-decorators';
import {AdminService} from '@fastly/modules/admin/admin.service';
import {CustomerService} from '@fastly/modules/customer/customer.service';
import {DealerService} from '@fastly/modules/dealer/dealer.service';
import {UserService} from '@fastly/modules/user/user.service';
import {Unauthorized} from 'http-errors';
import {BEARER_SCHEME_REGEX} from '@fastly/constants/regex';
import * as jwt from 'jsonwebtoken';

// Creo que tengo que reemplazar todos los throw new con return reply.send(...)
export const hasBearerToken: onRequestHookHandler = async (request, reply) => {
  const {authorization} = request.headers;
  let token: string;

  // TODO: Validar que el token tenga un formato válido
  if (!!authorization) {
    const parts = authorization.split(' ');

    if (parts.length === 2 && parts[1].split('.').length === 3) {
      const scheme = parts[0];
      token = parts[1];

      if (!BEARER_SCHEME_REGEX.test(scheme)) {
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

    const decoded = jwt.verify(token!, process.env.JWT_ADMIN_SECRET!) as {
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

    const decoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
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

    const decoded = jwt.verify(token!, process.env.JWT_CUSTOMER_SECRET!) as {
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
    console.log(error);
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

    const decoded = jwt.verify(token!, process.env.JWT_DEALER_SECRET!) as {
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
    console.log(error);

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
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const adminDecoded = jwt.verify(token!, process.env.JWT_ADMIN_SECRET!) as {
      id: string;
    };

    const userDecoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
      id: string;
    };

    if (adminDecoded && adminDecoded.id) {
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminDecoded.id);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (userDecoded && userDecoded.id) {
      const userService = getInstanceByToken<UserService>('UserServiceToken');
      const user = await userService.getByIdOrThrow(userDecoded.id);

      if (user.isBanned) {
        throw new Unauthorized('banned');
      }

      request.userId = user.id;
    } else {
      // idk what is it
      throw new Unauthorized();
    }
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

export const adminOrCustomerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const adminDecoded = jwt.verify(token!, process.env.JWT_ADMIN_SECRET!) as {
      id: string;
    };

    const customerDecoded = jwt.verify(
      token!,
      process.env.JWT_CUSTOMER_SECRET!,
    ) as {
      id: string;
    };

    if (adminDecoded && adminDecoded.id) {
      // is admin
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminDecoded.id);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (customerDecoded && customerDecoded.id) {
      // is user
      const customerService = getInstanceByToken<CustomerService>(
        'CustomerServiceToken',
      );
      const customer = await customerService.getByIdOrThrow(customerDecoded.id);

      if (customer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (customer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.customerId = customer.id;
    } else {
      // idk what is it
      throw new Unauthorized();
    }
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

export const adminOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const adminDecoded = jwt.verify(token!, process.env.JWT_ADMIN_SECRET!) as {
      id: string;
    };

    const dealerDecoded = jwt.verify(
      token!,
      process.env.JWT_DEALER_SECRET!,
    ) as {
      id: string;
    };

    if (adminDecoded && adminDecoded.id) {
      // is admin
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminDecoded.id);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (dealerDecoded && dealerDecoded.id) {
      // is user
      const dealerService =
        getInstanceByToken<DealerService>('DealerServiceToken');
      const dealer = await dealerService.getByIdOrThrow(dealerDecoded.id);

      if (dealer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (dealer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.dealerId = dealer.id;
    } else {
      // idk what is it
      throw new Unauthorized();
    }
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

export const adminOrUserOrCustomerIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      const adminDecoded = jwt.verify(
        token!,
        process.env.JWT_ADMIN_SECRET!,
      ) as {
        id: string;
      };

      const userDecoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
        id: string;
      };

      const customerDecoded = jwt.verify(
        token!,
        process.env.JWT_CUSTOMER_SECRET!,
      ) as {
        id: string;
      };

      if (adminDecoded && adminDecoded.id) {
        // is admin
        const adminService =
          getInstanceByToken<AdminService>('AdminServiceToken');
        const admin = await adminService.getByIdOrThrow(adminDecoded.id);

        if (admin.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!admin.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.adminId = admin.id;
      } else if (userDecoded && userDecoded.id) {
        // is user
        const userService = getInstanceByToken<UserService>('UserServiceToken');
        const user = await userService.getByIdOrThrow(userDecoded.id);

        if (user.isBanned) {
          throw new Unauthorized('banned');
        }

        request.userId = user.id;
      } else if (customerDecoded && customerDecoded.id) {
        // is customer
        const customerService = getInstanceByToken<CustomerService>(
          'CustomerServiceToken',
        );
        const customer = await customerService.getByIdOrThrow(
          customerDecoded.id,
        );

        if (customer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!customer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.customerId = customer.id;
      } else {
        // idk what is it
        throw new Unauthorized();
      }
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

export const adminOrUserOrDealerIsAuthenticated: onRequestHookHandler = async (
  request,
  reply,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    const adminDecoded = jwt.verify(token!, process.env.JWT_ADMIN_SECRET!) as {
      id: string;
    };

    const userDecoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
      id: string;
    };

    const dealerDecoded = jwt.verify(
      token!,
      process.env.JWT_DEALER_SECRET!,
    ) as {
      id: string;
    };

    if (adminDecoded && adminDecoded.id) {
      // is admin
      const adminService =
        getInstanceByToken<AdminService>('AdminServiceToken');
      const admin = await adminService.getByIdOrThrow(adminDecoded.id);

      if (admin.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!admin.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.adminId = admin.id;
    } else if (userDecoded && userDecoded.id) {
      // is user
      const userService = getInstanceByToken<UserService>('UserServiceToken');
      const user = await userService.getByIdOrThrow(userDecoded.id);

      if (user.isBanned) {
        throw new Unauthorized('banned');
      }

      request.userId = user.id;
    } else if (dealerDecoded && dealerDecoded.id) {
      // is dealer
      const dealerService =
        getInstanceByToken<DealerService>('DealerServiceToken');
      const dealer = await dealerService.getByIdOrThrow(dealerDecoded.id);

      if (dealer.isBanned) {
        throw new Unauthorized('banned');
      }

      if (!dealer.isActive) {
        throw new Unauthorized('inactive_account');
      }

      request.dealerId = dealer.id;
    } else {
      // idk what is it
      throw new Unauthorized();
    }
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

export const adminOrDealerOrCustomerIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      const adminDecoded = jwt.verify(
        token!,
        process.env.JWT_ADMIN_SECRET!,
      ) as {
        id: string;
      };

      const dealerDecoded = jwt.verify(
        token!,
        process.env.JWT_DEALER_SECRET!,
      ) as {
        id: string;
      };

      const customerDecoded = jwt.verify(
        token!,
        process.env.JWT_CUSTOMER_SECRET!,
      ) as {
        id: string;
      };

      if (adminDecoded && adminDecoded.id) {
        // is admin
        const adminService =
          getInstanceByToken<AdminService>('AdminServiceToken');
        const admin = await adminService.getByIdOrThrow(adminDecoded.id);

        if (admin.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!admin.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.adminId = admin.id;
      } else if (dealerDecoded && dealerDecoded.id) {
        // is dealer
        const dealerService =
          getInstanceByToken<DealerService>('DealerServiceToken');
        const dealer = await dealerService.getByIdOrThrow(dealerDecoded.id);

        if (dealer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!dealer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.dealerId = dealer.id;
      } else if (customerDecoded && customerDecoded.id) {
        // is customer
        const customerService = getInstanceByToken<CustomerService>(
          'CustomerServiceToken',
        );
        const customer = await customerService.getByIdOrThrow(
          customerDecoded.id,
        );

        if (customer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!customer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.customerId = customer.id;
      } else {
        // idk what is it
        throw new Unauthorized();
      }
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

export const customerOrDealerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      const customerDecoded = jwt.verify(
        token!,
        process.env.JWT_CUSTOMER_SECRET!,
      ) as {
        id: string;
      };

      const dealerDecoded = jwt.verify(
        token!,
        process.env.JWT_DEALER_SECRET!,
      ) as {
        id: string;
      };

      const userDecoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
        id: string;
      };

      if (customerDecoded && customerDecoded.id) {
        // is customer
        const customerService = getInstanceByToken<CustomerService>(
          'CustomerServiceToken',
        );
        const customer = await customerService.getByIdOrThrow(
          customerDecoded.id,
        );

        if (customer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!customer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.customerId = customer.id;
      } else if (dealerDecoded && dealerDecoded.id) {
        // is dealer
        const dealerService =
          getInstanceByToken<DealerService>('DealerServiceToken');
        const dealer = await dealerService.getByIdOrThrow(dealerDecoded.id);

        if (dealer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!dealer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.dealerId = dealer.id;
      } else if (userDecoded && userDecoded.id) {
        // is user
        const userService = getInstanceByToken<UserService>('UserServiceToken');
        const user = await userService.getByIdOrThrow(userDecoded.id);

        if (user.isBanned) {
          throw new Unauthorized('banned');
        }

        request.userId = user.id;
      } else {
        // idk what is it
        throw new Unauthorized();
      }
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

export const adminOrCustomerOrDealerOrUserIsAuthenticated: onRequestHookHandler =
  async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      const adminDecoded = jwt.verify(
        token!,
        process.env.JWT_ADMIN_SECRET!,
      ) as {
        id: string;
      };

      const customerDecoded = jwt.verify(
        token!,
        process.env.JWT_CUSTOMER_SECRET!,
      ) as {
        id: string;
      };

      const dealerDecoded = jwt.verify(
        token!,
        process.env.JWT_DEALER_SECRET!,
      ) as {
        id: string;
      };

      const userDecoded = jwt.verify(token!, process.env.JWT_USER_SECRET!) as {
        id: string;
      };

      if (adminDecoded && adminDecoded.id) {
        // is admin
        const adminService =
          getInstanceByToken<AdminService>('AdminServiceToken');
        const admin = await adminService.getByIdOrThrow(adminDecoded.id);

        if (admin.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!admin.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.adminId = admin.id;
      } else if (customerDecoded && customerDecoded.id) {
        // is customer
        const customerService = getInstanceByToken<CustomerService>(
          'CustomerServiceToken',
        );
        const customer = await customerService.getByIdOrThrow(
          customerDecoded.id,
        );

        if (customer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!customer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.customerId = customer.id;
      } else if (dealerDecoded && dealerDecoded.id) {
        // is dealer
        const dealerService =
          getInstanceByToken<DealerService>('DealerServiceToken');
        const dealer = await dealerService.getByIdOrThrow(dealerDecoded.id);

        if (dealer.isBanned) {
          throw new Unauthorized('banned');
        }

        if (!dealer.isActive) {
          throw new Unauthorized('inactive_account');
        }

        request.dealerId = dealer.id;
      } else if (userDecoded && userDecoded.id) {
        // is user
        const userService = getInstanceByToken<UserService>('UserServiceToken');
        const user = await userService.getByIdOrThrow(userDecoded.id);

        if (user.isBanned) {
          throw new Unauthorized('banned');
        }

        request.userId = user.id;
      } else {
        // idk what is it
        throw new Unauthorized();
      }
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
