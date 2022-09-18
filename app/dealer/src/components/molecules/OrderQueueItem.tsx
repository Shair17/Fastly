import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';

interface Props {
  onPress: () => void;
  canBeTaken: boolean;
}

export const OrderQueueItem: FC<Props> = ({onPress, canBeTaken}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Div
        borderWidth={1}
        borderColor={canBeTaken ? 'green500' : 'yellow500'}
        rounded="md"
        bg={canBeTaken ? 'green500' : 'yellow50'}
        p="md"
        py="lg"
        row>
        <Div position="absolute" left={4} bottom={2}>
          <Text
            fontWeight="bold"
            color={canBeTaken ? 'white' : 'yellow900'}
            fontSize={8}>
            {canBeTaken ? 'hace 1 minuto' : '17 segundos (cuenta regresiva)'}
          </Text>
        </Div>
        <Div flex={1} justifyContent="center" alignItems="center">
          <Icon
            fontFamily="Ionicons"
            name="pricetag"
            color={canBeTaken ? 'white' : 'yellow900'}
            fontSize={42}
            mb="sm"
          />
        </Div>
        <Div flex={3} ml="md">
          {/* producto: nombre y precio */}
          <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="500">
            <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="bold">
              Pedido:{' '}
            </Text>
            Pizza Familiar S/.24
          </Text>
          <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="500">
            <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="bold">
              Cantidad:{' '}
            </Text>
            1 unidad
          </Text>
          <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="500">
            <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="bold">
              Establecimiento:{' '}
            </Text>
            MonasPizzas
          </Text>
          <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="500">
            <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="bold">
              Dirección:{' '}
            </Text>
            Ricardo Palma 200 Chequen
          </Text>
          <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="500">
            <Text color={canBeTaken ? 'white' : 'yellow900'} fontWeight="bold">
              Para:{' '}
            </Text>
            Jimmy Morales - 966107266
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
