import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Div, Text, Icon} from 'react-native-magnus';
import {HeaderScreen} from '../../../../components/organisms/HeaderScreen';
import {ProfileStackParams} from '../../ProfileStackParams.type';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContainerWithKeyboardAvoidingView} from '../../../../components/templates/ContainerWithKeyboardAvoidingView';
import {OngoingOrdersScreen} from './screens/OngoingOrdersScreen';
import {OrdersHistoryScreen} from './screens/OrdersHistoryScreen';
import {PulseIndicator} from '../../../../components/atoms/PulseIndicator';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'MyAddresses'> {}

const Tab = createMaterialTopTabNavigator();

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
