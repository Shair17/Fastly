import React from 'react';
import {ScrollView} from 'react-native';
import {Div, Radio, Text} from 'react-native-magnus';
import {AddressBottomSheetItem} from '../../../../../components/organisms/AddressBottomSheetItem';
import {ContainerWithCredits} from '../../../../../components/templates/ContainerWithCredits';
import {useUserAddresses} from '../../../../../stores/useUserAddresses';
import {getAddressBottomSheetIconName} from '../../../../../utils/getAddressBottomSheetIconName';
import {Address} from '../../../../../interfaces/appInterfaces';
import {MAX_USER_ADDRESSES} from '../../../../../constants/app.constants';

export const ListAddressScreen = () => {
  const setCurrentAddress = useUserAddresses(u => u.setCurrentAddress);
  const currentAddress = useUserAddresses(u => u.currentAddress);
  const addresses = useUserAddresses(u => u.addresses);
  const deleteAddress = useUserAddresses(u => u.deleteAddress);

  const handleSwitchCurrentAddress = (address: Address) => {
    if (currentAddress.id === address.id) {
      return;
    }

    setCurrentAddress(address);
  };

  return (
    <ContainerWithCredits showCredits={false}>
      <ScrollView>
        <Div p="2xl">
          <Div mb="xl">
            <Text fontWeight="bold" fontSize="6xl" color="text" mb="sm">
              Elige una dirección
            </Text>
            <Text fontSize="lg" color="text" mb="sm">
              Puedes tener hasta 10 direcciones, tienes{' '}
              {MAX_USER_ADDRESSES - addresses.length}{' '}
              {MAX_USER_ADDRESSES - addresses.length === 1
                ? 'espacio restante'
                : 'espacios restantes'}
              .
            </Text>
            {MAX_USER_ADDRESSES - addresses.length < 1 && (
              <Text fontWeight="400" color="red">
                Para eliminar una dirección manten presionada la dirección que
                quieres eliminar.
              </Text>
            )}
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
    </ContainerWithCredits>
  );
};
