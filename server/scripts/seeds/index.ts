import {PrismaClient} from '@prisma/client';
import {
  admin,
  coupon,
  customer,
  dealer,
  dealerRanking,
  order,
  product,
  store,
  storeRanking,
  user,
  userAddress,
  userCart,
  userFavorite,
} from './entities';
import * as data from './data';

export const prisma = new PrismaClient();

const DEFAULT_ADMINS_TO_GENERATE = 10;
const DEFAULT_CUSTOMERS_TO_GENERATE = 10;
const DEFAULT_DEALERS_TO_GENERATE = 10;

async function main() {
  console.log(`Seeding ${DEFAULT_ADMINS_TO_GENERATE} admins...`);
  [...Array(DEFAULT_ADMINS_TO_GENERATE).keys()].forEach(async () => {
    await admin.create({
      address: data.getAddress(),
      avatar: data.getAvatar(),
      birthDate: data.getBirthDate(),
      dni: data.getDNI(),
      email: data.getEmail(),
      name: data.getFullName(),
      password: await data.getPassword(),
      phone: data.getPhone(),
      isActive: true,
    });
  });
  console.log(
    `Seeding ${DEFAULT_ADMINS_TO_GENERATE} admins has been finished.`,
  );

  console.log(`Seeding ${DEFAULT_CUSTOMERS_TO_GENERATE} customers...`);
  [...Array(DEFAULT_CUSTOMERS_TO_GENERATE).keys()].forEach(async () => {
    await customer.create({
      address: data.getAddress(),
      avatar: data.getAvatar(),
      birthDate: data.getBirthDate(),
      dni: data.getDNI(),
      email: data.getEmail(),
      name: data.getFullName(),
      password: await data.getPassword(),
      phone: data.getPhone(),
      isActive: true,
    });
  });
  console.log(
    `Seeding ${DEFAULT_CUSTOMERS_TO_GENERATE} customers has been finished.`,
  );

  console.log(`Seeding ${DEFAULT_DEALERS_TO_GENERATE} dealers...`);
  [...Array(DEFAULT_DEALERS_TO_GENERATE).keys()].forEach(async () => {
    await dealer.create({
      address: data.getAddress(),
      avatar: data.getAvatar(),
      birthDate: data.getBirthDate(),
      dni: data.getDNI(),
      email: data.getEmail(),
      name: data.getFullName(),
      password: await data.getPassword(),
      phone: data.getPhone(),
      isActive: true,
      available: false,
      vehicle: data.getVehicle(),
    });
  });
  console.log(
    `Seeding ${DEFAULT_DEALERS_TO_GENERATE} dealers has been finished.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
