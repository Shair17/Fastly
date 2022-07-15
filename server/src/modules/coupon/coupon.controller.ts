import { Controller, GET, POST, PUT, DELETE } from 'fastify-decorators';
import { Request, Reply } from '@fastly/interfaces/http';
import {
	hasBearerToken,
	adminIsAuthenticated,
	customerIsAuthenticated,
} from '@fastly/shared/hooks/auth';
import { CouponService } from './coupon.service';

@Controller('/stores')
export class CouponController {
	constructor(private readonly couponService: CouponService) {}
}
