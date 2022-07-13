import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnBoardingController} from '@fastly/modules/onboarding/OnBoardingController';
import {RootStackParams} from '../Root';

export interface OnBoardingScreenProps
  extends NativeStackScreenProps<RootStackParams, 'OnBoardingScreen'> {}

export const OnBoardingScreen: React.FC<OnBoardingScreenProps> = props => {
  return <OnBoardingController {...props} />;
};
