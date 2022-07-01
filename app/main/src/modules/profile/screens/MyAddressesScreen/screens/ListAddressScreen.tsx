import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Div, Icon, Radio, Text} from 'react-native-magnus';
import {AddressBottomSheetItem} from '../../../../../components/organisms/AddressBottomSheetItem';
import {ContainerWithCredits} from '../../../../../components/templates/ContainerWithCredits';
import {useUserAddresses} from '../../../../../stores/useUserAddresses';
import {getAddressBottomSheetIconName} from '../../../../../utils/getAddressBottomSheetIconName';
import {Address} from '../../../../../interfaces/appInterfaces';
import {MAX_USER_ADDRESSES} from '../../../../../constants/app.constants';

/*const addresses = [
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '080456de-6432-4cb0-a7fd-a7071665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '0804sadsa56de-6432-4cb0-a7fd-a7071665dasdasa986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '08045dasdas6de-6432-4cb0-a7fd-a7071dsadas665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '0804dsadas56de-6432-4cb0-a7fd-a70716dasdas65a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '080456ddsadsae-6432-4cb0-a7fd-a707dsadas1665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '08045dasdsa6de-6432-4cb0-a7fd-adsadas7071665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '080456dasdsade-6432-4cb0-a7fd-a70dasdas71665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '080456dsadsade-6432-4cb0-a7fd-a70dsadas71665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '08045dasdsa6de-6432-4cb0-a7fd-a7071dsadas665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
  {
    city: 'Chepén, La Libertad, Peru',
    createdAt: '2022-06-30T19:27:52.414Z',
    id: '08045dasdsa6de-6432-4cb0-a7dasdsfd-a7071dsadas665a986',
    instructions: 'A unas casas del colegio divino maestro',
    latitude: -7.23146,
    longitude: -79.4169,
    name: 'Mi primera dirección',
    street: 'San Juan 253',
    tag: 'casa',
    updatedAt: '2022-06-30T19:27:52.000Z',
    zip: '13871',
  },
];*/

export const ListAddressScreen = () => {
  const setCurrentAddress = useUserAddresses(u => u.setCurrentAddress);
  const currentAddress = useUserAddresses(u => u.currentAddress);
  const addresses = useUserAddresses(u => u.addresses);
  const deleteAddress = useUserAddresses(u => u.deleteAddress);

  const handleSwitchCurrentAddress = (address: Address) => {
    if (currentAddress.id === address.id) return;

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
