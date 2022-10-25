import {OrderStatus, Product, Store, UserAddress} from '@prisma/client';
import {isCuid} from 'cuid';
import {isString} from '../../utils';

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IOrderClass {
  id: string;
  order: IOrder;
  coordinates: ICoordinates;
}

export type IOrder = {
  id: string;
  address: UserAddress;
  createdAt: Date;
  updatedAt: Date;
  arrivalTime: Date | null;
  deliveryPrice: number;
  message: string | null;
  // products: Product[];
  products: (Product & {
    store: {
      name: string;
      owner: {
        id: string;
      };
    };
  })[];
  quantity: number;
  status: OrderStatus;
  dealerId: string | null;
  userId: string;
  userAddressId: string;

  userName: string;
  userPhone: string;
};

export class OrderClass implements IOrderClass {
  id: string;
  order: IOrder;
  coordinates: ICoordinates;

  constructor(
    order: IOrder,
    coordinates: ICoordinates = {latitude: 0, longitude: 0},
  ) {
    this.id = order.id;
    this.order = order;
    this.coordinates = coordinates;
  }

  get status(): OrderStatus {
    return this.order.status;
  }

  hasDealer(): boolean {
    // TODO: reemplazzar el código existente por el comentario
    // return isString(this.order.dealerId) && isCuid(this.order.dealerId)
    return typeof this.order.dealerId === 'string';
  }

  getUserId(): string | null {
    return this.order.userId;
  }

  getDealerId(): string | null {
    return this.order.dealerId;
  }

  setCoordinates({latitude, longitude}: ICoordinates): void {
    this.coordinates = {latitude, longitude};
  }
}
