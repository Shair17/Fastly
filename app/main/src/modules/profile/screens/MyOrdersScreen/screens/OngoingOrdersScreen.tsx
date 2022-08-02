import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {Button} from '@fastly/components/atoms/Button';

interface Props {}

/*
import {AirbnbRating} from 'react-native-ratings';

const ratingCompleted = (rating: number) => {
  console.log('Rating is: ' + rating);
};

<AirbnbRating
  reviews={['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente']}
  onFinishRating={ratingCompleted}
/>
*/

export const OngoingOrdersScreen: FC<Props> = props => {
  // const userHasOngoingOrders = useSocketStore(s => s.userHasOngoingOrders);
  const userHasOngoingOrders = true;

  if (!userHasOngoingOrders) {
    return (
      <Div flex={1} p="2xl">
        <Text fontWeight="bold" fontSize="6xl">
          No tienes pedidos en camino :(
        </Text>
        <Button fontWeight="bold" block mt="2xl">
          Crear un Pedido
        </Button>
      </Div>
    );
  }

  return (
    <Div p="2xl">
      <Text>OngoingOrdersScreen</Text>
    </Div>
  );
};
