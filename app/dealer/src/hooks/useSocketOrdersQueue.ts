import {useState, useEffect} from 'react';
import {OrdersStoreValues} from '@fastly/stores/useOrdersStore';
import {OrderClass} from '@fastly/interfaces/app';
import {useSocketStore} from '@fastly/stores/useSocketStore';

// const ordersCancelledQueue = useOrdersStore(o => o.ordersCancelledQueue);
// const ordersDeliveredQueue = useOrdersStore(o => o.ordersDeliveredQueue);
// const ordersPendingQueue = useOrdersStore(o => o.ordersCancelledQueue);
// const ordersProblemQueue = useOrdersStore(o => o.ordersCancelledQueue);
// const ordersQueue = useOrdersStore(o => o.ordersCancelledQueue);
// const ordersSentQueue = useOrdersStore(o => o.ordersCancelledQueue);
// const setOrdersCancelledQueue = useOrdersStore(
//   o => o.setOrdersCancelledQueue,
// );
// const setOrdersDeliveredQueue = useOrdersStore(
//   o => o.setOrdersDeliveredQueue,
// );
// const setOrdersPendingQueue = useOrdersStore(o => o.setOrdersPendingQueue);
// const setOrdersProblemQueue = useOrdersStore(o => o.setOrdersProblemQueue);
// const setOrdersQueue = useOrdersStore(o => o.setOrdersQueue);
// const setOrdersSentQueue = useOrdersStore(o => o.setOrdersSentQueue);

// Usar este hook para obtener la cola de ordenes
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

  /**
  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_QUEUE', (ordersQueue: OrderClass[]) => {
      // setOrdersQueue(ordersQueue);
      setOrdersQueue({
        ...ordersQueueState,
        ordersQueue,
      });
    });

    return () => {
      socket.off('ORDERS_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      'ORDERS_DELIVERED_QUEUE',
      (ordersDeliveredQueue: OrderClass[]) => {
        // setOrdersDeliveredQueue(ordersDeliveredQueue);
        setOrdersQueue({
          ...ordersQueueState,
          ordersDeliveredQueue,
        });
      },
    );

    return () => {
      socket.off('ORDERS_DELIVERED_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      'ORDERS_CANCELLED_QUEUE',
      (ordersCancelledQueue: OrderClass[]) => {
        // setOrdersCancelledQueue(ordersCancelledQueue);
        setOrdersQueue({
          ...ordersQueueState,
          ordersCancelledQueue,
        });
      },
    );

    return () => {
      socket.off('ORDERS_CANCELLED_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_PROBLEM_QUEUE', (ordersProblemQueue: OrderClass[]) => {
      // setOrdersProblemQueue(ordersProblemQueue);
      setOrdersQueue({
        ...ordersQueueState,
        ordersProblemQueue,
      });
    });

    return () => {
      socket.off('ORDERS_PROBLEM_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_SENT_QUEUE', (ordersSentQueue: OrderClass[]) => {
      // setOrdersSentQueue(ordersSentQueue);
      setOrdersQueue({
        ...ordersQueueState,
        ordersSentQueue,
      });
    });

    return () => {
      socket.off('ORDERS_SENT_QUEUE');
    };
  }, [socket]);*/

  useEffect(() => {
    socket?.on('ORDERS_PENDING_QUEUE', (ordersPendingQueue: OrderClass[]) => {
      setOrdersQueue({
        ...ordersQueueState,
        ordersPendingQueue,
      });
    });

    return () => {
      socket?.off('ORDERS_PENDING_QUEUE');
    };
  }, [socket]);

  return ordersQueueState;
};
