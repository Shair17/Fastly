import create from 'zustand';
import {combine} from 'zustand/middleware';
import {SOCKET_URL} from '@fastly/constants/socket';
import io from 'socket.io-client';
import {useAuthStore} from './useAuthStore';

const getDefaultValues = () => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
    query: {
      authorization: `Bearer ${useAuthStore.getState().accessToken}`,
    },
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
