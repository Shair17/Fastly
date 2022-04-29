import React, {FC} from 'react';
import {Div} from 'react-native-magnus';

interface Props {
  index: number;
  currentSlide: number;
  w?: number;
  h?: number;
}

export const OnBoardingDot: FC<Props> = ({
  index,
  currentSlide,
  w = 8,
  h = 8,
}) => {
  return (
    <Div
      w={w}
      h={h}
      mx="xs"
      bg={currentSlide === index ? 'primary' : 'red100'}
      rounded="circle"
    />
  );
};
