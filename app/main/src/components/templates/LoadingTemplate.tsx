import React, {FC} from 'react';
import {Div} from 'react-native-magnus';
import {ActivityIndicator} from '../atoms/ActivityIndicator';
import {CreatedByShair} from '../molecules/CreatedByShair';

interface Props {}

export const LoadingTemplate: FC<Props> = () => {
  return (
    <Div flex={1} bg="body" alignItems="center" justifyContent="center">
      <ActivityIndicator />
      <CreatedByShair />
    </Div>
  );
};
