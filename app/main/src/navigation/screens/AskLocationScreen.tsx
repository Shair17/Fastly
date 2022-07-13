import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AskLocationController} from '@fastly/modules/ask-location/AskLocationController';
import {RootStackParams} from '../Root';

export interface AskLocationScreenProps
  extends NativeStackScreenProps<RootStackParams, 'AskLocationScreen'> {}

export const AskLocationScreen: React.FC<AskLocationScreenProps> = props => {
  return <AskLocationController {...props} />;
};
