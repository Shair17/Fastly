import React, {FC, Fragment} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import Pinar from 'pinar';
import {Div, Text} from 'react-native-magnus';
import TextTicker from 'react-native-text-ticker';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {StoreCategory, StoreCategoryEnum} from '@fastly/interfaces/app';

interface Props {
  navigation: any;
}

interface Service {
  items: {
    itemService: {
      id: string;
      title: string;
      img: any;
      bgColor: string;
      borderColor: string;
      isEmpty?: boolean;
      category?: StoreCategory;
    }[];
  }[];
}

const services: Service[] = [
  {
    items: [
      {
        itemService: [
          {
            id: StoreCategoryEnum.LICORERIA,
            title: 'Licorería',
            img: require('../../assets/images/objects/liqueur.png'),
            bgColor: 'green100',
            borderColor: 'green300',
            category: 'LICORERIA',
          },
          {
            id: StoreCategoryEnum.RESTAURANTE,
            title: 'Restaurante',
            img: require('../../assets/images/objects/hamburger.png'),
            bgColor: 'yellow100',
            borderColor: 'yellow300',
            category: 'RESTAURANTE',
          },
          {
            id: StoreCategoryEnum.MASCOTAS,
            title: 'Mascotas',
            img: require('../../assets/images/objects/croquettes.png'),
            bgColor: 'slate100',
            borderColor: 'slate300',
            category: 'MASCOTAS',
          },
        ],
      },
      {
        itemService: [
          {
            id: StoreCategoryEnum.MODA,
            title: 'Moda',
            img: require('../../assets/images/objects/fashion.png'),
            bgColor: 'sky100',
            borderColor: 'sky300',
            category: 'MODA',
          },
          {
            id: StoreCategoryEnum.TECNOLOGIA,
            title: 'Tecnología',
            img: require('../../assets/images/objects/computer.png'),
            bgColor: 'cyan100',
            borderColor: 'cyan300',
            category: 'TECNOLOGIA',
          },
          {
            id: StoreCategoryEnum.JUGUETERIA,
            title: 'Juguetería',
            img: require('../../assets/images/objects/ball.png'),
            bgColor: 'amber100',
            borderColor: 'amber300',
            category: 'JUGUETERIA',
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        itemService: [
          {
            id: StoreCategoryEnum.FARMACIA,
            title: 'Farmacia',
            img: require('../../assets/images/objects/pharmacy.png'),
            bgColor: 'red100',
            borderColor: 'red300',
            category: 'FARMACIA',
          },
          {
            id: StoreCategoryEnum.CUIDADO_PERSONAL,
            title: 'Cuidado Personal',
            img: require('../../assets/images/objects/personal-care.png'),
            bgColor: 'amber100',
            borderColor: 'amber300',
            category: 'CUIDADO_PERSONAL',
          },
          {
            id: StoreCategoryEnum.MAQUILLAJE,
            title: 'Maquillaje',
            img: require('../../assets/images/objects/make-up.png'),
            bgColor: 'pink100',
            borderColor: 'pink300',
            category: 'MAQUILLAJE',
          },
        ],
      },
      {
        itemService: [
          {
            id: 'TODO_LO_QUE_QUIERAS',
            title: 'Todo lo que quieras',
            img: require('../../assets/images/objects/everything-you-want.png'),
            bgColor: 'indigo100',
            borderColor: 'indigo300',
          },
          {
            id: 'ENCARGOS',
            title: 'Encargos',
            img: require('../../assets/images/objects/box-order.png'),
            bgColor: 'yellow100',
            borderColor: 'yellow300',
          },
          // This will be ignored
          {
            id: 'UNKNOWN',
            bgColor: 'blue100',
            borderColor: 'blue300',
            img: require('../../assets/images/objects/box-order.png'),
            title: 'test',
            isEmpty: true,
          },
        ],
      },
    ],
  },
];

export const ServicesCarousel: FC<Props> = ({navigation}) => {
  return (
    <Div mb="lg">
      <Pinar
        bounces
        showsDots={false}
        showsVerticalScrollIndicator
        showsHorizontalScrollIndicator
        height={250}
        showsControls={false}>
        {services.map(({items}, key) => (
          <Div flex={1} key={key.toString()}>
            {items.map(({itemService}, key) => (
              <Div flex={3} row key={key.toString()}>
                {itemService.map(
                  (
                    {id, category, title, bgColor, borderColor, img, isEmpty},
                    key,
                  ) => (
                    <TouchableNativeFeedback
                      onPress={() => {
                        // jajasjd esto está muy profundo XD
                        if (id === 'TODO_LO_QUE_QUIERAS' || id === 'ENCARGOS') {
                          Notifier.showNotification({
                            title: 'Información',
                            description:
                              'Este servicio estará disponible en la siguiente versión de Fastly!',
                            Component: NotifierComponents.Alert,
                            componentProps: {
                              alertType: 'info',
                            },
                          });
                          return;
                        }

                        navigation.navigate('HomeStack', {
                          screen: 'Category',
                          params: {
                            category,
                          },
                        });
                      }}
                      key={key.toString()}
                      disabled={isEmpty}>
                      <Div flex={2} justifyContent="center" alignItems="center">
                        {!isEmpty ? (
                          <Fragment>
                            <Div
                              w={70}
                              h={70}
                              bg={bgColor}
                              rounded="circle"
                              borderWidth={2}
                              borderColor={borderColor}>
                              <Div flex={1} bgImg={img} bgMode="contain" />
                            </Div>
                            <TextTicker
                              duration={5000}
                              loop
                              bounce
                              style={{marginTop: 4}}>
                              <Text fontWeight="600">{title}</Text>
                            </TextTicker>
                          </Fragment>
                        ) : null}
                      </Div>
                    </TouchableNativeFeedback>
                  ),
                )}
              </Div>
            ))}
          </Div>
        ))}
      </Pinar>
    </Div>
  );
};
