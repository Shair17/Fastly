import React, {Fragment, useEffect} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export const SocketProvider: React.FC = ({children}) => {
  const socket = useSocketStore(s => s.socket);
  const setOnline = useSocketStore(s => s.setOnline);
  const online = useSocketStore(s => s.online);

  console.log('Socket Online:', online);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return <Fragment>{children}</Fragment>;
};
