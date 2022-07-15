import { Service } from 'fastify-decorators';
import { DatabaseService } from '@fastly/database/DatabaseService';
import { NotFound } from 'http-errors';
import { generateCouponCode as _generateCouponCode } from '@fastly/utils/generateCouponCode';

@Service('CouponServiceToken')
export class CouponService {
	constructor(private readonly databaseService: DatabaseService) {}

	getById(id: string) {
		return this.databaseService.coupon.findUnique({ where: { id } });
	}

	async getByIdOrThrow(id: string) {
		const coupon = await this.getById(id);

		if (!coupon) {
			throw new NotFound();
		}

		return coupon;
	}

	public generateCouponCode() {
		return _generateCouponCode();
	}
}
