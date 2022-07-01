import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProfileStackParams} from '../../ProfileStackParams.type';
import {AddAddressScreen} from './screens/AddAddressScreen';
import {ListAddressScreen} from './screens/ListAddressScreen';
import {HeaderScreen} from '../../../../components/organisms/HeaderScreen';
import {TouchableOpacity} from 'react-native';
import {Div, Icon, Text} from 'react-native-magnus';
import {ContainerWithKeyboardAvoidingView} from '../../../../components/templates/ContainerWithKeyboardAvoidingView';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'MyAddresses'> {}

const Tab = createMaterialTopTabNavigator();

export const MyAddressesScreen: FC<Props> = ({navigation}) => {
  const goBack = () => {
    // navigation.replace('Profile');
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
            Direcciones
          </Text>
        }
      />
      {/* <Div p="2xl"></Div> */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 4,
          },
        }}>
        <Tab.Screen
          name="AddAddress"
          component={AddAddressScreen}
          options={{
            title: 'Agregar',
            // tabBarLabelStyle: {textTransform: 'capitalize'},
            tabBarLabelStyle: {fontWeight: '500'},
          }}
        />
        <Tab.Screen
          name="ListAddress"
          component={ListAddressScreen}
          options={{
            title: 'Mis Direcciones',
            tabBarLabelStyle: {fontWeight: '500'},
            // tabBarLabelStyle: {textTransform: 'capitalize'},
          }}
        />
      </Tab.Navigator>
    </ContainerWithKeyboardAvoidingView>
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="AddAddress" component={AddAddressScreen} />
      <Tab.Screen name="ListAddress" component={ListAddressScreen} />
    </Tab.Navigator>
  );
};
