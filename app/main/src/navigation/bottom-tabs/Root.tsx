import React, {Fragment, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNetInfo} from '@react-native-community/netinfo';
import {SwipeablePanel} from 'rn-swipeable-panel';
import useAxios from 'axios-hooks';
import {AddressesBottomSheet} from '@fastly/components/organisms/AddressesBottomSheet';
import {ErrorController} from '@fastly/modules/error/ErrorController';
import {useAddressesBottomSheetStore} from '@fastly/stores/useAddressesBottomSheetStore';
import {useUserAddresses} from '@fastly/stores/useUserAddresses';
import {useUserStore} from '@fastly/stores/useUserStore';
import {useMinigameStore} from '@fastly/stores/useMinigameStore';
import {MyProfileResponse} from '@fastly/interfaces/app';
import {RootStackParams} from '../Root';
import {LoadingScreen} from '../screens/LoadingScreen';
import {bottomTabs} from './bottom-tabs';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'Application'> {}

export type ApplicationParams = {
  HomeStack: undefined;
  SearchStack: undefined;
  CartStack: undefined;
  FavoritesStack: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<ApplicationParams>();

export const Application: React.FC<Props> = () => {
  StatusBar.setTranslucent(false);

  const [{loading, error}, executeUserPopulate] = useAxios<MyProfileResponse>(
    '/users/me',
    {
      manual: true,
    },
  );
  const addressesBottomSheetActive = useAddressesBottomSheetStore(
    a => a.isActive,
  );
  const setAddressesBottomSheetActive = useAddressesBottomSheetStore(
    a => a.setIsActive,
  );
  const setUser = useUserStore(u => u.setUser);
  const setAddresses = useUserAddresses(u => u.setAddresses);
  const keepMinigame = useMinigameStore(m => m.keep);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    executeUserPopulate()
      .then(response => {
        const {
          addresses,
          cart,
          favorites,
          refreshToken,
          facebookAccessToken,
          ...user
        } = response.data;

        setUser(user);
        setAddresses(addresses);
      })
      .catch(console.log);
  }, []);

  if (loading || isConnected === null) {
    return <LoadingScreen />;
  }

  // !isSocketOnline
  if (!isConnected || error || keepMinigame) {
    return <ErrorController />;
  }

  return (
    <Fragment>
      <Tab.Navigator
        initialRouteName="HomeStack"
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 4,
          },
        }}>
        {bottomTabs.map(({TabComponent, TabIcon, TabName}, key) => (
          <Tab.Screen
            key={key.toString()}
            name={TabName}
            component={TabComponent}
            options={{
              tabBarIcon: props => <TabIcon {...props} />,
              tabBarBadge: TabName === 'CartStack' ? 9 : undefined,
            }}
          />
        ))}
      </Tab.Navigator>
      <SwipeablePanel
        isActive={addressesBottomSheetActive}
        fullWidth
        closeOnTouchOutside
        onlyLarge
        openLarge
        showCloseButton
        onClose={() => setAddressesBottomSheetActive(false)}>
        <AddressesBottomSheet />
      </SwipeablePanel>
    </Fragment>
  );
};
