import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ApplicationParams} from '@fastly/navigation/drawer/Root';
import {HomeController} from '@fastly/modules/home/HomeController';

export interface HomeStackProps
  extends DrawerScreenProps<ApplicationParams, 'HomeStack'> {}

export const HomeStack: React.FC<HomeStackProps> = props => {
  return <HomeController {...props} />;
};
