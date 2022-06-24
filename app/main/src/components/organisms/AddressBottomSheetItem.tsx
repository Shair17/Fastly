import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Icon, Text} from 'react-native-magnus';
import {Address} from '../../interfaces/appInterfaces';

interface Props {
  borderColor: string;
  bg: string;
  iconName: string;
  color: string;
  address: Address;
  onPress: () => void;
}

export const AddressBottomSheetItem: FC<Props> = ({
  address,
  iconName,
  color,
  bg,
  borderColor,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Div
        bg={bg}
        borderWidth={0.8}
        borderColor={borderColor}
        rounded="xl"
        p="lg"
        row>
        <Div justifyContent="center" alignItems="center" mr="lg">
          <Icon
            fontFamily="Ionicons"
            name={iconName}
            fontSize="3xl"
            color={color}
          />
        </Div>
        <Div flex={1}>
          <Text fontSize="sm" fontWeight="500" color={color}>
            {address.name}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={color}>
            {address.street}
          </Text>
          <Text fontSize="lg" fontWeight="500" color={color}>
            {address.city}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
