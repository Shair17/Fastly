import {Order, OrderStatus} from '@prisma/client';
import {validate} from 'uuid';

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IOrderClass {
  id: string;
  order: Order;
  coordinates: ICoordinates;
}

export class OrderClass implements IOrderClass {
  id: string;
  order: Order;
  coordinates: ICoordinates;

  constructor(
    order: Order,
    coordinates: ICoordinates = {latitude: 0, longitude: 0},
  ) {
    this.id = order.id;
    this.order = order;
    this.coordinates = coordinates;
  }

  get status(): OrderStatus {
    return this.order.status;
  }

  get hasDealer(): boolean {
    return (
      typeof this.order.dealerId === 'string' && validate(this.order.dealerId)
    );
  }

  get userId(): string | null {
    return this.order.userId;
  }

  get dealerId(): string | null {
    return this.order.dealerId;
  }

  setCoordinates({latitude, longitude}: ICoordinates): void {
    this.coordinates = {latitude, longitude};
  }
}
