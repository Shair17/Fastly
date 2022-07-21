import {Controller, POST, PUT} from 'fastify-decorators';
import {AuthService} from './auth.service';
import {Request, Reply} from '@fastly/interfaces/http';
import {
  LogInWithFacebook,
  LogInWithFacebookType,
  RefreshFacebookToken,
  RefreshFacebookTokenType,
  AdminLogin,
  AdminLoginType,
  AdminRegister,
  AdminRegisterType,
  ForgotAdminPassword,
  ForgotAdminPasswordType,
  NewAdminPassword,
  NewAdminPasswordType,
  ChangeAdminPassword,
  ChangeAdminPasswordType,
  RefreshAdminToken,
  RefreshAdminTokenType,
  CustomerLogin,
  CustomerLoginType,
  CustomerRegister,
  CustomerRegisterType,
  ForgotCustomerPassword,
  ForgotCustomerPasswordType,
  NewCustomerPassword,
  NewCustomerPasswordType,
  ChangeCustomerPassword,
  ChangeCustomerPasswordType,
  RefreshCustomerToken,
  RefreshCustomerTokenType,
  DealerLogin,
  DealerLoginType,
  DealerRegister,
  DealerRegisterType,
  ForgotDealerPassword,
  ForgotDealerPasswordType,
  NewDealerPassword,
  NewDealerPasswordType,
  ChangeDealerPassword,
  ChangeDealerPasswordType,
  RefreshDealerToken,
  RefreshDealerTokenType,
} from './auth.schema';
import {
  hasBearerToken,
  adminIsAuthenticated,
  customerIsAuthenticated,
  dealerIsAuthenticated,
  userIsAuthenticated,
} from '@fastly/shared/hooks/auth';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @POST('/facebook', {
    schema: {
      body: LogInWithFacebook,
    },
  })
  async logInWithFacebook(
    request: Request<{
      Body: LogInWithFacebookType;
    }>,
    reply: Reply,
  ) {
    return this.authService.logInWithFacebook(request.body);
  }

  @POST('/facebook/refresh', {
    schema: {
      body: RefreshFacebookToken,
    },
  })
  async refreshFacebookToken(
    request: Request<{
      Body: RefreshFacebookTokenType;
    }>,
    reply: Reply,
  ) {
    return this.authService.refreshFacebookToken(request.body);
  }

  @POST('/facebook/logout', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async logOutFromFacebook(request: Request, reply: Reply) {
    // TODO: test this
    reply.removeHeader('authorization');
    return this.authService.logOutFromFacebook(request.userId);
  }

  @POST('/admin/login', {
    schema: {
      body: AdminLogin,
    },
  })
  async logInAdmin(
    request: Request<{
      Body: AdminLoginType;
    }>,
    reply: Reply,
  ) {
    return this.authService.logInAdmin(request.body);
  }

  @POST('/admin/register', {
    schema: {
      body: AdminRegister,
    },
  })
  async registerAdmin(
    request: Request<{
      Body: AdminRegisterType;
    }>,
    reply: Reply,
  ) {
    return this.authService.registerAdmin(request.body);
  }

  @POST('/admin/forgot-password', {
    schema: {
      body: ForgotAdminPassword,
    },
  })
  async forgotAdminPassword(
    request: Request<{
      Body: ForgotAdminPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.forgotAdminPassword(request.body);
  }

  @POST('/admin/new-password', {
    schema: {
      body: NewAdminPassword,
    },
  })
  async newAdminPassword(
    request: Request<{
      Body: NewAdminPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.newAdminPassword(request.body);
  }

  @POST('/admin/change-password', {
    schema: {
      body: ChangeAdminPassword,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async changeAdminPassword(
    request: Request<{
      Body: ChangeAdminPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.changeAdminPassword(request.adminId, request.body);
  }

  @POST('/admin/refresh', {
    schema: {
      body: RefreshAdminToken,
    },
  })
  async refreshAdminToken(
    request: Request<{
      Body: RefreshAdminTokenType;
    }>,
    reply: Reply,
  ) {
    return this.authService.refreshAdminToken(request.body);
  }

  @POST('/admin/logout', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async logOutAdmin(request: Request, reply: Reply) {
    // TODO: test this
    reply.removeHeader('authorization');
    return this.authService.logOutAdmin(request.adminId);
  }

  @POST('/customer/login', {
    schema: {
      body: CustomerLogin,
    },
  })
  async loginCustomer(
    request: Request<{
      Body: CustomerLoginType;
    }>,
    reply: Reply,
  ) {
    return this.authService.loginCustomer(request.body);
  }

  @POST('/customer/register', {
    schema: {
      body: CustomerRegister,
    },
  })
  async registerCustomer(
    request: Request<{
      Body: CustomerRegisterType;
    }>,
    reply: Reply,
  ) {
    return this.authService.registerCustomer(request.body);
  }

  @PUT('/customer/forgot-password', {
    schema: {
      body: ForgotCustomerPassword,
    },
  })
  async forgotCustomerPassword(
    request: Request<{
      Body: ForgotCustomerPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.forgotCustomerPassword(request.body);
  }

  @POST('/customer/new-password', {
    schema: {
      body: NewCustomerPassword,
    },
  })
  async newCustomerPassword(
    request: Request<{
      Body: NewCustomerPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.newCustomerPassword(request.body);
  }

  @POST('/customer/change-password', {
    schema: {
      body: ChangeCustomerPassword,
    },
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async changeCustomerPassword(
    request: Request<{
      Body: ChangeCustomerPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.changeCustomerPassword(
      request.customerId,
      request.body,
    );
  }

  @POST('/customer/refresh', {
    schema: {
      body: RefreshCustomerToken,
    },
  })
  async refreshCustomerToken(
    request: Request<{
      Body: RefreshCustomerTokenType;
    }>,
    reply: Reply,
  ) {
    return this.authService.refreshCustomerToken(request.body);
  }

  @POST('/customer/logout', {
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async logOutCustomer(request: Request, reply: Reply) {
    // TODO: test this
    reply.removeHeader('authorization');
    return this.authService.logOutCustomer(request.customerId);
  }

  @POST('/dealer/login', {
    schema: {
      body: DealerLogin,
    },
  })
  async loginDealer(
    request: Request<{
      Body: DealerLoginType;
    }>,
    reply: Reply,
  ) {
    return this.authService.loginDealer(request.body);
  }

  @POST('/dealer/register', {
    schema: {
      body: DealerRegister,
    },
  })
  async registerDealer(
    request: Request<{
      Body: DealerRegisterType;
    }>,
    reply: Reply,
  ) {
    return this.authService.registerDealer(request.body);
  }

  @PUT('/dealer/forgot-password', {
    schema: {
      body: ForgotDealerPassword,
    },
  })
  async forgotDealerPassword(
    request: Request<{
      Body: ForgotDealerPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.forgotDealerPassword(request.body);
  }

  @POST('/dealer/new-password', {
    schema: {
      body: NewDealerPassword,
    },
  })
  async newDealerPassword(
    request: Request<{
      Body: NewDealerPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.newDealerPassword(request.body);
  }

  @POST('/dealer/change-password', {
    schema: {
      body: ChangeDealerPassword,
    },
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async changeDealerPassword(
    request: Request<{
      Body: ChangeDealerPasswordType;
    }>,
    reply: Reply,
  ) {
    return this.authService.changeDealerPassword(
      request.dealerId,
      request.body,
    );
  }

  @POST('/dealer/refresh', {
    schema: {
      body: RefreshDealerToken,
    },
  })
  async refreshDealerToken(
    request: Request<{
      Body: RefreshDealerTokenType;
    }>,
    reply: Reply,
  ) {
    return this.authService.refreshDealerToken(request.body);
  }

  @POST('/dealer/logout', {
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async logOutDealer(request: Request, reply: Reply) {
    // TODO: test this
    reply.removeHeader('authorization');
    return this.authService.logOutDealer(request.dealerId);
  }
}
