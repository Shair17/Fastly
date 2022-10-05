import {FC, PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {useIsAuthenticated} from '@fastly/hooks/useIsAuthenticated';

export const AuthRedirect: FC<PropsWithChildren<{}>> = ({children}) => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
