import {useState, useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export const useSocketHasActiveOrders = () => {
  const [hasActiveOrders, setHasActiveOrders] = useState<boolean>(false);
  const socket = useSocketStore(s => s.socket);

  useEffect(() => {
    socket?.on('DEALER_HAS_ACTIVE_ORDERS', (dealerHasActiveOrders: boolean) => {
      setHasActiveOrders(dealerHasActiveOrders);
    });

    return () => {
      socket?.off('DEALER_HAS_ACTIVE_ORDERS');
    };
  }, [socket]);

  return hasActiveOrders;
};
