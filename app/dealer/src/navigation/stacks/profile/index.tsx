import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ApplicationParams} from '@fastly/navigation/drawer/Root';
import {ProfileController} from '@fastly/modules/profile/ProfileController';

export interface ProfileStackProps
  extends DrawerScreenProps<ApplicationParams, 'ProfileStack'> {}

export const ProfileStack: React.FC<ProfileStackProps> = props => {
  return <ProfileController {...props} />;
};
