import { AppController } from '@fastly/app.controller';
import {
	AuthModule,
	UserModule,
	AdminModule,
	CustomerModule,
	DealerModule,
	OrderModule,
	SearchModule,
	ProductModule,
	CouponModule,
	StoreModule,
} from '@fastly/modules';

export const AppModule = [
	AppController,

	...AuthModule,
	...AdminModule,
	...CustomerModule,
	...DealerModule,
	...UserModule,
	...OrderModule,
	...SearchModule,
	...ProductModule,
	...CouponModule,
	...StoreModule,
];
