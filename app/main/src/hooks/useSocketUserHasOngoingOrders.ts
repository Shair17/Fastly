import {useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export const useSocketUserHasOngoingOrders = () => {
  const socket = useSocketStore(s => s.socket);
  const userHasOngoingOrders = useSocketStore(s => s.userHasOngoingOrders);
  const setUserHasOngoingOrders = useSocketStore(
    s => s.setUserHasOngoingOrders,
  );

  useEffect(() => {
    socket?.on('USER_HAS_ONGOING_ORDERS', (userHasOngoingOrders: boolean) => {
      setUserHasOngoingOrders(userHasOngoingOrders);
    });

    return () => {
      socket?.off('USER_HAS_ONGOING_ORDERS');
    };
  }, [socket]);

  return userHasOngoingOrders;
};
