import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Div, Text, Icon} from 'react-native-magnus';
import {HeaderScreen} from '../../../../components/organisms/HeaderScreen';
import {ProfileStackParams} from '../../ProfileStackParams.type';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContainerWithKeyboardAvoidingView} from '../../../../components/templates/ContainerWithKeyboardAvoidingView';
import {OngoingOrdersScreen} from './screens/OngoingOrdersScreen';
import {CompletedOrdersScreen} from './screens/CompletedOrdersScreen';
import {CanceledOrdersScreen} from './screens/CanceledOrdersScreen';
import {PulseIndicator} from '../../../../components/atoms/PulseIndicator';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'MyAddresses'> {}

const Tab = createMaterialTopTabNavigator();

/*
import io from 'socket.io-client';
import {AirbnbRating} from 'react-native-ratings';
import { ContainerWithKeyboardAvoidingView } from '../../../../components/templates/ContainerWithKeyboardAvoidingView';

const socket = io('http://192.168.1.46:3000', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('connected --------------- socket ---------------');
});

socket.on('connect_error', err => {
  console.log(err.message);
});

const ratingCompleted = (rating: number) => {
  console.log('Rating is: ' + rating);
};

<AirbnbRating
  reviews={['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente']}
  onFinishRating={ratingCompleted}
/>
*/

export const MyOrdersScreen: FC<Props> = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ContainerWithKeyboardAvoidingView flexFull>
      <HeaderScreen
        left={
          <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
            <Icon
              fontFamily="Ionicons"
              name="arrow-back"
              fontSize="xl"
              color="text"
            />
          </TouchableOpacity>
        }
        middle={
          <Text fontWeight="bold" fontSize="xl">
            Pedidos
          </Text>
        }
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 4,
          },
        }}>
        <Tab.Screen
          name="OngoingOrdersScreen"
          component={OngoingOrdersScreen}
          options={{
            title: 'En Camino',
            // tabBarLabelStyle: {textTransform: 'capitalize'},
            tabBarLabelStyle: {fontWeight: '500'},
            tabBarBadge: () => (
              <Div top={15} right={8}>
                <PulseIndicator size={20} />
              </Div>
            ),
          }}
        />
        <Tab.Screen
          name="CompletedOrdersScreen"
          component={CompletedOrdersScreen}
          options={{
            title: 'Completados',
            tabBarLabelStyle: {fontWeight: '500'},
            // tabBarLabelStyle: {textTransform: 'capitalize'},
          }}
        />
        <Tab.Screen
          name="CanceledOrdersScreen"
          component={CanceledOrdersScreen}
          options={{
            title: 'Cancelados',
            tabBarLabelStyle: {fontWeight: '500'},
            // tabBarLabelStyle: {textTransform: 'capitalize'},
          }}
        />
      </Tab.Navigator>
    </ContainerWithKeyboardAvoidingView>
  );
};
