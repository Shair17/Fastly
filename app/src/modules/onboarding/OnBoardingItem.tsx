import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {useDimensions} from '../../hooks/useDimensions';
import {Slide} from './slides';

interface Props extends Slide {}

export const OnBoardingItem: FC<Props> = ({image, title, subtitle}) => {
  const {
    window: {width},
  } = useDimensions();

  return (
    <Div alignItems="center" justifyContent="center">
      <Div w={width}>
        <Div
          bgImg={image}
          w={width - width * 0.1}
          h={350}
          bgMode="contain"
          mt={20}
          alignSelf="center"
        />
        <Div px="2xl">
          <Text
            fontSize="6xl"
            color="text"
            fontWeight="bold"
            textAlign="center">
            {title}
          </Text>

          <Div my={10} />

          <Text fontSize="lg" color="textPrimary" textAlign="center">
            {subtitle}
          </Text>
        </Div>
      </Div>
    </Div>
  );
};
