import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';
import {HomeController} from '@fastly/modules/home/HomeController';

export interface HomeStackProps
  extends BottomTabScreenProps<ApplicationParams, 'HomeStack'> {}

export const HomeStack: React.FC<HomeStackProps> = props => {
  return <HomeController {...props} />;
};
