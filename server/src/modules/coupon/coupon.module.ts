import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {CouponController} from './coupon.controller';

export const CouponModule: Constructor<unknown>[] = [CouponController];
