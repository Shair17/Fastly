import React, {FC} from 'react';
import {AskPersonalInformationController} from '../../modules/ask-personal-information/AskPersonalInformationController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../RootNavigation.type';

export interface AskPersonalInformationScreenProps
  extends NativeStackScreenProps<
    RootStackParams,
    'AskPersonalInformationScreen'
  > {}

export const AskPersonalInformationScreen: FC<
  AskPersonalInformationScreenProps
> = props => {
  return <AskPersonalInformationController {...props} />;
};
