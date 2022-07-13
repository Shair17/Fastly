import React, {useEffect} from 'react';

export const SocketProvider: React.FC = ({children}) => {
  useEffect(() => {
    console.log('socket provider');
  }, []);

  return <>{children}</>;
};
