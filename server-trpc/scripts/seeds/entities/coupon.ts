import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.coupon.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    coupon: Prisma.XOR<
      Prisma.CouponCreateInput,
      Prisma.CouponUncheckedCreateInput
    >,
  ) {
    return prisma.coupon.create({
      data: coupon,
    });
  },

  async createMany(coupons: Prisma.Enumerable<Prisma.CouponCreateManyInput>) {
    return prisma.coupon.createMany({
      data: coupons,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.CouponUpdateInput,
          Prisma.CouponUncheckedUpdateInput
        > &
          Prisma.CouponUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.CouponUncheckedUpdateInput,
          Prisma.CouponUpdateInput
        > &
          Prisma.CouponUpdateInput),
  ) {
    return prisma.coupon.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.CouponUpdateManyMutationInput,
      Prisma.CouponUncheckedUpdateManyInput
    >,
  ) {
    return prisma.coupon.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.coupon.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.CouponWhereInput) {
    return prisma.coupon.deleteMany({
      where,
    });
  },
};
