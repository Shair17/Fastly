import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticationController} from '../../modules/authentication/AuthenticationController';
import {RootStackParams} from '../RootNavigation';

export interface AuthenticationScreenProps
  extends NativeStackScreenProps<RootStackParams, 'AuthenticationScreen'> {}

export const AuthenticationScreen: FC<AuthenticationScreenProps> = props => {
  return <AuthenticationController {...props} />;
};
