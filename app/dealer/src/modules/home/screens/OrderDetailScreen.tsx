import React, {FC, useEffect} from 'react';
import {Div, Text} from 'react-native-magnus';
import {Map} from '@fastly/components/atoms/Map';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../HomeController';
import {objectIsEmpty} from '@fastly/utils/objectIsEmpty';
import {formatDate} from '@fastly/utils/formatDate';
import {Button} from '@fastly/components/atoms/Button';

interface Props
  extends NativeStackScreenProps<HomeStackParams, 'OrderDetailScreen'> {}

export const OrderDetailScreen: FC<Props> = ({navigation, route}) => {
  const order = route.params;

  const handleGoBack = () => navigation.goBack();

  const handleTakeOrder = () => console.log(`Taking order with id ${order.id}`);

  useEffect(() => {
    if (objectIsEmpty(order)) {
      navigation.navigate('HomeScreen');
    }
  }, [order]);

  return (
    <Div flex={1} p="2xl">
      <Div>
        <Text fontWeight="bold" fontSize="6xl">
          Pedido para {order.order.userId}
        </Text>
        <Text fontSize="sm">{formatDate(new Date(order.order.createdAt))}</Text>
      </Div>

      <Div flex={1} py="lg" bg="green">
        <Map />
      </Div>

      <Div row justifyContent="space-between">
        <Button
          fontWeight="600"
          fontSize="2xl"
          w={150}
          borderWidth={1}
          borderColor="primary"
          bg="transparent"
          color="primary"
          underlayColor="red100"
          onPress={handleGoBack}>
          Cancelar
        </Button>
        <Button
          w={150}
          borderWidth={1}
          borderColor="primary"
          shadow="xs"
          fontWeight="600"
          fontSize="2xl"
          onPress={handleTakeOrder}>
          Tomar
        </Button>
      </Div>
    </Div>
  );
};
