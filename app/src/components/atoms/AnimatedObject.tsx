import React, {FC} from 'react';
import {Image} from 'react-native-magnus';
import * as Animatable from 'react-native-animatable';

interface Props {
  duration?: number;
  image: any;
  w?: number;
  h?: number;
  bg?: string;
}

export const AnimatedObject: FC<Props> = ({
  duration = 3000,
  image,
  w = 100,
  h = 100,
  bg = undefined,
}) => {
  return (
    <Animatable.View
      animation={
        {
          from: {
            translateY: -5,
            rotate: '-1.8deg',
          },
          to: {
            translateY: 0,
            rotate: '1.8deg',
          },
        } as any
      }
      duration={duration}
      iterationCount="infinite"
      easing="ease-in-out"
      direction="alternate"
      useNativeDriver>
      <Image position="absolute" source={image} w={w} h={h} bg={bg} />
    </Animatable.View>
  );
};
