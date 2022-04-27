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
        <Div>
          <Text
            fontSize="6xl"
            color="text"
            fontWeight="bold"
            textAlign="center"
            mx={25}>
            {title}
          </Text>
          <Text
            fontSize="lg"
            color="textPrimary"
            textAlign="center"
            mx={60}
            mt={20}>
            {subtitle}
          </Text>
        </Div>
      </Div>
    </Div>
  );
};
