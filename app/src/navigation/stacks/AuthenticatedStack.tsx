import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Div, Text, useTheme} from 'react-native-magnus';
import {ThemeSwitcher} from '../../components/atoms/ThemeSwitcher';
import {usePermissionsStore} from '../../stores/usePermissionsStore';
import {LoadingTemplate} from '../../components/templates/LoadingTemplate';
import {GeolocationPermissionsScreen} from '../../modules/geolocation-permissions/GeolocationPermissionsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  StatusBar.setTranslucent(false);

  return (
    <Div bg="body">
      <ThemeSwitcher />
      <Text color="text">
        Autenticado y con permisos de geolocalización activados! :D
      </Text>
    </Div>
  );
};

export const AuthenticatedStack = () => {
  const {theme} = useTheme();
  const locationStatus = usePermissionsStore(s => s.locationStatus);

  console.log(theme.colors?.body);

  if (locationStatus === 'unavailable') {
    return <LoadingTemplate />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
      }}>
      {locationStatus === 'granted' ? (
        <Stack.Screen name="App" component={App} />
      ) : (
        <Stack.Screen
          name="GeolocationPermissions"
          component={GeolocationPermissionsScreen}
        />
      )}
    </Stack.Navigator>
  );
};
