import {Controller, GET, POST, PUT, DELETE} from 'fastify-decorators';
import {Request, Reply} from '@fastly/interfaces/http';
import {
  hasBearerToken,
  adminOrCustomerOrDealerOrUserIsAuthenticated,
  adminOrCustomerIsAuthenticated,
} from '@fastly/shared/hooks/auth';
import {CouponService} from './coupon.service';
import {
  EditCouponByCodeBodyType,
  EditCouponByCodeBody,
  EditCouponByCodeParams,
  EditCouponByCodeParamsType,
  EditCouponByIdParams,
  EditCouponByIdParamsType,
  EditCouponByIdBody,
  EditCouponByIdBodyType,
  CreateCouponBody,
  DeleteCouponByCodeParamsType,
  CreateCouponBodyType,
  DeleteCouponByIdParams,
  DeleteCouponByCodeParams,
  DeleteCouponByIdParamsType,
  GetCouponByIdParams,
  GetCouponByIdParamsType,
  GetCouponByCodeParams,
  GetCouponByCodeParamsType,
} from './coupon.schema';

@Controller('/coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @GET('/', {
    onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
  })
  async getCoupons() {
    return this.couponService.getCoupons();
  }

  @GET('/:id', {
    schema: {
      params: GetCouponByIdParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
  })
  async getCouponById(
    request: Request<{
      Params: GetCouponByIdParamsType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.getByIdOrThrow(request.params.id);
  }

  @GET('/code/:code', {
    schema: {
      params: GetCouponByCodeParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
  })
  async getCouponByCode(
    request: Request<{
      Params: GetCouponByCodeParamsType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.getCouponByCode(request.params.code);
  }

  @PUT('/:id', {
    schema: {
      params: EditCouponByIdParams,
      body: EditCouponByIdBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async editCouponById(
    request: Request<{
      Params: EditCouponByIdParamsType;
      Body: EditCouponByIdBodyType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.editCouponById(request.params.id, request.body);
  }

  @PUT('/code/:code', {
    schema: {
      params: EditCouponByCodeParams,
      body: EditCouponByCodeBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async editCouponByCode(
    request: Request<{
      Params: EditCouponByCodeParamsType;
      Body: EditCouponByCodeBodyType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.editCouponByCode(request.params.id, request.body);
  }

  @POST('/', {
    schema: {
      body: CreateCouponBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async createCoupon(
    request: Request<{
      Body: CreateCouponBodyType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.createCoupon(request.body);
  }

  @DELETE('/:id', {
    schema: {
      params: DeleteCouponByIdParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async deleteCouponById(
    request: Request<{
      Params: DeleteCouponByIdParamsType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.deleteCouponById(request.params.id);
  }

  @DELETE('/code/:id', {
    schema: {
      params: DeleteCouponByCodeParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async deleteCouponByCode(
    request: Request<{
      Params: DeleteCouponByCodeParamsType;
    }>,
    reply: Reply,
  ) {
    return this.couponService.deleteCouponByCode(request.params.code);
  }
}
