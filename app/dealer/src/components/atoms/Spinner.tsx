import React from 'react';
import {Animated, Easing, ViewProps} from 'react-native';
import {defaultColors as colors} from '@fastly/theme/colors';

export type SpinnerProps = ViewProps & {
  size?: 's' | 'm';
};

export const Spinner: React.FC<SpinnerProps> = ({style, size = 'm'}) => {
  let spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const isSmall = size === 's';

  return (
    <Animated.View
      style={[
        style,
        {
          borderWidth: isSmall ? 2 : 4,
          borderRadius: isSmall ? 6 : 12,
          borderColor: 'transparent',
          height: isSmall ? 12 : 20,
          width: isSmall ? 12 : 20,
          borderTopColor: colors.black,
          borderLeftColor: colors.black,
          transform: [{rotate: spin}],
        },
      ]}
    />
  );
};
