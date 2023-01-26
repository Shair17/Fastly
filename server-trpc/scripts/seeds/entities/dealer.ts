import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.dealer.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    dealer: Prisma.XOR<
      Prisma.DealerCreateInput,
      Prisma.DealerUncheckedCreateInput
    >,
  ) {
    return prisma.dealer.create({
      data: dealer,
    });
  },

  async createMany(dealers: Prisma.Enumerable<Prisma.DealerCreateManyInput>) {
    return prisma.dealer.createMany({
      data: dealers,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.DealerUpdateInput,
          Prisma.DealerUncheckedUpdateInput
        > &
          Prisma.DealerUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.DealerUncheckedUpdateInput,
          Prisma.DealerUpdateInput
        > &
          Prisma.DealerUpdateInput),
  ) {
    return prisma.dealer.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.DealerUpdateManyMutationInput,
      Prisma.DealerUncheckedUpdateManyInput
    >,
  ) {
    return prisma.dealer.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.dealer.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.DealerWhereInput) {
    return prisma.dealer.deleteMany({
      where,
    });
  },
};
