import React, {FC, useRef} from 'react';
import {Animated} from 'react-native';
import {Div, Image, Text} from 'react-native-magnus';
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
  const scrollY = useRef(new Animated.Value(0));
  const diffClampScrollY = Animated.diffClamp(scrollY.current, 0, 50);
  const headerHeight = diffClampScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });
  const headerTranslateY = diffClampScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  const headerOpacity = diffClampScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Div flex={1} bg="body">
      <Div
        style={{
          height: 70,
          backgroundColor: 'tomato',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text fontSize="6xl" fontWeight="bold" color="white">
          Fastly
        </Text>
      </Div>

      <Animated.ScrollView
        // style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
          {useNativeDriver: false},
        )}>
        <Div p="2xl">
          {[...Array(100)].map((_, key) => (
            <Item key={key.toString()} />
          ))}
        </Div>
      </Animated.ScrollView>
    </Div>
  );
};
