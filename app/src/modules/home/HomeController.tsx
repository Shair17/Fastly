import React, {FC} from 'react';
import {Div, Image, Text} from 'react-native-magnus';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from 'react-native-reanimated';
import {HomeScreenProps} from '../../navigation/screens/app/HomeScreen';

const logoImage = require('../../assets/images/fastly@1000x1000.png');

const Item = () => {
  return (
    <Div>
      <Div flexDir="row" mt="md">
        <Div rounded="circle" bg="gray200" h={40} w={40} />
        <Div ml="md" flex={1}>
          <Div mt="sm" rounded="lg" h={15} bg="gray200" />
          <Div mt="sm" w="80%" rounded="lg" h={15} bg="gray200" />
          <Div mt="sm" rounded="lg" h={15} bg="gray200" />
        </Div>
      </Div>
      <Div flexDir="row" mt="md">
        <Div h={20} w={20} rounded="lg" bg="gray200" />
        <Div h={20} w={20} rounded="lg" bg="gray200" ml="md" />
        <Div alignItems="flex-end" flex={1}>
          <Div h={20} w={100} bg="gray200" rounded="lg" />
        </Div>
      </Div>

      <Div my="xl" />
    </Div>
  );
};
const Header = () => {
  return (
    <Div>
      <Div my="md" />
      <Div flexDir="row" justifyContent="center" alignItems="center">
        <Div
          bg="red100"
          w={30}
          h={30}
          rounded="circle"
          shadow="xs"
          justifyContent="center"
          alignItems="center">
          <Image w={20} h={20} source={logoImage} />
        </Div>

        <Div mx="xs" />

        <Text fontWeight="bold" fontSize="4xl" color="text">
          Fastly
        </Text>
      </Div>
    </Div>
  );
};

export const HomeController: FC<HomeScreenProps> = () => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const animatedStyles = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 50],
      [50, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 50],
      [0, -50],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0],
      Extrapolation.CLAMP,
    );
    // withSpring() agrega animaciones? xd
    return {
      height: withSpring(height),
      transform: [{translateY: withSpring(translateY)}],
      opacity: withSpring(opacity),
    };
  });

  return (
    <Div flex={1} bg="body">
      <Animated.View
        style={[
          {
            backgroundColor: 'tomato',
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyles,
        ]}>
        <Text fontSize="6xl" fontWeight="bold" color="white">
          Fastly
        </Text>
      </Animated.View>

      <Animated.ScrollView
        // style={{flex: 1}}
        bounces
        showsVerticalScrollIndicator
        scrollEventThrottle={5}
        onScroll={scrollHandler}>
        <Div p="2xl">
          {[...Array(10)].map((_, key) => (
            <Item key={key.toString()} />
          ))}
        </Div>
      </Animated.ScrollView>
    </Div>
  );
};
