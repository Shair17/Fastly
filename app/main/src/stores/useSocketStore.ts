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
    userHasOngoingOrders: false,
  };
};

export const useSocketStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setOnline: (online: boolean) => set({online}),
    setUserHasOngoingOrders: (userHasOngoingOrders: boolean) =>
      set({userHasOngoingOrders}),
  })),
);
