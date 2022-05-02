import React, {FC} from 'react';
import {LoadingTemplate} from '../../components/templates/LoadingTemplate';

export interface LoadingScreenProps {}

export const LoadingScreen: FC<LoadingScreenProps> = props => {
  return <LoadingTemplate />;
};
