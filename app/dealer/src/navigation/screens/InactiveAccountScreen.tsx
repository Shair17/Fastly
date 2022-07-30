import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InactiveAccountController} from '@fastly/modules/inactive-account/InactiveAccountController';
import {RootStackParams} from '../Root';

export interface InactiveAccountScreenProps
  extends NativeStackScreenProps<RootStackParams, 'InactiveAccountScreen'> {}

export const InactiveAccountScreen: React.FC<
  InactiveAccountScreenProps
> = props => {
  return <InactiveAccountController {...props} />;
};
