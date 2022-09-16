import {useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {useAppState} from './useAppState';

export const useSocketSetDealerAvailable = () => {
  const socket = useSocketStore(s => s.socket);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);
  const appState = useAppState();

  useEffect(() => {
    if (!socket) return;

    socket.emit(
      'SET_DEALER_AVAILABLE',
      appState === 'active' || appState === 'background',
    );
    setDealerIsOnline(appState === 'active' || appState === 'background');
  }, [socket, appState]);
};
