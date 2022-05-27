import { Controller } from 'fastify-decorators';
import { CouponService } from './coupon.service';
import {
	hasBearerToken,
	adminIsAuthenticated,
	customerIsAuthenticated,
} from '../../shared/hooks/auth.hook';
import { Request, Reply } from '../../interfaces/http.interfaces';

@Controller('/stores')
export class CouponController {
	constructor(private readonly couponService: CouponService) {}
}
