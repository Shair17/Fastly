import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackProps as DrawerHomeStackProps} from '@fastly/navigation/stacks/home';
import {useSocketHasActiveOrders} from '@fastly/hooks/useSocketHasActiveOrders';
import {HomeScreen} from './screens/HomeScreen';
import {OrderDetailScreen} from './screens/OrderDetailScreen';
import {CurrentOrder} from './screens/CurrentOrder';
import {OrderClass} from '@fastly/interfaces/app';

export type HomeStackParams = {
  HomeScreen: undefined;
  OrderDetailScreen: OrderClass;
  CurrentOrderScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParams>();

export const HomeController: FC<DrawerHomeStackProps> = ({navigation}) => {
  const hasActiveOrders = useSocketHasActiveOrders();

  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}
      initialRouteName={hasActiveOrders ? 'CurrentOrderScreen' : 'HomeScreen'}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <HomeStack.Screen name="CurrentOrderScreen" component={CurrentOrder} />
    </HomeStack.Navigator>
  );
};
