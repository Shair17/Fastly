import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';

interface Props {}

/*
import {AirbnbRating} from 'react-native-ratings';
import { ContainerWithKeyboardAvoidingView } from '../../../../components/templates/ContainerWithKeyboardAvoidingView';

const ratingCompleted = (rating: number) => {
  console.log('Rating is: ' + rating);
};

<AirbnbRating
  reviews={['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente']}
  onFinishRating={ratingCompleted}
/>
*/

export const OngoingOrdersScreen: FC<Props> = () => {
  return (
    <Div>
      <Text>OngoingOrdersScreen</Text>
    </Div>
  );
};
