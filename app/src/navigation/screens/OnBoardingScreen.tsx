import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnBoardingController} from '../../modules/onboarding/OnBoardingController';
import {RootStackParams} from '../RootNavigation';

export interface OnBoardingScreenProps
  extends NativeStackScreenProps<RootStackParams, 'OnBoardingScreen'> {}

export const OnBoardingScreen: FC<OnBoardingScreenProps> = props => {
  return <OnBoardingController {...props} />;
};
