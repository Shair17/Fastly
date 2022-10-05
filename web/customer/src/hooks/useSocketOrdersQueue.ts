import {useState, useEffect} from 'react';
import {OrderClass} from '@fastly/interfaces/appInterfaces';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export type OrdersStoreValues = {
  ordersCancelledQueue: OrderClass[];
  ordersDeliveredQueue: OrderClass[];
  ordersPendingQueue: OrderClass[];
  ordersProblemQueue: OrderClass[];
  ordersQueue: OrderClass[];
  ordersSentQueue: OrderClass[];
};

// TODO: get only orders for my stores associed with my customer account!!
export const useSocketOrdersQueue = (): OrdersStoreValues => {
  const socket = useSocketStore(s => s.socket);
  const [ordersQueueState, setOrdersQueue] = useState<OrdersStoreValues>({
    ordersCancelledQueue: [],
    ordersDeliveredQueue: [],
    ordersPendingQueue: [],
    ordersProblemQueue: [],
    ordersQueue: [],
    ordersSentQueue: [],
  });

  // useEffect events goes here...

  return ordersQueueState;
};
