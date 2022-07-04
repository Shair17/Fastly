import React, {FC} from 'react';
import {TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {Div, Text, Image, Icon} from 'react-native-magnus';
import {HeaderScreen} from '../../components/organisms/HeaderScreen';
import TextTicker from 'react-native-text-ticker';
import {Address} from '../../interfaces/appInterfaces';

const logoImage = require('../../assets/images/fastly@1000x1000.png');

interface Props {
  currentAddress: Address;
  goToSearch: () => void;
  openAddressesBottomSheet: () => void;
}

export const HomeControllerHeader: FC<Props> = ({
  currentAddress,
  goToSearch,
  openAddressesBottomSheet,
}) => {
  if (Object.keys(currentAddress).length === 0) {
    return null;
  }

  return (
    <HeaderScreen
      left={
        <Div
          bg="red100"
          w={30}
          h={30}
          rounded="circle"
          shadow="xs"
          justifyContent="center"
          alignItems="center">
          <Image w={20} h={20} source={logoImage} />
        </Div>
      }
      middle={
        <TouchableNativeFeedback onPress={openAddressesBottomSheet}>
          <Div row p="xs">
            <Icon
              fontFamily="Ionicons"
              name="location"
              fontSize={14}
              color="primary"
            />
            <TextTicker
              duration={5000}
              loop
              bounce
              style={{width: 130, marginHorizontal: 4}}>
              <Text fontWeight="bold" color="text">
                {currentAddress.street},{' '}
                {currentAddress.city.replace('Peru', 'Perú')}
              </Text>
            </TextTicker>

            <Icon
              fontFamily="Ionicons"
              name="chevron-down"
              fontSize={12}
              color="secondary"
            />
          </Div>
        </TouchableNativeFeedback>
      }
      right={
        <TouchableOpacity activeOpacity={0.7} onPress={goToSearch}>
          <Icon
            fontFamily="Ionicons"
            name="search-outline"
            color="text"
            fontSize="4xl"
          />
        </TouchableOpacity>
      }
    />
  );
};
