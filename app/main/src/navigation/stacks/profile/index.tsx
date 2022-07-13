import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';
import {ProfileController} from '@fastly/modules/profile/ProfileController';

export interface ProfileStackProps
  extends BottomTabScreenProps<ApplicationParams, 'ProfileStack'> {}

export const ProfileStack: React.FC<ProfileStackProps> = props => {
  return <ProfileController {...props} />;
};
