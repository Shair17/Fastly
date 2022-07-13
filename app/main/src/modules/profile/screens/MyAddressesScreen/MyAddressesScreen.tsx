import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Text, Div, Badge} from 'react-native-magnus';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ContainerWithKeyboardAvoidingView} from '@fastly/components/templates/ContainerWithKeyboardAvoidingView';
import {HeaderScreen} from '@fastly/components/organisms/HeaderScreen';
import {useUserAddresses} from '@fastly/stores/useUserAddresses';
import {AddAddressScreen} from './screens/AddAddressScreen';
import {ListAddressScreen} from './screens/ListAddressScreen';
import {ProfileStackParams} from '../../ProfileStackParams.type';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'MyAddresses'> {}

const Tab = createMaterialTopTabNavigator();

export const MyAddressesScreen: React.FC<Props> = ({navigation}) => {
  const {length: addressesLength} = useUserAddresses(u => u.addresses);

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
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 4,
          },
        }}>
        <Tab.Screen
          name="AddAddressScreen"
          component={AddAddressScreen}
          options={{
            title: 'Agregar',
            tabBarLabelStyle: {fontWeight: '500'},
            // tabBarLabelStyle: {textTransform: 'capitalize'},
          }}
        />
        <Tab.Screen
          name="ListAddressScreen"
          component={ListAddressScreen}
          options={{
            title: 'Mis Direcciones',
            tabBarLabelStyle: {fontWeight: '500'},
            tabBarBadge: () => (
              <Div top={5} right={25}>
                <Div
                  bg="primary"
                  rounded="circle"
                  w={18}
                  h={18}
                  justifyContent="center"
                  alignItems="center">
                  <Text color="white" fontWeight="500" fontSize="xs">
                    {addressesLength}
                  </Text>
                </Div>
              </Div>
            ),
            // tabBarLabelStyle: {textTransform: 'capitalize'},
          }}
        />
      </Tab.Navigator>
    </ContainerWithKeyboardAvoidingView>
  );
};
