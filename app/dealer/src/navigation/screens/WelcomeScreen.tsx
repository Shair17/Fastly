import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WelcomeController} from '@fastly/modules/welcome/WelcomeController';
import {RootStackParams} from '../Root';

export interface WelcomeScreenProps
  extends NativeStackScreenProps<RootStackParams, 'WelcomeScreen'> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = props => {
  return <WelcomeController {...props} />;
};
