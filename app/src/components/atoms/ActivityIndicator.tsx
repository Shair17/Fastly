import React, {FC} from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';
import {useTheme} from 'react-native-magnus';

interface ActivityIndicatorProps extends RNActivityIndicatorProps {}

export const ActivityIndicator: FC<ActivityIndicatorProps> = props => {
  const {theme} = useTheme();

  return (
    <RNActivityIndicator
      color={theme.colors?.primary}
      size="large"
      {...props}
    />
  );
};
