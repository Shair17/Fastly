import {useEffect} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {isTokenExpired} from '@fastly/services/refresh-token';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {isValidToken} from '@fastly/utils/isValidToken';

export const useShowSessionIsExpired = () => {
  const refreshToken = useAuthStore(s => s.refreshToken);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }

    if (!isValidToken(refreshToken)) {
      return;
    }

    // TODO: probar si así está mejor
    if (!isTokenExpired(refreshToken)) {
      return;
    }

    Notifier.showNotification({
      title: 'Sesión Expirada',
      description: 'Tu sesión ha expirado, por favor vuelve a iniciar sesión.',
      Component: NotifierComponents.Alert,
      duration: 3000,
      componentProps: {
        alertType: 'error',
        backgroundColor: 'red',
      },
    });
  }, [refreshToken]);
};
