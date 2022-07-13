import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AskPersonalInformationController} from '@fastly/modules/ask-personal-information/AskPersonalInformationController';
import {RootStackParams} from '../Root';

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
