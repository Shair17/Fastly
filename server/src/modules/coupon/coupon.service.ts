import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
import {NotFound} from 'http-errors';
import {generateCouponCode as getCouponCode} from '../../utils/generateCouponCode';
import {
  CreateCouponBodyType,
  EditCouponByCodeBodyType,
  EditCouponByIdBodyType,
} from './coupon.schema';
import {ProductService} from '../../modules/product/product.service';

@Service('CouponServiceToken')
export class CouponService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productService: ProductService,
  ) {}

  count() {
    return this.databaseService.coupon.count();
  }

  getById(id: string) {
    return this.databaseService.coupon.findUnique({where: {id}});
  }

  async getByIdOrThrow(id: string) {
    const coupon = await this.getById(id);

    if (!coupon) {
      throw new NotFound(`Coupon with id ${id} doesn't exists.`);
    }

    return coupon;
  }

  async getCoupons() {
    return this.databaseService.coupon.findMany();
  }

  async couponExists(code: string) {
    const coupon = await this.databaseService.coupon.findUnique({
      where: {code},
    });

    if (!coupon) {
      return false;
    }

    return true;
  }

  async deleteCouponByCode(code: string) {
    await this.databaseService.coupon.delete({where: {code}});

    return {
      statusCode: 200,
      success: true,
      message: `Coupon with code ${code} was deleted.`,
    };
  }

  async createCoupon(data: CreateCouponBodyType) {
    const {discount, productId, description, expiration} = data;

    const [code, product] = await Promise.all([
      this.generateCouponCode(),
      this.productService.getByIdOrThrow(productId),
    ]);

    const createdCoupon = await this.databaseService.coupon.create({
      data: {
        code,
        description,
        discount,
        expiration,
        products: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    return createdCoupon;
  }

  async editCouponByCode(couponCode: string, data: EditCouponByCodeBodyType) {
    const {description, discount, expiration, productId} = data;

    const [coupon, product] = await Promise.all([
      this.getCouponByCode(couponCode),
      this.productService.getByIdOrThrow(productId),
    ]);

    const updatedCoupon = await this.databaseService.coupon.update({
      where: {id: coupon.id},
      data: {
        description,
        discount,
        expiration,
        products: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    return {
      statusCode: 200,
      success: true,
      coupon: {
        ...updatedCoupon,
      },
    };
  }

  async editCouponById(couponId: string, data: EditCouponByIdBodyType) {
    const {description, discount, expiration, productId} = data;

    const [coupon, product] = await Promise.all([
      this.getByIdOrThrow(couponId),
      this.productService.getByIdOrThrow(productId),
    ]);

    const updatedCoupon = await this.databaseService.coupon.update({
      where: {id: coupon.id},
      data: {
        description,
        discount,
        expiration,
        products: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    return {
      statusCode: 200,
      success: true,
      coupon: {
        ...updatedCoupon,
      },
    };
  }

  async deleteCouponById(id: string) {
    await this.databaseService.coupon.delete({where: {id}});

    return {
      statusCode: 200,
      success: true,
      message: `Coupon with id ${id} was deleted.`,
    };
  }

  async getCouponByCode(code: string) {
    const coupon = await this.databaseService.coupon.findUnique({
      where: {code},
    });

    if (!coupon) {
      throw new NotFound(`Coupon with code ${code} doesn't exists.`);
    }

    return coupon;
  }

  async generateCouponCode() {
    const generatedCoupon = getCouponCode();

    const couponExists = await this.couponExists(generatedCoupon);

    if (!couponExists) {
      return generatedCoupon;
    }

    return getCouponCode();
  }
}
