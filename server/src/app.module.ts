import {AppController} from './app.controller';
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
  FeedModule,
} from './modules';

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
  ...FeedModule,
];
