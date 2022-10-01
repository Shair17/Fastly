import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.storeRanking.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    storeRanking: Prisma.XOR<
      Prisma.StoreRankingCreateInput,
      Prisma.StoreRankingUncheckedCreateInput
    >,
  ) {
    return prisma.storeRanking.create({
      data: storeRanking,
    });
  },

  async createMany(
    storeRankings: Prisma.Enumerable<Prisma.StoreRankingCreateManyInput>,
  ) {
    return prisma.storeRanking.createMany({
      data: storeRankings,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.StoreRankingUpdateInput,
          Prisma.StoreRankingUncheckedUpdateInput
        > &
          Prisma.StoreRankingUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.StoreRankingUncheckedUpdateInput,
          Prisma.StoreRankingUpdateInput
        > &
          Prisma.StoreRankingUpdateInput),
  ) {
    return prisma.storeRanking.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.StoreRankingUpdateManyMutationInput,
      Prisma.StoreRankingUncheckedUpdateManyInput
    >,
  ) {
    return prisma.storeRanking.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.storeRanking.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.StoreRankingWhereInput) {
    return prisma.storeRanking.deleteMany({
      where,
    });
  },
};
