import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DealerModule } from './modules/dealer/dealer.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { SearchModule } from './modules/search/search.module';
import { StoreModule } from './modules/store/store.module';
import { UserModule } from './modules/user/user.module';

import { AppController } from './app.controller';

export const AppModule = [
	// Others modules
	...AdminModule,
	...AuthModule,
	...CustomerModule,
	...DealerModule,
	...OrderModule,
	...ProductModule,
	...CouponModule,
	...SearchModule,
	...StoreModule,
	...UserModule,

	// Main Controller
	AppController,
];
