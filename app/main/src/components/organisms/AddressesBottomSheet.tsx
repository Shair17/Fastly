import React, {FC, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Div, Text, Radio, Icon} from 'react-native-magnus';
import {useNavigation} from '@react-navigation/native';
import {useUserAddresses} from '../../stores/useUserAddresses';
import {useAddressesBottomSheetStore} from '../../stores/useAddressesBottomSheetStore';
import {AddressBottomSheetItem} from './AddressBottomSheetItem';
import {getAddressBottomSheetIconName} from '../../utils/getAddressBottomSheetIconName';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ApplicationBottomTabParams} from '../../navigation/ApplicationBottomTab';
import {Address} from '../../interfaces/appInterfaces';

interface Props {}

type NavigationProps = NativeStackNavigationProp<
  ApplicationBottomTabParams,
  'ProfileStack'
>;

export const AddressesBottomSheet: FC<Props> = () => {
  const setCurrentAddress = useUserAddresses(u => u.setCurrentAddress);
  const currentAddress = useUserAddresses(u => u.currentAddress);
  const addresses = useUserAddresses(u => u.addresses);
  const deleteAddress = useUserAddresses(u => u.deleteAddress);
  const navigation = useNavigation<NavigationProps>();
  const setAddressesBottomSheetActive = useAddressesBottomSheetStore(
    u => u.setIsActive,
  );

  const handleSwitchCurrentAddress = (address: Address) => {
    if (currentAddress.id === address.id) {
      return;
    }

    setCurrentAddress(address);
  };

  const goToMyAddresses = () => {
    setAddressesBottomSheetActive(false);
    navigation.navigate('ProfileStack', {
      // @ts-ignore
      screen: 'MyAddresses',
    });
  };

  return (
    <Div flex={1} bg="body">
      <ScrollView>
        <Div p="2xl">
          <Text fontWeight="bold" fontSize="6xl" color="text" mb="xl">
            Agrega o elige una dirección
          </Text>

          <Div mb="lg">
            <TouchableOpacity activeOpacity={0.7} onPress={goToMyAddresses}>
              <Div
                bg="transparent"
                borderWidth={0.8}
                borderStyle="dashed"
                borderColor="primary"
                rounded="xl"
                p="lg"
                alignItems="center"
                justifyContent="center"
                row>
                <Icon
                  fontSize="2xl"
                  fontFamily="Ionicons"
                  name="add"
                  color="primary"
                  mr="xs"
                />
                <Text fontSize="lg" color="primary">
                  Agregar una nueva dirección
                </Text>
              </Div>
            </TouchableOpacity>
          </Div>

          <Radio.Group>
            {addresses.map(address => {
              const isCurrent = currentAddress.id === address.id;
              return (
                <Div mb="lg" key={address.id}>
                  <AddressBottomSheetItem
                    bg={isCurrent ? 'red50' : 'transparent'}
                    borderColor={isCurrent ? 'primary' : 'gray200'}
                    iconName={getAddressBottomSheetIconName(address.tag)}
                    color={isCurrent ? 'primary' : 'gray'}
                    address={address}
                    onPress={() => handleSwitchCurrentAddress(address)}
                    onLongPress={() => deleteAddress(address.id)}
                  />
                </Div>
              );
            })}
          </Radio.Group>
        </Div>
      </ScrollView>
    </Div>
  );
};
