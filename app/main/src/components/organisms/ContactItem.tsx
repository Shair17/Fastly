import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';

interface Props {
  iconName: string;
  title: string;
  description: string;
  onPress?: () => void;
}

export const ContactItem: FC<Props> = ({
  description,
  iconName,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Div flexDir="row" px="md" py="lg" alignItems="center">
        <Div justifyContent="center" alignItems="center" mr="lg">
          <Icon
            fontFamily="Ionicons"
            name={iconName}
            fontSize={40}
            p="md"
            rounded="circle"
            color="primary"
            bg="red50"
          />
        </Div>
        <Div flex={1}>
          <Text fontWeight="bold" color="text" fontSize="xl">
            {title}
          </Text>
          <Text mt="sm" fontSize="md">
            {description}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
