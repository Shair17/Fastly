import React, {useEffect, useState} from 'react';
// import {ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Icon, Text, ScrollDiv, Image} from 'react-native-magnus';
import {HomeStackParamList} from '../HomeController';
// import {useFavoritesStore} from '@fastly/stores/useFavoritesStore';
import {useCartStore} from '@fastly/stores/useCartStore';
import useAxios from 'axios-hooks';
import {Product} from '@fastly/interfaces/app';
import {HomeHeaderScreen} from '@fastly/components/organisms/HeaderScreen';
import {TouchableOpacity} from 'react-native';
import {LoadingScreen} from '@fastly/navigation/screens/LoadingScreen';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Button} from '@fastly/components/atoms/Button';

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

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Product'> {}

export const ProductScreen: React.FC<Props> = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const id = route.params.id;
  const [
    {error: productError, loading: productIsLoading, data: product},
    refetchProduct,
  ] = useAxios<Product>(`/products/${id}`, {
    useCache: false,
  });
  const addToCart = useCartStore(s => s.addToCart);

  const handleAddToCart = () => {
    setIsLoading(true);
    addToCart(product?.id!)
      .then(() => {
        Notifier.showNotification({
          title: 'Éxito',
          description: 'Se agrego ' + product?.name + ' al carrito.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success',
          },
        });
        setIsLoading(false);
      })
      .catch(() => {
        Notifier.showNotification({
          title: 'Error',
          description: 'Ocurrió un error al procesar tu solicitud',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!id || productError) {
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
  }, [id, productError, navigation]);

  if (productIsLoading) {
    return (
      <Div flex={1} bg="body">
        <Header name="Cargando..." onPress={() => navigation.goBack()} />

        <LoadingScreen />
      </Div>
    );
  }

  return (
    <Div flex={1} bg="body">
      <Header name={product?.name!} onPress={() => navigation.goBack()} />

      <ScrollDiv p="2xl">
        <Div alignItems="center" justifyContent="center">
          <Div w={300} h={300} shadow="xs" rounded="md">
            <Image
              rounded="md"
              flex={1}
              source={{
                uri: product?.image,
              }}
            />
          </Div>
        </Div>
        <Div mt="lg">
          <Text
            fontWeight="bold"
            color="primary"
            fontSize="6xl"
            textAlign="center">
            {product?.name}
          </Text>
          <Text
            fontWeight="500"
            color="gray500"
            fontSize="lg"
            mt="xs"
            textAlign="center">
            {product?.description || 'Este producto no tiene descripción'}
          </Text>
          <Text fontWeight="500" color="gray500" fontSize="xs" mt="lg">
            ID del negocio: {product?.storeId}
          </Text>
        </Div>
        <Div justifyContent="space-between" mt="xl">
          <Button
            fontWeight="bold"
            block
            h={60}
            loading={isLoading}
            suffix={
              <Icon
                name="cart"
                fontSize="xl"
                fontFamily="Ionicons"
                color="white"
                ml="sm"
              />
            }
            onPress={handleAddToCart}>
            Agregar al carrito
          </Button>
          <Button
            fontWeight="bold"
            block
            mt="xl"
            h={60}
            suffix={
              <Icon
                name="heart"
                fontSize="xl"
                fontFamily="Ionicons"
                color="white"
                ml="sm"
              />
            }>
            Agregar a favoritos
          </Button>
        </Div>
      </ScrollDiv>
    </Div>
  );
};
