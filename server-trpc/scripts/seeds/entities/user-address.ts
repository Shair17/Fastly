import {prisma} from '..';
import {Prisma} from '@prisma/client';

export default {
  async findUnique(id: string) {
    return prisma.userAddress.findUnique({
      where: {
        id,
      },
    });
  },

  async create(
    userAddress: Prisma.XOR<
      Prisma.UserAddressCreateInput,
      Prisma.UserAddressUncheckedCreateInput
    >,
  ) {
    return prisma.userAddress.create({
      data: userAddress,
    });
  },

  async createMany(
    userAddresses: Prisma.Enumerable<Prisma.UserAddressCreateManyInput>,
  ) {
    return prisma.userAddress.createMany({
      data: userAddresses,
    });
  },

  async update(
    id: string,
    data:
      | (Prisma.Without<
          Prisma.UserAddressUpdateInput,
          Prisma.UserAddressUncheckedUpdateInput
        > &
          Prisma.UserAddressUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.UserAddressUncheckedUpdateInput,
          Prisma.UserAddressUpdateInput
        > &
          Prisma.UserAddressUpdateInput),
  ) {
    return prisma.userAddress.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateMany(
    data: Prisma.XOR<
      Prisma.UserAddressUpdateManyMutationInput,
      Prisma.UserAddressUncheckedUpdateManyInput
    >,
  ) {
    return prisma.userAddress.updateMany({
      data,
    });
  },

  async delete(id: string) {
    return prisma.userAddress.delete({
      where: {
        id,
      },
    });
  },

  async deleteMany(where?: Prisma.UserAddressWhereInput) {
    return prisma.userAddress.deleteMany({
      where,
    });
  },
};
