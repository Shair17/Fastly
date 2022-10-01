import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.userFavorite.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    userFavorite: Prisma.XOR<
      Prisma.UserFavoriteCreateInput,
      Prisma.UserFavoriteUncheckedCreateInput
    >,
  ) {
    return prisma.userFavorite.create({
      data: userFavorite,
    });
  },

  async createMany(
    userFavorites: Prisma.Enumerable<Prisma.UserFavoriteCreateManyInput>,
  ) {
    return prisma.userFavorite.createMany({
      data: userFavorites,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.UserFavoriteUpdateInput,
          Prisma.UserFavoriteUncheckedUpdateInput
        > &
          Prisma.UserFavoriteUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.UserFavoriteUncheckedUpdateInput,
          Prisma.UserFavoriteUpdateInput
        > &
          Prisma.UserFavoriteUpdateInput),
  ) {
    return prisma.userFavorite.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.UserFavoriteUpdateManyMutationInput,
      Prisma.UserFavoriteUncheckedUpdateManyInput
    >,
  ) {
    return prisma.userFavorite.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.userFavorite.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.UserFavoriteWhereInput) {
    return prisma.userFavorite.deleteMany({
      where,
    });
  },
};
