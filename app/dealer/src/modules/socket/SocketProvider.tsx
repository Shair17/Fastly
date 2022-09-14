import React, {Fragment, useEffect} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useAppState} from '@fastly/hooks/useAppState';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {useOrdersStore} from '@fastly/stores/useOrdersStore';
import {OrderClass} from '@fastly/interfaces/app';

export const SocketProvider: React.FC = ({children}) => {
  const socket = useSocketStore(s => s.socket);
  const setOrdersCancelledQueue = useOrdersStore(
    o => o.setOrdersCancelledQueue,
  );
  const setOrdersDeliveredQueue = useOrdersStore(
    o => o.setOrdersDeliveredQueue,
  );
  const setOrdersPendingQueue = useOrdersStore(o => o.setOrdersPendingQueue);
  const setOrdersProblemQueue = useOrdersStore(o => o.setOrdersProblemQueue);
  const setOrdersQueue = useOrdersStore(o => o.setOrdersQueue);
  const setOrdersSentQueue = useOrdersStore(o => o.setOrdersSentQueue);
  const setSocket = useSocketStore(s => s.setSocket);
  const setOnline = useSocketStore(s => s.setOnline);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);
  const accessToken = useAuthStore(t => t.accessToken);
  const appState = useAppState();

  useEffect(() => {
    setSocket(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!socket) return;

    setOnline(socket.connected);

    Notifier.showNotification({
      description: socket.connected
        ? 'Conectado a Fastly.'
        : 'Desconectado de Fastly, reconectando...',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: socket.connected ? 'success' : 'warn',
      },
      duration: 1000,
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setOnline(true);
      Notifier.showNotification({
        description: 'Conectado a Fastly.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
        },
        duration: 1000,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('disconnect', () => {
      setOnline(false);

      Notifier.showNotification({
        description: 'Desconectado de Fastly, reconectando...',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'warn',
        },
        duration: 1000,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('SET_DEALER_AVAILABLE', appState === 'active');
    setDealerIsOnline(appState === 'active');
  }, [socket, appState]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_QUEUE', (ordersQueue: OrderClass[]) => {
      setOrdersQueue(ordersQueue);
    });

    return () => {
      socket.off('ORDERS_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_PENDING_QUEUE', (ordersPendingQueue: OrderClass[]) => {
      setOrdersPendingQueue(ordersPendingQueue);
    });

    return () => {
      socket.off('ORDERS_PENDING_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      'ORDERS_DELIVERED_QUEUE',
      (ordersDeliveredQueue: OrderClass[]) => {
        setOrdersDeliveredQueue(ordersDeliveredQueue);
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
        setOrdersCancelledQueue(ordersCancelledQueue);
      },
    );

    return () => {
      socket.off('ORDERS_CANCELLED_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_PROBLEM_QUEUE', (ordersProblemQueue: OrderClass[]) => {
      setOrdersProblemQueue(ordersProblemQueue);
    });

    return () => {
      socket.off('ORDERS_PROBLEM_QUEUE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('ORDERS_SENT_QUEUE', (ordersSentQueue: OrderClass[]) => {
      setOrdersSentQueue(ordersSentQueue);
    });

    return () => {
      socket.off('ORDERS_SENT_QUEUE');
    };
  }, [socket]);

  return <Fragment>{children}</Fragment>;
};
