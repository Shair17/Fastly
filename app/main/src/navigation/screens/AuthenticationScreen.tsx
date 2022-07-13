import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticationController} from '@fastly/modules/authentication/AuthenticationController';
import {RootStackParams} from '../Root';

export interface AuthenticationScreenProps
  extends NativeStackScreenProps<RootStackParams, 'AuthenticationScreen'> {}

export const AuthenticationScreen: React.FC<
  AuthenticationScreenProps
> = props => {
  return <AuthenticationController {...props} />;
};
