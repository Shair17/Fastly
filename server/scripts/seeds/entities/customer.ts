import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.customer.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    customer: Prisma.XOR<
      Prisma.CustomerCreateInput,
      Prisma.CustomerUncheckedCreateInput
    >,
  ) {
    return prisma.customer.create({
      data: customer,
    });
  },

  async createMany(
    customers: Prisma.Enumerable<Prisma.CustomerCreateManyInput>,
  ) {
    return prisma.customer.createMany({
      data: customers,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.CustomerUpdateInput,
          Prisma.CustomerUncheckedUpdateInput
        > &
          Prisma.CustomerUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.CustomerUncheckedUpdateInput,
          Prisma.CustomerUpdateInput
        > &
          Prisma.CustomerUpdateInput),
  ) {
    return prisma.customer.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.CustomerUpdateManyMutationInput,
      Prisma.CustomerUncheckedUpdateManyInput
    >,
  ) {
    return prisma.customer.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.customer.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.CustomerWhereInput) {
    return prisma.customer.deleteMany({
      where,
    });
  },
};
