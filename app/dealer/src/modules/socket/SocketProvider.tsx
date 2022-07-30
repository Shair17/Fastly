import React, {Fragment, useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {isLoggedIn} from '@fastly/services/refresh-token';
import {Notifier, NotifierComponents} from 'react-native-notifier';

export const SocketProvider: React.FC = ({children}) => {
  const dealerId = useDealerStore(s => s.id);
  const socket = useSocketStore(s => s.socket);
  const setOnline = useSocketStore(s => s.setOnline);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);
  const isAuthenticated = isLoggedIn();

  useEffect(() => {
    setOnline(socket.connected);

    if (isAuthenticated) {
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
    }
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);

      if (isAuthenticated) {
        Notifier.showNotification({
          description: 'Conectado a Fastly.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success',
          },
          duration: 1000,
        });
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);

      if (isAuthenticated) {
        Notifier.showNotification({
          description: 'Desconectado de Fastly, reconectando...',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
          duration: 1000,
        });
      }
    });
  }, [socket]);

  useEffect(() => {
    if (!isAuthenticated || !dealerId) {
      return;
    }

    // Validar si el dealer está disponible acá
  }, [socket, isAuthenticated, dealerId]);

  return <Fragment>{children}</Fragment>;
};
