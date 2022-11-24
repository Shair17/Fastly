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

const DEFAULT_ADMINS_TO_GENERATE = 0;
const DEFAULT_CUSTOMERS_TO_GENERATE = 5;
const DEFAULT_DEALERS_TO_GENERATE = 5;
const DEFAULT_COUPONS_TO_GENERATE = 0;
const DEFAULT_DEALER_RANKINGS_TO_GENERATE = 5;
const DEFAULT_ORDERS_TO_GENERATE = 0;
const DEFAULT_PRODUCTS_TO_GENERATE = 5;
const DEFAULT_STORES_TO_GENERATE = 5;
const DEFAULT_STORE_RANKINGS_TO_GENERATE = 5;
const DEFAULT_USER_ADDRESSES_TO_GENERATE = 0;
const DEFAULT_USER_CART_TO_GENERATE = 0;
const DEFAULT_USER_FAVORORITES_TO_GENERATE = 0;

async function main() {
  // ADMINS
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

  // CUSTOMERS
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

  // DEALERS
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

  // COUPONS
  console.log(`Seeding ${DEFAULT_COUPONS_TO_GENERATE} coupons...`);
  [...Array(DEFAULT_COUPONS_TO_GENERATE).keys()].forEach(async () => {
    await coupon.create({
      code: data.getCouponCode(),
      description: data.getCouponCode(),
      discount: data.getNumberBeetwen(0, 100),
    });
  });
  console.log(
    `Seeding ${DEFAULT_COUPONS_TO_GENERATE} coupons has been finished.`,
  );

  // DEALER RANKINGS
  console.log(
    `Seeding ${DEFAULT_DEALER_RANKINGS_TO_GENERATE} dealer rankings...`,
  );
  [...Array(DEFAULT_DEALER_RANKINGS_TO_GENERATE).keys()].forEach(async () => {
    // await dealerRanking.create({
    // value: data.generateNumberBeetwen(0, 5),
    // comment: data.getDescription(),
    // });
  });
  console.log(
    `Seeding ${DEFAULT_DEALER_RANKINGS_TO_GENERATE} dealer rankings has been finished.`,
  );

  // ORDERS
  console.log(`Seeding ${DEFAULT_ORDERS_TO_GENERATE} orders...`);
  [...Array(DEFAULT_ORDERS_TO_GENERATE).keys()].forEach(async () => {
    // await order.create({});
  });
  console.log(
    `Seeding ${DEFAULT_ORDERS_TO_GENERATE} orders has been finished.`,
  );

  // PRODUCTS
  console.log(`Seeding ${DEFAULT_PRODUCTS_TO_GENERATE} products...`);
  [...Array(DEFAULT_PRODUCTS_TO_GENERATE).keys()].forEach(async () => {
    await product.create({
      blurHash: data.getCouponCode(),
      image: data.getImage(),
      name: data.getFullName(),
      store: {
        create: {
          description: data.getDescription(1),
          logo: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1666557512/defaults/logos/fastly_square.png',
          address: data.getAddress(),
          category: data.getStoreCategory(),
          name: data.getFullName(),
          owner: {
            create: {
              address: data.getAddress(),
              avatar: data.getAvatar(),
              birthDate: data.getBirthDate(),
              dni: data.getDNI(),
              email: data.getEmail(),
              name: data.getFullName(),
              password: await data.getPassword(),
              phone: data.getPhone(),
              isActive: true,
            },
          },
        },
      },
    });
  });
  console.log(
    `Seeding ${DEFAULT_PRODUCTS_TO_GENERATE} products has been finished.`,
  );

  // STORES
  console.log(`Seeding ${DEFAULT_STORES_TO_GENERATE} stores...`);
  [...Array(DEFAULT_STORES_TO_GENERATE).keys()].forEach(async () => {
    await store.create({
      description: data.getDescription(1),
      logo: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1666557512/defaults/logos/fastly_square.png',
      address: data.getAddress(),
      category: data.getStoreCategory(),
      name: data.getFullName(),
      owner: {
        create: {
          address: data.getAddress(),
          avatar: data.getAvatar(),
          birthDate: data.getBirthDate(),
          dni: data.getDNI(),
          email: data.getEmail(),
          name: data.getFullName(),
          password: await data.getPassword(),
          phone: data.getPhone(),
          isActive: true,
        },
      },
    });
  });
  console.log(
    `Seeding ${DEFAULT_STORES_TO_GENERATE} stores has been finished.`,
  );

  // STORE RANKINGS
  console.log(
    `Seeding ${DEFAULT_STORE_RANKINGS_TO_GENERATE} store rankings...`,
  );
  [...Array(DEFAULT_STORE_RANKINGS_TO_GENERATE).keys()].forEach(async () => {
    // await storeRanking.create({});
  });
  console.log(
    `Seeding ${DEFAULT_STORE_RANKINGS_TO_GENERATE} store rankings has been finished.`,
  );

  // USER ADDRESSES
  console.log(
    `Seeding ${DEFAULT_USER_ADDRESSES_TO_GENERATE} user addresses...`,
  );
  [...Array(DEFAULT_USER_ADDRESSES_TO_GENERATE).keys()].forEach(async () => {
    // await userAddress.create({});
  });
  console.log(
    `Seeding ${DEFAULT_USER_ADDRESSES_TO_GENERATE} user addresses has been finished.`,
  );

  // USER CART
  console.log(`Seeding ${DEFAULT_USER_CART_TO_GENERATE} user cart...`);
  [...Array(DEFAULT_USER_CART_TO_GENERATE).keys()].forEach(async () => {
    // await userCart.create({});
  });
  console.log(
    `Seeding ${DEFAULT_USER_CART_TO_GENERATE} user cart has been finished.`,
  );

  // USER FAVORITES
  console.log(
    `Seeding ${DEFAULT_USER_FAVORORITES_TO_GENERATE} user favorites...`,
  );
  [...Array(DEFAULT_USER_FAVORORITES_TO_GENERATE).keys()].forEach(async () => {
    // await userFavorite.create({});
  });
  console.log(
    `Seeding ${DEFAULT_USER_FAVORORITES_TO_GENERATE} user favorites has been finished.`,
  );

  // await prisma.store.updateMany({
  //   where: {
  //     logo: null,
  //   },
  //   data: {
  //     logo: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1666557512/defaults/logos/fastly_square.png',
  //   },
  // });
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
