import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.userCart.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    userCart: Prisma.XOR<
      Prisma.UserCartCreateInput,
      Prisma.UserCartUncheckedCreateInput
    >,
  ) {
    return prisma.userCart.create({
      data: userCart,
    });
  },

  async createMany(
    userCarts: Prisma.Enumerable<Prisma.UserCartCreateManyInput>,
  ) {
    return prisma.userCart.createMany({
      data: userCarts,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.UserCartUpdateInput,
          Prisma.UserCartUncheckedUpdateInput
        > &
          Prisma.UserCartUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.UserCartUncheckedUpdateInput,
          Prisma.UserCartUpdateInput
        > &
          Prisma.UserCartUpdateInput),
  ) {
    return prisma.userCart.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.UserCartUpdateManyMutationInput,
      Prisma.UserCartUncheckedUpdateManyInput
    >,
  ) {
    return prisma.userCart.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.userCart.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.UserCartWhereInput) {
    return prisma.userCart.deleteMany({
      where,
    });
  },
};
