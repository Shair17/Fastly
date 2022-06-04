import React, {FC} from 'react';
import {WelcomeNewUserController} from '../../modules/welcome-new-user/WelcomeNewUserController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../RootNavigation.type';

export interface WelcomeNewUserScreenProps
  extends NativeStackScreenProps<RootStackParams, 'AskLocationScreen'> {}

export const WelcomeNewUserScreen: FC<WelcomeNewUserScreenProps> = props => {
  return <WelcomeNewUserController {...props} />;
};
