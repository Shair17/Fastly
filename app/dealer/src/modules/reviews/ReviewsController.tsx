import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {ReviewsStackProps} from '@fastly/navigation/stacks/reviews';

export const ReviewsController: React.FC<ReviewsStackProps> = () => {
  return (
    <Div>
      <Text>ReviewsController</Text>
    </Div>
  );
};
