import React, {Fragment, useEffect} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import useAxios from 'axios-hooks';
import {useIsAuthenticated} from '@fastly/hooks/useIsAuthenticated';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {useAuthStore} from '@fastly/stores/useAuthStore';

export const SocketProvider: React.FC = ({children}) => {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAuthStore(t => t.accessToken);
  const [_, executeGetUserHasOngoingOrders] = useAxios<boolean, any, any>(
    '/users/me/has-ongoing-orders',
    {manual: true},
  );
  const socket = useSocketStore(s => s.socket);
  const setSocket = useSocketStore(s => s.setSocket);
  const setOnline = useSocketStore(s => s.setOnline);
  const setUserHasOngoingOrders = useSocketStore(
    s => s.setUserHasOngoingOrders,
  );

  useEffect(() => {
    setSocket(accessToken);
  }, [accessToken]);

  // Aquí si es importante agregar ´isAuthenticated´ como dependencia
  // ya que, SocketProvider está como componente Padre de la app
  // entonces, necesito que se haga esta solicitud siempre y cuando
  // el usuario esté autenticado, y si cierra sesión y vuelve a iniciar sesión
  // se ejecutará nuevamente para obtener su valor inicial
  useEffect(() => {
    if (!isAuthenticated) return;

    executeGetUserHasOngoingOrders()
      .then(response => {
        setUserHasOngoingOrders(response.data);
      })
      .catch(console.log);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;

    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true);
      Notifier.showNotification({
        description: 'Conectado a Fastly',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
        },
        duration: 1000,
      });
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => {
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
    socket?.on('USER_HAS_ONGOING_ORDERS', (userHasOngoingOrders: boolean) => {
      setUserHasOngoingOrders(userHasOngoingOrders);
    });

    return () => {
      socket?.off('USER_HAS_ONGOING_ORDERS');
    };
  }, [socket]);

  return <Fragment>{children}</Fragment>;
};
