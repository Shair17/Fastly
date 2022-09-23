import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
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

export const AppModule: Constructor<unknown>[] = [
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
