import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text} from 'react-native-magnus';

interface Props {
  onPress?: () => void;
  text?: string;
}

export const SeeMore: React.FC<Props> = ({onPress, text = 'Ver Todo'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{justifyContent: 'center'}}
      activeOpacity={0.8}>
      <Div
        row
        bg="red50"
        borderColor="primary"
        rounded="circle"
        alignSelf="center"
        px="sm"
        py="xs">
        <Text color="primary" fontWeight="600" fontSize="xs">
          {text}
        </Text>
      </Div>
    </TouchableOpacity>
  );
};
