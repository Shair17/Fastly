import React, {FC, useRef} from 'react';
import {Div, Image, Text} from 'react-native-magnus';
import {Skeleton} from '../../components/atoms/Skeleton';
import {HomeScreenProps} from '../../navigation/screens/app/HomeScreen';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const logoImage = require('../../assets/images/fastly@1000x1000.png');

const Item = () => {
  return (
    <Div>
      <Div flexDir="row" mt="md">
        <Skeleton.Circle h={40} w={40} />
        <Div ml="md" flex={1}>
          <Skeleton.Box mt="sm" />
          <Skeleton.Box mt="sm" w="80%" />
          <Skeleton.Box mt="sm" />
        </Div>
      </Div>
      <Div flexDir="row" mt="md">
        <Skeleton.Circle h={20} w={20} rounded="lg" />
        <Skeleton.Circle h={20} w={20} rounded="lg" ml="md" />
        <Div alignItems="flex-end" flex={1}>
          <Skeleton.Box h={20} w={100}></Skeleton.Box>
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
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // const scrollY = new Animated.Value(0);
  // const onScroll = Animated.event([
  //   {
  //     nativeEvent: {
  //       contentOffset: {
  //         y: scrollY,
  //       },
  //     },
  //   },
  // ]);
  // const diffClampScrollY = Animated.diffClamp(scrollY, 0, 50);
  // const headerHeight = Animated.interpolateNode(diffClampScrollY, {
  //   inputRange: [0, 50],
  //   outputRange: [50, 0],
  //   extrapolate: Extrapolation.CLAMP,
  // });
  // const headerTranslateY = Animated.interpolateNode(diffClampScrollY, {
  //   inputRange: [0, 50],
  //   outputRange: [0, -50],
  //   extrapolate: Extrapolation.CLAMP,
  // });
  // const headerOpacity = Animated.interpolateNode(diffClampScrollY, {
  //   inputRange: [0, 50],
  //   outputRange: [1, 0],
  //   extrapolate: Extrapolation.CLAMP,
  // });

  return (
    <Div flex={1} bg="body">
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <Header />
      </Animated.View>
      <Animated.ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator
        scrollEventThrottle={1}
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
