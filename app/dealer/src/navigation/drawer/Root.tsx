import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useAxios from 'axios-hooks';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {MyProfileResponse} from '@fastly/interfaces/app';
import {RootStackParams} from '../Root';
import {LoadingScreen} from '../screens/LoadingScreen';
import {ErrorController} from '@fastly/modules/error/ErrorController';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {CustomDrawer} from './CustomDrawer';
import {drawerTabs} from './drawer-tabs';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'Application'> {}

export type ApplicationParams = {
  HomeStack: undefined;
  ReviewsStack: undefined;
  OrderHistoryStack: undefined;
  ProfileStack: undefined;
  SettingsStack: undefined;
};

const Drawer = createDrawerNavigator<ApplicationParams>();

export const Application: React.FC<Props> = () => {
  StatusBar.setTranslucent(false);
  const [{loading, error}, executeDealerPopulate] = useAxios<MyProfileResponse>(
    '/dealers/me',
    {
      manual: true,
    },
  );
  const setDealer = useDealerStore(u => u.setDealer);
  const setIsActive = useAuthStore(s => s.setIsActive);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    executeDealerPopulate()
      .then(response => {
        setIsActive(response.data.isActive);
        setDealer({...response.data});
      })
      .catch(error => {
        if (error?.response?.data.message) {
          Notifier.showNotification({
            title: 'Error',
            description: 'Error inesperado',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
          });

          setIsActive(false);
        }
      });
  }, []);

  if (loading || isConnected === null) {
    return <LoadingScreen />;
  }

  // !isSocketOnline
  if (!isConnected || error) {
    return <ErrorController />;
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        drawerLabelStyle: {
          marginLeft: -15,
        },
      }}>
      {drawerTabs.map(
        ({DrawerComponent, DrawerIcon, DrawerName, title}, key) => (
          <Drawer.Screen
            key={key.toString()}
            name={DrawerName}
            component={DrawerComponent}
            options={{
              title,
              drawerIcon: props => <DrawerIcon {...props} />,
            }}
          />
        ),
      )}
    </Drawer.Navigator>
  );
};
