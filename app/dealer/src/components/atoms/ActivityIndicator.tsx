import React, {FC} from 'react';
import {ViewProps} from 'react-native';
import {useTheme} from 'react-native-magnus';
import {Bounce} from 'react-native-animated-spinkit';

interface ActivityIndicatorProps extends ViewProps {
  size?: number;
  color?: string;
  animating?: boolean;
  hidesWhenStopped?: boolean;
}

export const ActivityIndicator: FC<ActivityIndicatorProps> = props => {
  const {theme} = useTheme();

  return <Bounce color={theme.colors?.secondary} {...props} />;
};
