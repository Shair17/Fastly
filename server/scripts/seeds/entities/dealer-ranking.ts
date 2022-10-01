import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.dealerRanking.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    dealerRanking: Prisma.XOR<
      Prisma.DealerRankingCreateInput,
      Prisma.DealerRankingUncheckedCreateInput
    >,
  ) {
    return prisma.dealerRanking.create({
      data: dealerRanking,
    });
  },

  async createMany(
    dealerRankings: Prisma.Enumerable<Prisma.DealerRankingCreateManyInput>,
  ) {
    return prisma.dealerRanking.createMany({
      data: dealerRankings,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.DealerRankingUpdateInput,
          Prisma.DealerRankingUncheckedUpdateInput
        > &
          Prisma.DealerRankingUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.DealerRankingUncheckedUpdateInput,
          Prisma.DealerRankingUpdateInput
        > &
          Prisma.DealerRankingUpdateInput),
  ) {
    return prisma.dealerRanking.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.DealerRankingUpdateManyMutationInput,
      Prisma.DealerRankingUncheckedUpdateManyInput
    >,
  ) {
    return prisma.dealerRanking.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.dealerRanking.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.DealerRankingWhereInput) {
    return prisma.dealerRanking.deleteMany({
      where,
    });
  },
};
