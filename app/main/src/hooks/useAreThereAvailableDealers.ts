import {useEffect, useState} from 'react';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export const useAreThereAvailableDealers = (): boolean => {
  const [areThereAvailableDealers, setAreThereAvailableDealers] =
    useState<boolean>(false);
  const socket = useSocketStore(s => s.socket);

  useEffect(() => {
    if (!socket) return;

    socket.on('ARE_THERE_AVAILABLE_DEALERS', (availableDealers: boolean) => {
      setAreThereAvailableDealers(availableDealers);
    });

    return () => {
      socket.off('ARE_THERE_AVAILABLE_DEALERS');
    };
  }, [socket]);

  return areThereAvailableDealers;
};
