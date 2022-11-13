import {useState, useEffect} from 'react';
import notificationSound from '@fastly/assets/sounds/notification.mp3';
import useSound from 'use-sound';
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
  const [play] = useSound(notificationSound);
  const [ordersQueueState, setOrdersQueue] = useState<OrdersStoreValues>({
    ordersCancelledQueue: [],
    ordersDeliveredQueue: [],
    ordersPendingQueue: [],
    ordersProblemQueue: [],
    ordersQueue: [],
    ordersSentQueue: [],
  });

  // useEffect events goes here...
  // TODO: when got a order we can play audio notification

  return ordersQueueState;
};
