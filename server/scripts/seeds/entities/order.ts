import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.order.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    order: Prisma.XOR<
      Prisma.OrderCreateInput,
      Prisma.OrderUncheckedCreateInput
    >,
  ) {
    return prisma.order.create({
      data: order,
    });
  },

  async createMany(orders: Prisma.Enumerable<Prisma.OrderCreateManyInput>) {
    return prisma.order.createMany({
      data: orders,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.OrderUpdateInput,
          Prisma.OrderUncheckedUpdateInput
        > &
          Prisma.OrderUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.OrderUncheckedUpdateInput,
          Prisma.OrderUpdateInput
        > &
          Prisma.OrderUpdateInput),
  ) {
    return prisma.order.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.OrderUpdateManyMutationInput,
      Prisma.OrderUncheckedUpdateManyInput
    >,
  ) {
    return prisma.order.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.order.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.OrderWhereInput) {
    return prisma.order.deleteMany({
      where,
    });
  },
};
