import React, {FC, Fragment, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParams} from './RootNavigation.type';
import {LoadingScreen} from './screens/LoadingScreen';
import {bottomTabs} from './bottomTabs';
import {ErrorScreen} from '../modules/error/ErrorScreen';
import {useUserAddresses} from '../stores/useUserAddresses';
import {useUserStore} from '../stores/useUserStore';
import {MyProfileResponse} from '../interfaces/appInterfaces';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {AddressesBottomSheet} from '../components/organisms/AddressesBottomSheet';
import {useAddressesBottomSheetStore} from '../stores/useAddressesBottomSheetStore';
import useAxios from 'axios-hooks';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'ApplicationBottomTab'> {}

export type ApplicationBottomTabParams = {
  HomeStack: undefined;
  SearchStack: undefined;
  CartScreen: undefined;
  FavoritesScreen: undefined;
  ProfileStack: {
    comesFrom: string;
  };
};

const Tab = createBottomTabNavigator<ApplicationBottomTabParams>();

export const ApplicationBottomTab: FC<Props> = () => {
  StatusBar.setTranslucent(false);

  const [{loading, error}, executeUserPopulate, cancelUserPopulateRequest] =
    useAxios<MyProfileResponse>('/users/me', {
      manual: true,
    });
  const addressesBottomSheetActive = useAddressesBottomSheetStore(
    a => a.isActive,
  );
  const setAddressesBottomSheetActive = useAddressesBottomSheetStore(
    a => a.setIsActive,
  );
  const setUser = useUserStore(u => u.setUser);
  const setAddresses = useUserAddresses(u => u.setAddresses);

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

    // return cancelUserPopulateRequest;
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return <ErrorScreen />;
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
              // show badge with `9` if it's `CartScreen`
              tabBarBadge: TabName === 'CartScreen' ? 9 : undefined,
            }}
          />
        ))}
      </Tab.Navigator>
      <SwipeablePanel
        isActive={addressesBottomSheetActive}
        fullWidth
        onlyLarge
        openLarge
        showCloseButton
        onClose={() => setAddressesBottomSheetActive(false)}>
        <AddressesBottomSheet />
      </SwipeablePanel>
    </Fragment>
  );
};
