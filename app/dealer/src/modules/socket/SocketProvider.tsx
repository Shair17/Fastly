import React, {Fragment, useEffect} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useAppState} from '@fastly/hooks/useAppState';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {useAuthStore} from '@fastly/stores/useAuthStore';

export const SocketProvider: React.FC = ({children}) => {
  const socket = useSocketStore(s => s.socket);
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

  return <Fragment>{children}</Fragment>;
};
