import {useEffect} from 'react';
import {showNotification} from '@mantine/notifications';
import {isTokenExpired} from '@fastly/services/refresh-token.service';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {isValidToken} from '@fastly/utils/isValidToken';

export const useShowSessionIsExpired = () => {
  const refreshToken = useAuthStore(s => s.refreshToken);

  useEffect(() => {
    if (!refreshToken) return;

    if (!isValidToken(refreshToken)) return;

    if (isTokenExpired(refreshToken)) {
      showNotification({
        title: 'Sesión Expirada',
        message: 'Tu sesión ha expirado, por favor vuelve a iniciar sesión.',
        color: 'red',
      });
    }
  }, [refreshToken]);
};
