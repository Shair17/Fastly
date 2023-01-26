import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.admin.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    admin: Prisma.XOR<
      Prisma.AdminCreateInput,
      Prisma.AdminUncheckedCreateInput
    >,
  ) {
    return prisma.admin.create({
      data: admin,
    });
  },

  async createMany(admins: Prisma.Enumerable<Prisma.AdminCreateManyInput>) {
    return prisma.admin.createMany({
      data: admins,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.AdminUpdateInput,
          Prisma.AdminUncheckedUpdateInput
        > &
          Prisma.AdminUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.AdminUncheckedUpdateInput,
          Prisma.AdminUpdateInput
        > &
          Prisma.AdminUpdateInput),
  ) {
    return prisma.admin.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.AdminUpdateManyMutationInput,
      Prisma.AdminUncheckedUpdateManyInput
    >,
  ) {
    return prisma.admin.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.admin.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.AdminWhereInput) {
    return prisma.admin.deleteMany({
      where,
    });
  },
};
