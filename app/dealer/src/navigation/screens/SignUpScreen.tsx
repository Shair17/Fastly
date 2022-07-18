import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SignUpController} from '@fastly/modules/sign-up/SignUpController';
import {RootStackParams} from '../Root';

export interface SignUpScreenProps
  extends NativeStackScreenProps<RootStackParams, 'SignUpScreen'> {}

export const SignUpScreen: React.FC<SignUpScreenProps> = props => {
  return <SignUpController {...props} />;
};
