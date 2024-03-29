import {useEffect, useState} from 'react';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {isValidToken} from '@fastly/utils/isValidToken';
import {isTokenExpired} from '@fastly/services/refresh-token';

export const useIsAuthenticated = (): boolean => {
  const accessToken = useAuthStore(r => r.accessToken);
  const refreshToken = useAuthStore(r => r.refreshToken);
  const removeTokens = useAuthStore(r => r.removeTokens);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!accessToken && !!refreshToken,
  );

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      setIsAuthenticated(false);
      return;
    }

    if (!isValidToken(accessToken) && !isValidToken(refreshToken)) {
      setIsAuthenticated(false);
      return;
    }

    if (isTokenExpired(refreshToken)) {
      removeTokens();
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(!!accessToken && !!refreshToken);
  }, [accessToken, refreshToken, removeTokens]);

  return isAuthenticated;
};
