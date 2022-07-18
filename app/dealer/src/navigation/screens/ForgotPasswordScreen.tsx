import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForgotPasswordController} from '@fastly/modules/forgot-password/ForgotPasswordController';
import {RootStackParams} from '../Root';

export interface ForgotPasswordScreenProps
  extends NativeStackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen: React.FC = props => {
  return <ForgotPasswordController {...props} />;
};
