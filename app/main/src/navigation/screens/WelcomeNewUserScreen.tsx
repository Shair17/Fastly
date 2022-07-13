import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WelcomeNewUserController} from '@fastly/modules/welcome-new-user/WelcomeNewUserController';
import {RootStackParams} from '../Root';

export interface WelcomeNewUserScreenProps
  extends NativeStackScreenProps<RootStackParams, 'WelcomeNewUserScreen'> {}

export const WelcomeNewUserScreen: React.FC<
  WelcomeNewUserScreenProps
> = props => {
  return <WelcomeNewUserController {...props} />;
};
