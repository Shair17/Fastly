import React, {FC} from 'react';
import {Div, Text, Image, Icon} from 'react-native-magnus';
import {ContainerWithCredits} from './ContainerWithCredits';
import * as Animatable from 'react-native-animatable';
import {Button} from '../atoms/Button';
import {ImageSourcePropType} from 'react-native';

interface EmptyContainerProps {
  image: {
    source: ImageSourcePropType;
    w: number;
    h: number;
  };
  title: string;
  description: string;
  goToHome: () => void;
}

export const EmptyContainer: FC<EmptyContainerProps> = ({
  image,
  title,
  description,
  goToHome,
}) => {
  return (
    <ContainerWithCredits justifyContent="center" alignItems="center">
      <Div p="2xl" alignItems="center">
        <Div>
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
            duration={2000}
            iterationCount="infinite"
            easing="ease-in-out"
            direction="alternate"
            useNativeDriver>
            <Image
              source={image.source}
              w={image.w}
              h={image.h}
              resizeMode="contain"
            />
          </Animatable.View>
        </Div>
        <Div mb="xl">
          <Text fontSize="6xl" fontWeight="bold" textAlign="center">
            {title}
          </Text>
          <Text
            mt="md"
            textAlign="center"
            fontSize="lg"
            fontWeight="500"
            color="textPrimary">
            {description}
          </Text>
        </Div>
        <Div>
          <Button
            shadow="xs"
            fontWeight="bold"
            fontSize="xl"
            prefix={
              <Icon fontSize="xl" name="arrowleft" mr="md" color="white" />
            }
            onPress={goToHome}>
            Regresar a Inicio
          </Button>
        </Div>
      </Div>
    </ContainerWithCredits>
  );
};
