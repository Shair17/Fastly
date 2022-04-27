import React, {FC} from 'react';
import {Div} from 'react-native-magnus';

interface Props {
  index: number;
  currentSlide: number;
}

export const OnBoardingDot: FC<Props> = ({index, currentSlide}) => {
  return (
    <Div
      w={10}
      h={10}
      mx="xs"
      bg={currentSlide === index ? 'primary' : 'red100'}
      rounded="circle"
    />
  );
};
