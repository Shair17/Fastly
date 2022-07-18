import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SignInController} from '@fastly/modules/sign-in/SignInController';
import {RootStackParams} from '../Root';

export interface SignInScreenProps
  extends NativeStackScreenProps<RootStackParams, 'SignInScreen'> {}

export const SignInScreen: React.FC<SignInScreenProps> = props => {
  return <SignInController {...props} />;
};
