import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-magnus';
import {usePermissionsStore} from '../../stores/usePermissionsStore';
import {LoadingTemplate} from '../../components/templates/LoadingTemplate';
import {GeolocationPermissionsScreen} from '../../modules/geolocation-permissions/GeolocationPermissionsScreen';
import {useTimeout} from '../../hooks/useTimeout';

const Stack = createNativeStackNavigator();

export const AuthenticatedStack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {theme} = useTheme();
  const locationStatus = usePermissionsStore(s => s.locationStatus);

  const hide = () => setIsLoading(false);

  useTimeout(hide, 1e3);

  // remove `isLoading` later and replace with `locationStatus === 'unavailable'`
  if (isLoading) {
    return <LoadingTemplate />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
      }}>
      <Stack.Screen
        name="GeolocationPermissions"
        component={GeolocationPermissionsScreen}
      />
    </Stack.Navigator>
  );
};
