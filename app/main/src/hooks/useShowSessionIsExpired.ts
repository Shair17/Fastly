import {useEffect} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {isTokenExpired} from '../services/refresh-token.service';
import {useAuthStore} from '../stores/useAuthStore';
import {isValidToken} from '../utils/isValidToken';

export const useShowSessionIsExpired = () => {
  const refreshToken = useAuthStore(s => s.refreshToken);

  useEffect(() => {
    if (!refreshToken) return;

    if (!isValidToken(refreshToken)) return;

    if (isTokenExpired(refreshToken)) {
      Notifier.showNotification({
        title: 'Sesión Expirada',
        description:
          'Tu sesión ha expirado, por favor vuelve a iniciar sesión.',
        Component: NotifierComponents.Alert,
        duration: 3000,
        componentProps: {
          alertType: 'error',
          backgroundColor: 'red',
        },
      });
    }
  }, [refreshToken]);
};
