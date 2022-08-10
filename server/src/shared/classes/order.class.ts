import {nanoid} from 'nanoid';
import {Order} from '@prisma/client';
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
    this.id = nanoid();
    this.order = order;
    this.coordinates = coordinates;
  }

  get status() {
    return this.order.status;
  }

  get hasDealer() {
    return (
      typeof this.order.dealerId === 'string' && validate(this.order.dealerId)
    );
  }

  get userId() {
    return this.order.userId;
  }

  get dealerId() {
    return this.order.dealerId;
  }

  setCoordinates({latitude, longitude}: ICoordinates) {
    this.coordinates = {latitude, longitude};
  }
}
