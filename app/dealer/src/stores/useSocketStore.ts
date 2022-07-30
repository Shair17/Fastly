import create from 'zustand';
import {combine} from 'zustand/middleware';
import {SOCKET_URL} from '@fastly/constants/socket';
import io from 'socket.io-client';

const getDefaultValues = () => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });

  return {
    socket,
    online: false,
    dealerIsOnline: false,
  };
};

export const useSocketStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setOnline: (online: boolean) => set({online}),
    setDealerIsOnline: (dealerIsOnline: boolean) => set({dealerIsOnline}),
  })),
);
