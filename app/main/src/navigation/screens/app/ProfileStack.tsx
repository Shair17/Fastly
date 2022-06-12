import React, {FC} from 'react';
import {ProfileController} from '../../../modules/profile/ProfileController';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';

export interface ProfileScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'ProfileStack'> {}

export const ProfileScreen: FC<ProfileScreenProps> = props => {
  return <ProfileController {...props} />;
};
