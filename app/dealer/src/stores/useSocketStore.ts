import create from 'zustand';
import {combine} from 'zustand/middleware';
import {SOCKET_URL} from '@fastly/constants/socket';
import io, {Socket} from 'socket.io-client';

type SocketStoreValues = {
  socket: Socket | null;
  online: boolean;
  dealerIsOnline: boolean;
};

const getDefaultValues = (): SocketStoreValues => {
  return {
    socket: null,
    online: false,
    dealerIsOnline: false,
  };
};

export const useSocketStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setSocket: (token: string) => {
      if (!token) {
        get().socket?.disconnect();

        set({
          socket: null,
        });

        return;
      }

      set({
        socket: io(SOCKET_URL, {
          transports: ['websocket'],
          autoConnect: true,
          forceNew: true,
          auth: {
            token,
          },
        }),
      });
    },
    setOnline: (online: boolean) => set({online}),
    setDealerIsOnline: (dealerIsOnline: boolean) => set({dealerIsOnline}),
  })),
);
