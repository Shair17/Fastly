import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ContainerWithKeyboardAvoidingView} from '@fastly/components/templates/ContainerWithKeyboardAvoidingView';
import {HeaderScreen} from '@fastly/components/organisms/HeaderScreen';
import {PulseIndicator} from '@fastly/components/atoms/PulseIndicator';
import {OngoingOrdersScreen} from './screens/OngoingOrdersScreen';
import {OrdersHistoryScreen} from './screens/OrdersHistoryScreen';
import {ProfileStackParams} from '../../ProfileStackParams.type';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'MyAddresses'> {}

const Tab = createMaterialTopTabNavigator();

export const MyOrdersScreen: React.FC<Props> = ({navigation}) => {
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
            tabBarBadge: () =>
              true ? (
                <Div top={15} right={40}>
                  <PulseIndicator size={20} />
                </Div>
              ) : null,
          }}
        />
        <Tab.Screen
          name="OrdersHistoryScreen"
          component={OrdersHistoryScreen}
          options={{
            title: 'Historial',
            tabBarLabelStyle: {fontWeight: '500'},
            // tabBarLabelStyle: {textTransform: 'capitalize'},
          }}
        />
      </Tab.Navigator>
    </ContainerWithKeyboardAvoidingView>
  );
};
