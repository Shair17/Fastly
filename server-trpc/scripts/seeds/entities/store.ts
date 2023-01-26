import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.store.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    store: Prisma.XOR<
      Prisma.StoreCreateInput,
      Prisma.StoreUncheckedCreateInput
    >,
  ) {
    return prisma.store.create({
      data: store,
    });
  },

  async createMany(stores: Prisma.Enumerable<Prisma.StoreCreateManyInput>) {
    return prisma.store.createMany({
      data: stores,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.StoreUpdateInput,
          Prisma.StoreUncheckedUpdateInput
        > &
          Prisma.StoreUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.StoreUncheckedUpdateInput,
          Prisma.StoreUpdateInput
        > &
          Prisma.StoreUpdateInput),
  ) {
    return prisma.store.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.StoreUpdateManyMutationInput,
      Prisma.StoreUncheckedUpdateManyInput
    >,
  ) {
    return prisma.store.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.store.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.StoreWhereInput) {
    return prisma.store.deleteMany({
      where,
    });
  },
};
