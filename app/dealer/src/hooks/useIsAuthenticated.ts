import {useEffect, useState} from 'react';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {isValidToken} from '@fastly/utils/isValidToken';
import {isTokenExpired, clearAuthTokens} from '@fastly/services/refresh-token';

export const useIsAuthenticated = (): boolean => {
  const refreshToken = useAuthStore(r => r.refreshToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!refreshToken,
  );

  useEffect(() => {
    if (!refreshToken) {
      setIsAuthenticated(false);
      return;
    }

    if (!isValidToken(refreshToken)) {
      setIsAuthenticated(false);
      return;
    }

    if (isTokenExpired(refreshToken)) {
      clearAuthTokens();
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(!!refreshToken);
  }, [refreshToken]);

  return isAuthenticated;
};
