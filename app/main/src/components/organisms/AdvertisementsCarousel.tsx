import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div} from 'react-native-magnus';
import {Carousel} from '../atoms/Carousel';
import {openLink} from '@fastly/utils/openLink';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Response as AdvertisementCarouselResponse} from '../../modules/home/screens/HomeScreen';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';
import {isString} from '../../utils/isString';

interface Props {
  data: AdvertisementCarouselResponse['carousel'];
  navigation: BottomTabNavigationProp<
    ApplicationParams,
    'HomeStack',
    undefined
  >;
}

export const AdvertisementsCarousel: React.FC<Props> = ({data, navigation}) => {
  return (
    <Carousel>
      {data.map(({image, type, metadata}, key) => {
        const onPress = () => {
          if (isString(metadata.message)) {
            Notifier.showNotification({
              title: 'Notificación',
              description: metadata.message as string,
              Component: NotifierComponents.Notification,
            });
          }

          switch (type) {
            case 'category':
              // navigation.jumpTo('SearchStack');
              // openLink('https://shair.dev', false);
              break;

            case 'product':
              openLink('https://shair.dev', false);
              break;

            case 'store':
              openLink('https://shair.dev', false);
              break;

            case 'link':
              if (isString(metadata.url)) {
                openLink(metadata.url!, false);
              }
              break;

            default:
              Notifier.showNotification({
                title: 'Error',
                description:
                  'Ha ocurrido un error inesperado al procesar tu solicitud.',
                Component: NotifierComponents.Alert,
                componentProps: {
                  alertType: 'error',
                },
              });
              break;
          }
        };

        return (
          <TouchableOpacity
            key={key.toString()}
            onPress={onPress}
            style={{flex: 1}}
            activeOpacity={0.8}>
            <Div
              flex={1}
              bgMode="cover"
              bgImg={{
                uri: image,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </Carousel>
  );
};
