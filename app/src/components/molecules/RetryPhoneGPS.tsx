import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {Button} from '../atoms/Button';

interface Props {
  onPress: () => void;
}

export const RetryPhoneGPS = ({onPress}: Props) => {
  return (
    <Div flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="lg" fontWeight="600" textAlign="center">
        Por favor activa el GPS en tu teléfono
      </Text>
      <Button mt="lg" onPress={onPress} alignSelf="center" fontWeight="bold">
        Reintentar
      </Button>
    </Div>
  );
};
