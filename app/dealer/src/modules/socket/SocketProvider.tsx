import React, {Fragment, useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {isLoggedIn} from '@fastly/services/refresh-token';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useAppState} from '@fastly/hooks/useAppState';
import {useAuthStore} from '@fastly/stores/useAuthStore';

export const SocketProvider: React.FC = ({children}) => {
  const dealerId = useDealerStore(s => s.id);
  const socket = useSocketStore(s => s.socket);
  const setOnline = useSocketStore(s => s.setOnline);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);
  const isAuthenticated = isLoggedIn();
  const isActive = useAuthStore(z => z.isActive);
  const appState = useAppState();

  useEffect(() => {
    setOnline(socket.connected);

    if (isAuthenticated && isActive) {
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

      if (isAuthenticated && isActive) {
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

      if (isAuthenticated && isActive) {
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

  // Emitir el dealerId
  useEffect(() => {
    if (!isAuthenticated || !dealerId) {
      return;
    }

    socket.emit('SEND_DEALER_ID', dealerId);
  }, [socket, isAuthenticated, dealerId]);

  // Emitir dealer available
  useEffect(() => {
    if (!isAuthenticated || !isActive) {
      return;
    }

    socket.emit('SET_DEALER_AVAILABLE', appState === 'active');
    setDealerIsOnline(appState === 'active');
  }, [socket, isAuthenticated, appState]);

  return <Fragment>{children}</Fragment>;
};
