import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Icon, Text} from 'react-native-magnus';

interface Props {
  addressName: string;
  addressStreet: string;
  addressCity: string;
  borderColor: string;
  bg: string;
  iconName: string;
  color: string;
}

export const AddressBottomSheetItem: FC<Props> = ({
  addressCity,
  addressName,
  addressStreet,
  iconName,
  color,
  bg,
  borderColor,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
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
            {addressName}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={color}>
            {addressStreet}
          </Text>
          <Text fontSize="lg" fontWeight="500" color={color}>
            {addressCity}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
