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

const tmpAddresses = [
  {
    id: '9b263633-7de7-4ce1-a50b-d9ea0c7cc4df',
    city: 'Chepén, La Libertad, Peru',
    name: 'Mi primera dirección',
    street: 'Ricardo Palma 237',
    tag: 'casa',
    current: true,
  },
  {
    id: '9c263633-7de7-4ce1-a50b-d9ea0c7cc4df',
    city: 'Chepén, La Libertad, Peru',
    name: 'Mi segunda dirección',
    street: 'Jr Miraflores 300',
    tag: 'amigo',
    current: false,
  },
  {
    id: '9a263633-7de7-4ce1-a50b-d9ea0c7cc4df',
    city: 'Chepén, La Libertad, Peru',
    name: 'Mi tercera dirección',
    street: 'Calle Rivera 237',
    current: false,
    tag: 'universidad',
  },
  {
    id: '9d263633-7de7-4ce1-a50b-d9ea0c7cc4df',
    city: 'Chepén, La Libertad, Peru',
    name: 'Mi cuarta dirección',
    street: 'Jr Atahualpa 237',
    current: false,
    tag: 'pareja',
  },
  {
    id: '9f263633-7de7-dasmdsakdmsad-d9ea0c7cc4df',
    city: 'Chepén, La Libertad, Peru',
    name: 'Mi sexta dirección',
    street: 'Los Alamos 227',
    current: false,
    tag: 'trabajo',
  },
  {
    id: '9a263633e7-4ce1-a50b-d9ea0c7cc4df',
    city: 'Chepén, La Libertad, Peru',
    name: 'Mi decima dirección',
    street: 'Mz Palma Bella 217',
    current: false,
    tag: 'otro',
  },
];

interface Props {}

type NavigationProps = NativeStackNavigationProp<
  ApplicationBottomTabParams,
  'ProfileStack'
>;

export const AddressesBottomSheet: FC<Props> = () => {
  const setCurrentAddress = useUserAddresses(u => u.setCurrentAddress);
  const currentAddress = useUserAddresses(u => u.currentAddress);
  const addresses = useUserAddresses(u => u.addresses);
  const navigation = useNavigation<NavigationProps>();
  const setAddressesBottomSheetActive = useAddressesBottomSheetStore(
    u => u.setIsActive,
  );

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
            {tmpAddresses.map(address => (
              <Div mb="lg" key={address.id}>
                <AddressBottomSheetItem
                  bg={address.current ? 'red50' : 'transparent'}
                  borderColor={address.current ? 'primary' : 'gray200'}
                  iconName={getAddressBottomSheetIconName(address.tag)}
                  color={address.current ? 'primary' : 'gray'}
                  addressName={address.name}
                  addressStreet={address.street}
                  addressCity={address.city}
                />
              </Div>
            ))}
          </Radio.Group>
        </Div>
      </ScrollView>

      {/* <Radio.Group>
        {['Option 1', 'Option 2', 'Option 3'].map((item, key) => (
          <Radio value={item} key={key.toString()}>
            {({checked}) => (
              <Div
                bg={checked ? 'blue600' : 'blue100'}
                px="xl"
                py="md"
                mr="md"
                rounded="circle">
                <Text color={checked ? 'white' : 'zinc800'}>{item}</Text>
              </Div>
            )}
          </Radio>
        ))}
      </Radio.Group> */}
    </Div>
  );
};
