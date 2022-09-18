import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {ActivityIndicator} from '../atoms/ActivityIndicator';

export const EmptyOrderQueue: FC = () => {
  return (
    <Div flex={1}>
      <Div p="2xl">
        <Text fontSize="6xl" fontWeight="bold" color="text">
          No hay pedidos disponibles.
        </Text>
        <Text fontSize="lg" color="text" my="lg">
          La cola de pedidos se actualiza en tiempo real, no es necesario que
          reinicies o recargues la aplicación.
        </Text>
        <Div mt="2xl" alignSelf="center">
          <ActivityIndicator />
        </Div>
      </Div>
    </Div>
  );
};
