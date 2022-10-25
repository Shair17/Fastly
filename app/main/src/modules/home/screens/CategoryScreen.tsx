import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Icon, Text, Image} from 'react-native-magnus';
import {HomeStackParamList} from '../HomeController';
import {Store, StoreCategory} from '@fastly/interfaces/app';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import useAxios from 'axios-hooks';
import {HomeHeaderScreen} from '@fastly/components/organisms/HeaderScreen';
import {parseCategoryStore} from '@fastly/utils/parseCategoryStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from '@fastly/components/atoms/Button';
import {ActivityIndicator} from '@fastly/components/atoms/ActivityIndicator';
import {CategoryStoreItem} from '../components/CategoryStoreItem';
import {LoadingScreen} from '@fastly/navigation/screens/LoadingScreen';

interface Props
  extends NativeStackScreenProps<HomeStackParamList, 'Category'> {}

const categories: StoreCategory[] = [
  'LICORERIA',
  'RESTAURANTE',
  'MASCOTAS',
  'MODA',
  'TECNOLOGIA',
  'JUGUETERIA',
  'FARMACIA',
  'CUIDADO_PERSONAL',
  'MAQUILLAJE',
  'FLORISTERIA',
  'TIENDA',
  'SUPERMERCADOS',
  'LIBRERIA',
  'JUGUERIA',
  'OTRO',
];

interface HeaderProps {
  onPress: () => void;
  category: string;
}
const Header: React.FC<HeaderProps> = ({onPress, category}) => (
  <HomeHeaderScreen
    left={
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Icon
          fontFamily="Ionicons"
          name="arrow-back"
          fontSize="xl"
          color="text"
        />
      </TouchableOpacity>
    }
    middle={
      <Text color="text" fontWeight="bold" fontSize="xl">
        {parseCategoryStore(category)}
      </Text>
    }
  />
);

type FeedStore = Store & {
  ranking: {
    value: number;
    size: number;
  };
};

export const CategoryScreen: React.FC<Props> = ({navigation, route}) => {
  const [skip, setSkip] = useState(0);
  const category = route.params.category;
  const [{error, loading, data: stores}, refetchStoresForCategory] = useAxios<
    FeedStore[]
  >(
    `/feed/stores-by-category?category=${category}&take=10&skip=${skip}&orderBy=desc`,
  );

  const fetchStores = () => {
    refetchStoresForCategory();
  };

  useEffect(() => {
    // ´category´ isn't in categories
    if (!categories.includes(category)) {
      Notifier.showNotification({
        title: 'Alerta',
        description: 'No existe lo que estás buscando.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'warn',
        },
      });
      navigation.goBack();
    }
  }, [category, navigation]);

  if (!error && !stores) {
    return (
      <Div flex={1} bg="body">
        <Header category={category} onPress={() => navigation.goBack()} />

        <LoadingScreen />
      </Div>
    );
  }

  return (
    <Div flex={1} bg="body">
      <Header category={category} onPress={() => navigation.goBack()} />

      <FlatList
        style={{
          width: '100%',
        }}
        data={stores}
        renderItem={({index, item, separators}) => {
          return (
            <Div mb="xl" px="2xl">
              <CategoryStoreItem {...item} />
            </Div>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <Div p="2xl">
              <Div>
                <Text color="text" mb="lg" fontWeight="bold" fontSize="4xl">
                  Negocios en la categoría:{' '}
                  <Text
                    color="secondary"
                    mb="lg"
                    fontWeight="bold"
                    fontSize="4xl">
                    {parseCategoryStore(category)}
                  </Text>
                </Text>
              </Div>
            </Div>
          );
        }}
        ListFooterComponent={() => {
          if (stores?.length === 0) return null;

          return (
            <Div
              bg="body"
              flex={1}
              alignItems="center"
              justifyContent="center"
              mt="lg"
              mb="xl">
              {loading ? (
                <Div alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                  <Text mt="sm">Cargando...</Text>
                </Div>
              ) : null}

              {/** noMoreReviews */}
              {false ? (
                <Text fontWeight="600" fontSize="lg">
                  Haz llegado al final.
                </Text>
              ) : null}
            </Div>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Div flex={1} px="2xl">
              <Text fontWeight="500" fontSize="2xl">
                No hay negocios en la categoría de{' '}
                {parseCategoryStore(category)}
              </Text>
              <Button
                mt="xl"
                fontWeight="600"
                block
                loading={loading}
                h={55}
                onPress={fetchStores}>
                Recargar
              </Button>
            </Div>
          );
        }}
        onEndReachedThreshold={0.2}
        onEndReached={undefined}
      />
    </Div>
  );
};
