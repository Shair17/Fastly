import React, {FC} from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {useTheme} from 'react-native-magnus';

export const RNActivityIndicator: FC<ActivityIndicatorProps> = props => {
  const {theme} = useTheme();

  return <ActivityIndicator color={theme.colors?.secondary} {...props} />;
};
