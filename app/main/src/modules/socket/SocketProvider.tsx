import React, {Fragment, useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useUserStore} from '@fastly/stores/useUserStore';

export const SocketProvider: React.FC = ({children}) => {
  const userId = useUserStore(u => u.id);
  const socket = useSocketStore(s => s.socket);
  const setOnline = useSocketStore(s => s.setOnline);
  const userHasOngoingOrders = useSocketStore(s => s.userHasOngoingOrders);
  const setUserHasOngoingOrders = useSocketStore(
    s => s.setUserHasOngoingOrders,
  );

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

  return <Fragment>{children}</Fragment>;
};
