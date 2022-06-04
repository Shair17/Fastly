import React, {FC} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';
import {HomeController} from '../../../modules/home/HomeController';

export interface HomeScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'HomeScreen'> {}

export const HomeScreen: FC<HomeScreenProps> = props => {
  return <HomeController {...props} />;
};
