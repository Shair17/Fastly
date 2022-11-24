import React from 'react';
import {Div, Icon, Text} from 'react-native-magnus';
import {SeeMore} from './SeeMore';
import {isFunction} from '@fastly/utils/isFunctions';
import type {Response as FeedResponse} from '../screens/HomeScreen';
import {ScrollView, TouchableOpacity} from 'react-native';

interface Props {
  onSeeMorePress?: () => void;
  data: FeedResponse['products'];
  navigation: any;
}

export const ProductsFeed: React.FC<Props> = ({
  onSeeMorePress,
  data,
  navigation,
}) => {
  return (
    <Div>
      <Div mb="sm" row alignItems="center" justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Productos
        </Text>
        {isFunction(onSeeMorePress) ? (
          <SeeMore onPress={onSeeMorePress} />
        ) : null}
      </Div>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(product => (
          <TouchableOpacity
            key={product.id}
            activeOpacity={0.95}
            onPress={() => {
              navigation.navigate('Product', {
                id: product.id,
              });
            }}
            style={{marginBottom: 32, height: 300, width: 300}}>
            <Div
              bg="body"
              flex={1}
              rounded="lg"
              borderWidth={1}
              borderColor="gray100"
              p="lg"
              shadow="xs"
              mr="md">
              <Div flex={1} bgImg={{uri: product.image}} rounded="lg">
                <Div
                  row
                  position="absolute"
                  bg="body"
                  rounded="lg"
                  p="md"
                  top={5}
                  right={5}>
                  <Icon
                    name="star"
                    fontFamily="AntDesign"
                    fontSize="xs"
                    color="secondary"
                  />
                  {/** TODO: Cambiar calificacion */}
                  <Text ml="xs" fontSize="xs" color="gray400">
                    0
                  </Text>
                </Div>
              </Div>
              <Div row justifyContent="space-between">
                <Div mt="md" flex={2}>
                  <Text
                    fontSize="4xl"
                    color="primary"
                    fontWeight="bold"
                    numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text numberOfLines={1} fontSize="sm">
                    {product.description}
                  </Text>
                </Div>
                <Div mt="lg">
                  <Text color="primary" fontWeight="bold" fontSize="4xl">
                    S/. {product.price}
                  </Text>
                </Div>
              </Div>
            </Div>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Div>
  );
};
