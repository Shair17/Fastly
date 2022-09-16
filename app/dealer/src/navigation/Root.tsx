import React from 'react';
import {useTheme} from 'react-native-magnus';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useShowSessionIsExpired} from '@fastly/hooks/useShowSessionIsExpired';
import {isLoggedIn} from '@fastly/services/refresh-token';
import {usePermissionsStore} from '@fastly/stores/usePermissionsStore';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {BasicHeaderScreen} from '@fastly/components/molecules/BasicHeaderScreen';
import {
  WelcomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  LoadingScreen,
  GeolocationPermissionsScreen,
  InactiveAccountScreen,
} from './screens';
import {Application} from './drawer/Root';
import {useIsAuthenticated} from '@fastly/hooks/useIsAuthenticated';

export type RootStackParams = {
  WelcomeScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  InactiveAccountScreen: undefined;
  ForgotPasswordScreen:
    | {
        email?: string;
      }
    | undefined;

  LoadingScreen: undefined;
  GeolocationPermissionsScreen: undefined;

  Application: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParams>();

export const Root: React.FC = () => {
  useShowSessionIsExpired();

  const {theme} = useTheme();
  // const isAuthenticated = isLoggedIn();
  const isActive = useAuthStore(z => z.isActive);
  const locationStatus = usePermissionsStore(z => z.locationStatus);
  // TODO: parece que el hook que acabo de hacer es mejor que el otro
  // lo bueno de este hook es que está suscrito a los cambios del refresh token :)
  const isAuthenticated = useIsAuthenticated();

  return (
    <RootStack.Navigator>
      {isAuthenticated ? (
        <RootStack.Group
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
          }}>
          {locationStatus === 'unavailable' ? (
            <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
          ) : locationStatus === 'granted' ? (
            !isActive ? (
              <RootStack.Screen
                options={{
                  animation: 'slide_from_right',
                  headerShown: true,
                  header: () => <BasicHeaderScreen />,
                  contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
                }}
                name="InactiveAccountScreen"
                component={InactiveAccountScreen}
              />
            ) : (
              <RootStack.Screen name="Application" component={Application} />
            )
          ) : (
            <RootStack.Screen
              name="GeolocationPermissionsScreen"
              component={GeolocationPermissionsScreen}
              options={{
                headerShown: true,
                header: () => <BasicHeaderScreen />,
              }}
            />
          )}
        </RootStack.Group>
      ) : (
        <RootStack.Group
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
          }}>
          <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <RootStack.Screen name="SignInScreen" component={SignInScreen} />
          <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
          <RootStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
