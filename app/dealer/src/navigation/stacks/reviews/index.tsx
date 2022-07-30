import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ApplicationParams} from '@fastly/navigation/drawer/Root';
import {ReviewsController} from '@fastly/modules/reviews/ReviewsController';

export interface ReviewsStackProps
  extends DrawerScreenProps<ApplicationParams, 'ReviewsStack'> {}

export const ReviewsStack: React.FC<ReviewsStackProps> = props => {
  return <ReviewsController {...props} />;
};
