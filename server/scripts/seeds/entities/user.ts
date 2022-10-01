import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    user: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>,
  ) {
    return prisma.user.create({
      data: user,
    });
  },

  async createMany(users: Prisma.Enumerable<Prisma.UserCreateManyInput>) {
    return prisma.user.createMany({
      data: users,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.UserUpdateInput,
          Prisma.UserUncheckedUpdateInput
        > &
          Prisma.UserUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.UserUncheckedUpdateInput,
          Prisma.UserUpdateInput
        > &
          Prisma.UserUpdateInput),
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.UserUpdateManyMutationInput,
      Prisma.UserUncheckedUpdateManyInput
    >,
  ) {
    return prisma.user.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.UserWhereInput) {
    return prisma.user.deleteMany({
      where,
    });
  },
};
