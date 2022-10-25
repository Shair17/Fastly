import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon, Image} from 'react-native-magnus';
import {Store} from '@fastly/interfaces/app';
import {isString} from '@fastly/utils/isString';
import {format} from 'date-fns';

const defaultFastlyLogoSquare =
  'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1666557512/defaults/logos/fastly_square.png';

interface Props extends Store {
  ranking: {
    value: number;
    size: number;
  };
}

export const CategoryStoreItem: React.FC<Props> = ({
  name,
  description,
  address,
  logo = defaultFastlyLogoSquare,
  openTime,
  closeTime,
  ranking,
}) => {
  const isOpenFullTime = isString(openTime) || isString(closeTime);

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={() => console.log('TODO')}>
      <Div
        bg="body"
        h={150}
        rounded="lg"
        borderWidth={1}
        borderColor="gray100"
        shadow="xs"
        row>
        {/** Store Image */}
        <Div flex={2}>
          <Image
            flex={1}
            source={{uri: isString(logo) ? logo : defaultFastlyLogoSquare}}
            roundedTopLeft="lg"
            roundedBottomLeft="lg"
            resizeMode="contain"
          />
        </Div>
        {/** Store Content */}
        <Div flex={4}>
          <Div p="md" justifyContent="space-between">
            <Div mb="md">
              <Text
                fontWeight="bold"
                color="primary"
                fontSize="2xl"
                numberOfLines={1}>
                {name}
              </Text>
              <Text numberOfLines={3} mt="xs" color="gray500" fontWeight="300">
                {description || 'Este negocio no tiene descripción.'}
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
                  {address}
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
                  {ranking.value}
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
                        new Date(openTime!),
                        "hh:mmaaaaa'm'",
                      )} - ${format(new Date(closeTime!), "hh:mmaaaaa'm'")}`}
                </Text>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
