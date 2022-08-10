import React, {Fragment, useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useUserStore} from '@fastly/stores/useUserStore';
import {isLoggedIn} from '@fastly/services/refresh-token';

export const SocketProvider: React.FC = ({children}) => {
  const userId = useUserStore(u => u.id);
  const socket = useSocketStore(s => s.socket);
  const setOnline = useSocketStore(s => s.setOnline);
  const setUserHasOngoingOrders = useSocketStore(
    s => s.setUserHasOngoingOrders,
  );
  const isAuthenticated = isLoggedIn();

  useEffect(() => {
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
    if (!isAuthenticated || !userId) {
      return;
    }

    // funcionará bien esto?
    // si no, separar el .emit del .on por socket.emit y socket.on respectivamente
    socket.emit('SEND_USER_ID', userId);
    socket.on('USER_HAS_ONGOING_ORDERS', (userHasOngoingOrders: boolean) => {
      // solo modificar el estado en caso sea boleano
      if (typeof userHasOngoingOrders === 'boolean')
        setUserHasOngoingOrders(userHasOngoingOrders);
    });

    return () => {
      socket.off('userHasOngoingOrders');
    };
  }, [socket, isAuthenticated, userId]);

  return <Fragment>{children}</Fragment>;
};
