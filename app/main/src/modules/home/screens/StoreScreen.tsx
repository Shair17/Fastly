import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Icon, Text, Image, ScrollDiv} from 'react-native-magnus';
import {HomeStackParamList} from '../HomeController';
import {HomeHeaderScreen} from '@fastly/components/organisms/HeaderScreen';
import {Product, Store} from '@fastly/interfaces/app';
import useAxios from 'axios-hooks';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {LoadingScreen} from '@fastly/navigation/screens/LoadingScreen';
import {parseCategoryStore} from '@fastly/utils/parseCategoryStore';
import {isString} from '@fastly/utils/isString';
import {format} from 'date-fns';

interface HeaderProps {
  onPress: () => void;
  name: string;
}
const Header: React.FC<HeaderProps> = ({onPress, name}) => (
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
      <Text color="text" fontWeight="bold" fontSize="xl" numberOfLines={1}>
        {name}
      </Text>
    }
  />
);

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Store'> {}

export const StoreScreen: React.FC<Props> = ({navigation, route}) => {
  const id = route.params.id;
  const [skip, setSkip] = useState(0);
  const [
    {error: storeError, loading: storeIsLoading, data: store},
    refetchStore,
  ] = useAxios<Store & {ranking: number}>(`/feed/stores/${id}`, {
    useCache: false,
  });
  const [
    {error: productsError, loading: productsIsLoading, data: products},
    refetchProducts,
  ] = useAxios<Product[]>(`/stores/${id}/products`, {
    useCache: false,
  });

  const isOpenFullTime = !(
    isString(store?.openTime) && isString(store?.closeTime)
  );

  const fetchStore = () => {
    refetchStore();
  };

  useEffect(() => {
    if (!id || storeError || productsError) {
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
  }, [id, storeError, productsError, navigation]);

  // if (!storeError && !store && !productsError && !products) {
  if (storeIsLoading || productsIsLoading) {
    return (
      <Div flex={1} bg="body">
        <Header name="Cargando..." onPress={() => navigation.goBack()} />

        <LoadingScreen />
      </Div>
    );
  }

  return (
    <Div flex={1} bg="body">
      <Header name={store?.name!} onPress={() => navigation.goBack()} />

      <ScrollDiv p="2xl">
        <Div row>
          <Div w={150} h={150} shadow="sm" rounded="circle">
            <Image
              rounded="circle"
              flex={1}
              source={{
                uri: store?.logo,
              }}
            />
          </Div>
          <Div flex={1} ml="md" justifyContent="space-evenly">
            <Text
              fontWeight="bold"
              color="primary"
              fontSize="2xl"
              numberOfLines={1}>
              {store?.name}
            </Text>
            <Text fontWeight="500" color="gray500" fontSize="lg" mt="xs">
              {parseCategoryStore(store?.category || '')}
            </Text>
            <Text fontWeight="400" color="gray500" fontSize="md" mt="xs">
              {store?.address}
            </Text>
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
                  {store?.ranking}
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
                        new Date(store?.openTime!),
                        "hh:mmaaaaa'm'",
                      )} - ${format(
                        new Date(store?.closeTime!),
                        "hh:mmaaaaa'm'",
                      )}`}
                </Text>
              </Div>
            </Div>
          </Div>
        </Div>

        {/** Separator */}
        <Div my="2xl" bg="gray200" w="100%" h={1} />

        <Div>
          {products!.length > 0 ? (
            products?.map((product, key) => (
              <TouchableOpacity
                key={product.id}
                activeOpacity={0.95}
                onPress={() => {
                  navigation.navigate('Product', {
                    id: product.id,
                  });
                }}
                style={{marginBottom: 32, height: 400}}>
                <Div
                  bg="body"
                  flex={1}
                  rounded="lg"
                  borderWidth={1}
                  borderColor="gray100"
                  p="lg"
                  shadow="xs">
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
            ))
          ) : (
            <Text>No se encontraron productos :(</Text>
          )}
          <Div py="2xl" />
        </Div>
      </ScrollDiv>
    </Div>
  );
};
