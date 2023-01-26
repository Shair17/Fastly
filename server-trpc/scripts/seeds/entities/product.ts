import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    product: Prisma.XOR<
      Prisma.ProductCreateInput,
      Prisma.ProductUncheckedCreateInput
    >,
  ) {
    return prisma.product.create({
      data: product,
    });
  },

  async createMany(products: Prisma.Enumerable<Prisma.ProductCreateManyInput>) {
    return prisma.product.createMany({
      data: products,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.ProductUpdateInput,
          Prisma.ProductUncheckedUpdateInput
        > &
          Prisma.ProductUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.ProductUncheckedUpdateInput,
          Prisma.ProductUpdateInput
        > &
          Prisma.ProductUpdateInput),
  ) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.ProductUpdateManyMutationInput,
      Prisma.ProductUncheckedUpdateManyInput
    >,
  ) {
    return prisma.product.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.ProductWhereInput) {
    return prisma.product.deleteMany({
      where,
    });
  },
};
