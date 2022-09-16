import create from 'zustand';
import {combine} from 'zustand/middleware';
import {OrderClass} from '@fastly/interfaces/app';

export type OrdersStoreValues = {
  ordersCancelledQueue: OrderClass[];
  ordersDeliveredQueue: OrderClass[];
  ordersPendingQueue: OrderClass[];
  ordersProblemQueue: OrderClass[];
  ordersQueue: OrderClass[];
  ordersSentQueue: OrderClass[];
};

const getDefaultValues = (): OrdersStoreValues => {
  return {
    ordersCancelledQueue: [],
    ordersDeliveredQueue: [],
    ordersPendingQueue: [],
    ordersProblemQueue: [],
    ordersQueue: [],
    ordersSentQueue: [],
  };
};

export const useOrdersStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setOrders: ({
      ordersCancelledQueue,
      ordersDeliveredQueue,
      ordersPendingQueue,
      ordersProblemQueue,
      ordersQueue,
      ordersSentQueue,
    }: OrdersStoreValues) => {
      set({
        ordersCancelledQueue,
        ordersDeliveredQueue,
        ordersPendingQueue,
        ordersProblemQueue,
        ordersQueue,
        ordersSentQueue,
      });
    },
    setOrdersCancelledQueue: (ordersCancelledQueue: OrderClass[]) => {
      set({ordersCancelledQueue});
    },
    setOrdersDeliveredQueue: (ordersDeliveredQueue: OrderClass[]) => {
      set({ordersDeliveredQueue});
    },
    setOrdersPendingQueue: (ordersPendingQueue: OrderClass[]) => {
      set({ordersPendingQueue});
    },
    setOrdersProblemQueue: (ordersProblemQueue: OrderClass[]) => {
      set({ordersProblemQueue});
    },
    setOrdersQueue: (ordersQueue: OrderClass[]) => {
      set({ordersQueue});
    },
    setOrdersSentQueue: (ordersSentQueue: OrderClass[]) => {
      set({ordersSentQueue});
    },
  })),
);
