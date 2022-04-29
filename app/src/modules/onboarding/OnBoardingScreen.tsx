import React, {FC, useRef, useState} from 'react';
import {
  StatusBar,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Div} from 'react-native-magnus';
import {useDimensions} from '../../hooks/useDimensions';
import {OnBoardingDot} from './OnBoardingDot';
import {OnBoardingItem} from './OnBoardingItem';
import {OnBoardingHeader} from './OnBoardingHeader';
import {OnBoardingButton, OnBoardingDoneButton} from './OnBoardingButtons';
import {slides} from './slides';
import {CreatedByShair} from '../../components/molecules/CreatedByShair';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}

export const OnBoardingScreen: FC<Props> = ({navigation}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const {
    window: {width},
  } = useDimensions();
  const updateCurrentSlide = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlide(currentIndex);
  };

  StatusBar.setTranslucent(false);
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#fff');

  const getStarted = () => {
    navigation.replace('AuthenticationScreen');
  };

  const next = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide !== slides.length) {
      const offset = nextSlide * width;
      flatListRef.current?.scrollToOffset({offset});
      setCurrentSlide(currentSlide + 1);
    }
  };

  const skip = () => {
    const lastSlide = slides.length - 1;
    const offset = lastSlide * width;
    flatListRef.current?.scrollToOffset({offset});
    setCurrentSlide(lastSlide);
  };

  return (
    <Div flex={1} bg="body" justifyContent="center">
      <Div flex={4}>
        <OnBoardingHeader />

        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={({item}) => <OnBoardingItem {...item} />}
          onMomentumScrollEnd={updateCurrentSlide}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
        />
      </Div>

      <Div flex={1}>
        <Div flexDir="row" justifyContent="center">
          {slides.map((_, index) => (
            <OnBoardingDot
              key={index.toString()}
              index={index}
              currentSlide={currentSlide}
            />
          ))}
        </Div>

        <Div flex={1} justifyContent="center">
          <Div px="2xl">
            {currentSlide === slides.length - 1 ? (
              <OnBoardingDoneButton onPress={getStarted}>
                Empezar
              </OnBoardingDoneButton>
            ) : (
              <Div flexDir="row" justifyContent="space-between">
                <OnBoardingButton onPress={skip}>Saltar</OnBoardingButton>
                <OnBoardingButton onPress={next}>Siguiente</OnBoardingButton>
              </Div>
            )}
          </Div>

          <CreatedByShair />
        </Div>
      </Div>
    </Div>
  );
};
