import React from 'react';
import {isFunction} from '@fastly/utils/isFunctions';
import {Div, Icon, Text, Image} from 'react-native-magnus';
import {SeeMore} from './SeeMore';
import type {Response as FeedResponse} from '../screens/HomeScreen';
import {ScrollView, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';
import {isString} from '@fastly/utils/isString';

const defaultFastlyLogoSquare =
  'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1666557512/defaults/logos/fastly_square.png';

interface Props {
  onSeeMorePress?: () => void;
  data: FeedResponse['storesJustAdded'];
  navigation: any;
}

export const LatestStores: React.FC<Props> = ({
  onSeeMorePress,
  data,
  navigation,
}) => {
  return (
    <Div>
      <Div mb="sm" row alignItems="center" justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Negocios recién agregados
        </Text>
        {isFunction(onSeeMorePress) ? (
          <SeeMore onPress={onSeeMorePress} />
        ) : null}
      </Div>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(store => {
          const isOpenFullTime = !(
            isString(store.openTime) && isString(store.closeTime)
          );
          return (
            <TouchableOpacity
              key={store.id}
              activeOpacity={0.95}
              onPress={() =>
                navigation.navigate('Store', {
                  id: store.id,
                })
              }>
              <Div
                bg="body"
                w={300}
                h={300}
                rounded="lg"
                borderWidth={1}
                borderColor="gray100"
                shadow="xs"
                mr="md">
                {/** Store Image */}
                <Div flex={2}>
                  <Image
                    flex={1}
                    source={{
                      uri: isString(store.logo)
                        ? store.logo
                        : defaultFastlyLogoSquare,
                    }}
                    roundedTopLeft="lg"
                    roundedBottomLeft="lg"
                    resizeMode="contain"
                  />
                </Div>
                {/** Store Content */}
                <Div>
                  <Div p="md" justifyContent="space-between">
                    <Div mb="md">
                      <Text
                        fontWeight="bold"
                        color="primary"
                        fontSize="2xl"
                        numberOfLines={1}>
                        {store.name}
                      </Text>
                      <Text
                        numberOfLines={3}
                        mt="xs"
                        color="gray500"
                        fontWeight="300">
                        {store.description ||
                          'Este negocio no tiene descripción.'}
                      </Text>
                      <Div mt="sm" row>
                        <Icon
                          fontFamily="Ionicons"
                          name="location"
                          fontSize="md"
                          color="primary"
                        />
                        <Text
                          ml="xs"
                          fontSize="md"
                          color="gray600"
                          fontWeight="500"
                          numberOfLines={1}>
                          {store.address}
                        </Text>
                      </Div>
                    </Div>

                    <Div row justifyContent="space-between" mt="sm">
                      <Div row>
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
                      {/** Open, Close Date */}
                      <Div row>
                        <Icon
                          name="time-outline"
                          fontFamily="Ionicons"
                          fontSize="xs"
                          alignSelf="center"
                          color="gray400"
                        />
                        <Text ml="xs" fontSize="xs" color="gray400">
                          {isOpenFullTime
                            ? '24/7'
                            : `${format(
                                new Date(store.openTime!),
                                "hh:mmaaaaa'm'",
                              )} - ${format(
                                new Date(store.closeTime!),
                                "hh:mmaaaaa'm'",
                              )}`}
                        </Text>
                      </Div>
                    </Div>
                  </Div>
                </Div>
              </Div>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Div>
  );
};
