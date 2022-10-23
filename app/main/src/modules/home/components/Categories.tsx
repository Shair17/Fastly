import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {ServicesCarousel} from '@fastly/components/organisms/ServicesCarousel';
import {SeeMore} from './SeeMore';
import {isFunction} from '@fastly/utils/isFunctions';

interface Props {
  navigation: any;
  onSeeMorePress?: () => void;
}

export const Categories: React.FC<Props> = ({navigation, onSeeMorePress}) => {
  return (
    <Div>
      <Div mb="sm" row alignItems="center" justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Categorías
        </Text>
        {isFunction(onSeeMorePress) ? (
          <SeeMore onPress={onSeeMorePress} />
        ) : null}
      </Div>
      <ServicesCarousel navigation={navigation} />
    </Div>
  );
};
