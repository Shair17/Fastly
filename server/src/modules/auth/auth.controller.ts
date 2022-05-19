import { Controller, POST as Post, PUT as Put } from "fastify-decorators";
import { AuthService } from "./auth.service";
import { Request, Reply } from "../../interfaces/http.interfaces";
import {
  hasBearerToken,
  adminIsAuthenticated,
  customerIsAuthenticated,
  dealerIsAuthenticated,
  userIsAuthenticated,
} from "../../shared/hooks/auth.hook";
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
} from "./auth.schema";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/facebook", {
    schema: {
      body: LogInWithFacebook,
    },
  })
  async logInWithFacebook(
    request: Request<{
      Body: LogInWithFacebookType;
    }>,
    reply: Reply
  ) {
    return this.authService.logInWithFacebook(request.body);
  }

  @Post("/facebook/refresh", {
    schema: {
      body: RefreshFacebookToken,
    },
  })
  async refreshFacebookToken(
    request: Request<{
      Body: RefreshFacebookTokenType;
    }>,
    reply: Reply
  ) {
    return this.authService.refreshFacebookToken(request.body);
  }

  @Post("/facebook/logout", {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async logOutFromFacebook(request: Request, reply: Reply) {
    return this.authService.logOutFromFacebook(request.userId);
  }

  @Post("/admin/login", {
    schema: {
      body: AdminLogin,
    },
  })
  async logInAdmin(
    request: Request<{
      Body: AdminLoginType;
    }>,
    reply: Reply
  ) {
    return this.authService.logInAdmin(request.body);
  }

  @Post("/admin/register", {
    schema: {
      body: AdminRegister,
    },
  })
  async registerAdmin(
    request: Request<{
      Body: AdminRegisterType;
    }>,
    reply: Reply
  ) {
    return this.authService.registerAdmin(request.body);
  }

  @Post("/admin/forgot-password", {
    schema: {
      body: ForgotAdminPassword,
    },
  })
  async forgotAdminPassword(
    request: Request<{
      Body: ForgotAdminPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.forgotAdminPassword(request.body);
  }

  @Post("/admin/new-password", {
    schema: {
      body: NewAdminPassword,
    },
  })
  async newAdminPassword(
    request: Request<{
      Body: NewAdminPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.newAdminPassword(request.body);
  }

  @Post("/admin/change-password", {
    schema: {
      body: ChangeAdminPassword,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async changeAdminPassword(
    request: Request<{
      Body: ChangeAdminPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.changeAdminPassword(request.adminId, request.body);
  }

  @Post("/admin/refresh", {
    schema: {
      body: RefreshAdminToken,
    },
  })
  async refreshAdminToken(
    request: Request<{
      Body: RefreshAdminTokenType;
    }>,
    reply: Reply
  ) {
    return this.authService.refreshAdminToken(request.body);
  }

  @Post("/admin/logout", {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async logOutAdmin(request: Request, reply: Reply) {
    return this.authService.logOutAdmin(request.adminId);
  }

  @Post("/customer/login", {
    schema: {
      body: CustomerLogin,
    },
  })
  async loginCustomer(
    request: Request<{
      Body: CustomerLoginType;
    }>,
    reply: Reply
  ) {
    return this.authService.loginCustomer(request.body);
  }

  @Post("/customer/register", {
    schema: {
      body: CustomerRegister,
    },
  })
  async registerCustomer(
    request: Request<{
      Body: CustomerRegisterType;
    }>,
    reply: Reply
  ) {
    return this.authService.registerCustomer(request.body);
  }

  @Put("/customer/forgot-password", {
    schema: {
      body: ForgotCustomerPassword,
    },
  })
  async forgotCustomerPassword(
    request: Request<{
      Body: ForgotCustomerPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.forgotCustomerPassword(request.body);
  }

  @Post("/customer/new-password", {
    schema: {
      body: NewCustomerPassword,
    },
  })
  async newCustomerPassword(
    request: Request<{
      Body: NewCustomerPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.newCustomerPassword(request.body);
  }

  @Post("/customer/change-password", {
    schema: {
      body: ChangeCustomerPassword,
    },
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async changeCustomerPassword(
    request: Request<{
      Body: ChangeCustomerPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.changeCustomerPassword(
      request.customerId,
      request.body
    );
  }

  @Post("/customer/refresh", {
    schema: {
      body: RefreshCustomerToken,
    },
  })
  async refreshCustomerToken(
    request: Request<{
      Body: RefreshCustomerTokenType;
    }>,
    reply: Reply
  ) {
    return this.authService.refreshCustomerToken(request.body);
  }

  @Post("/customer/logout", {
    onRequest: [hasBearerToken, customerIsAuthenticated],
  })
  async logOutCustomer(request: Request, reply: Reply) {
    return this.authService.logOutCustomer(request.customerId);
  }

  @Post("/dealer/login", {
    schema: {
      body: DealerLogin,
    },
  })
  async loginDealer(
    request: Request<{
      Body: DealerLoginType;
    }>,
    reply: Reply
  ) {
    return this.authService.loginDealer(request.body);
  }

  @Post("/dealer/register", {
    schema: {
      body: DealerRegister,
    },
  })
  async registerDealer(
    request: Request<{
      Body: DealerRegisterType;
    }>,
    reply: Reply
  ) {
    return this.authService.registerDealer(request.body);
  }

  @Put("/dealer/forgot-password", {
    schema: {
      body: ForgotDealerPassword,
    },
  })
  async forgotDealerPassword(
    request: Request<{
      Body: ForgotDealerPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.forgotDealerPassword(request.body);
  }

  @Post("/dealer/new-password", {
    schema: {
      body: NewDealerPassword,
    },
  })
  async newDealerPassword(
    request: Request<{
      Body: NewDealerPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.newDealerPassword(request.body);
  }

  @Post("/dealer/change-password", {
    schema: {
      body: ChangeDealerPassword,
    },
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async changeDealerPassword(
    request: Request<{
      Body: ChangeDealerPasswordType;
    }>,
    reply: Reply
  ) {
    return this.authService.changeDealerPassword(
      request.dealerId,
      request.body
    );
  }

  @Post("/dealer/refresh", {
    schema: {
      body: RefreshDealerToken,
    },
  })
  async refreshDealerToken(
    request: Request<{
      Body: RefreshDealerTokenType;
    }>,
    reply: Reply
  ) {
    return this.authService.refreshDealerToken(request.body);
  }

  @Post("/dealer/logout", {
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async logOutDealer(request: Request, reply: Reply) {
    return this.authService.logOutDealer(request.dealerId);
  }
}
