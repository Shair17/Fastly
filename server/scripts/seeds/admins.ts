import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Admin } from '../../src/modules/admin/admin.entity';
import { Customer } from '../../src/modules/customer/customer.entity';
import { Dealer } from '../../src/modules/dealer/dealer.entity';
import { DealerRanking } from '../../src/modules/dealer/dealer-ranking.entity';
import { User } from '../../src/modules/user/user.entity';
import { UserAddress } from '../../src/modules/user/user-address.entity';
import { UserFavorite } from '../../src/modules/user/user-favorite.entity';
import { UserCart } from '../../src/modules/user/user-cart.entity';
import { Order } from '../../src/modules/order/order.entity';
import { Product } from '../../src/modules/product/product.entity';
import { Coupon } from '../../src/modules/coupon/coupon.entity';
import { Store } from '../../src/modules/store/store.entity';
import { StoreRanking } from '../../src/modules/store/store-ranking.entity';

import { faker } from '@faker-js/faker';
import { generateRandomDNI } from '../../src/utils/generateRandomDNI';
import { generateRandomPhone } from '../../src/utils/generateRandomPhone';

const options: DataSourceOptions = {
	type: 'mysql',
	// @ts-ignore
	host: process.env.DATABASE_HOST,
	// @ts-ignore
	port: +process.env.DATABASE_PORT,
	// @ts-ignore
	username: process.env.DATABASE_USERNAME,
	// @ts-ignore
	password: process.env.DATABASE_PASSWORD,
	// @ts-ignore
	database: process.env.DATABASE_NAME,
	entities: [
		Admin,
		Customer,
		Dealer,
		DealerRanking,
		User,
		UserAddress,
		UserFavorite,
		UserCart,
		Order,
		Product,
		Coupon,
		Store,
		StoreRanking,
	],
	synchronize: true,
};

const dataSource = new DataSource(options);

dataSource.initialize().then(
	async (dataSource) => {
		let admin = new Admin();

		admin.name = faker.name.findName();
		admin.address = faker.address.city();
		admin.birthDate = faker.date.birthdate();
		admin.dni = generateRandomDNI();
		admin.email = faker.internet.email();
		admin.password = faker.internet.password();
		admin.phone = generateRandomPhone();

		let adminRepository = dataSource.getRepository(Admin);

		adminRepository
			.save(admin)
			.then((admin) => console.log('Admin has been saved: ', admin))
			.catch((error) => console.log('Cannot save. Error: ', error));
	},
	(error) => console.log('Cannot connect: ', error)
);
