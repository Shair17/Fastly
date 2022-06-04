import React, {FC, useRef, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Div, Text, Icon, Radio} from 'react-native-magnus';
import {ActivityIndicator} from '../../components/atoms/ActivityIndicator';
import {AskLocationScreenProps} from '../../navigation/screens/AskLocationScreen';
import {defaultTags, TagType} from './defaultTags';
import {useForm, Controller} from 'react-hook-form';
import {useAuthStore} from '../../stores/useAuthStore';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../../hooks/useLocation';
import {Button} from '../../components/atoms/Button';
import {RetryPhoneGPS} from '../../components/molecules/RetryPhoneGPS';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {zodResolver} from '@hookform/resolvers/zod';
import {LocationInformationType} from '../../interfaces/appInterfaces';
import {LocationInformationSchema} from '../../schemas/ask-location.schema';
import {Input} from '../../components/atoms/Input';
import {ContainerWithKeyboardAvoidingView} from '../../components/templates/ContainerWithKeyboardAvoidingView';
import useAxios from 'axios-hooks';

export const AskLocationController: FC<AskLocationScreenProps> = ({
  navigation,
  route: {params},
}) => {
  const [{loading}, executeUpdateNewUser] = useAxios(
    {
      url: '/users/new-user',
      method: 'PUT',
    },
    {manual: true},
  );
  const [showTagError, setTagError] = useState(false);
  const [tag, setTag] = useState<TagType>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm<LocationInformationType>({
    resolver: zodResolver(LocationInformationSchema),
  });
  const {
    hasLocation,
    gpsAccessDenied,
    initialPosition,
    userLocation,
    getCurrentLocation,
    callGetCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  } = useLocation();
  const setIsNewUser = useAuthStore(s => s.setIsNewUser);

  const mapRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  const fillLocationInputs = () => {
    mapRef.current
      ?.addressForCoordinate(userLocation)
      .then(address => {
        const {street, city, zip} = getValues();

        if (!street && !city && !zip) {
          setValue('street', `${address.thoroughfare} ${address.name}`);
          setValue('zip', address.postalCode);
          setValue(
            'city',
            `${address.locality}, ${address.administrativeArea}, ${address.country}`,
          );
        }
      })
      .catch(() => {
        Notifier.showNotification({
          title: 'Error al obtener tu dirección',
          description:
            'No hemos podido autocompletar tu dirección, por favor ingresa tu dirección manualmente.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
            backgroundColor: 'red',
          },
        });
      });
  };

  useEffect(() => {
    fillLocationInputs();
  }, [userLocation]);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;

    const {latitude, longitude} = userLocation;
    mapRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    following.current = true;

    mapRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  const handleFinish = handleSubmit(
    ({name, street, instructions, city, zip}) => {
      if (!tag) {
        setTagError(true);
        return;
      }

      setTagError(false);

      executeUpdateNewUser({
        data: {
          ...params,
          address: {
            name,
            street,
            instructions,
            city,
            zip,
            tag,
            ...userLocation,
          },
        },
      })
        .then(response => {
          if (response.status === 200 && response.data) {
            setIsNewUser(response.data.isNewUser);
          }
        })
        .catch(e => console.log(e?.response?.data.message));
    },
  );

  return (
    <ContainerWithKeyboardAvoidingView>
      <Div flex={1}>
        <Div p="2xl">
          <Div>
            <Text fontWeight="bold" fontSize="6xl" color="text">
              Establece tu primera dirección
            </Text>

            <Div my="md" />

            <Text color="text" textAlign="left" maxW="90%">
              Estás a un paso de disfrutar todos los beneficios que Fastly te
              otorga, solo agrega tu primera dirección para poder continuar.
            </Text>
          </Div>

          <Div my="lg" />

          <Div w="100%" h={180}>
            {gpsAccessDenied ? (
              <RetryPhoneGPS onPress={callGetCurrentLocation} />
            ) : !hasLocation ? (
              <Div flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator />
              </Div>
            ) : (
              <Div flex={1}>
                <MapView
                  ref={el => (mapRef.current = el!)}
                  style={{flex: 1}}
                  provider={PROVIDER_GOOGLE}
                  showsUserLocation
                  initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onTouchStart={() => (following.current = false)}
                />
                <Button
                  position="absolute"
                  bg="rgba(0,0,0,0.5)"
                  rounded="circle"
                  top={10}
                  right={10}
                  onPress={centerPosition}>
                  <Icon
                    fontFamily="Ionicons"
                    name="compass"
                    fontSize="2xl"
                    color="white"
                  />
                </Button>
              </Div>
            )}
          </Div>

          <Div my="lg" />

          <Div mb="lg">
            <Controller
              control={control}
              rules={{
                maxLength: 250,
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Nombre de tu nueva dirección"
                  keyboardType="default"
                  fontSize="lg"
                  maxLength={250}
                  prefix={<Icon fontFamily="Ionicons" name="bookmark" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderColor={!!errors.name ? 'red' : 'gray400'}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text color="red" mt={2} fontWeight="500">
                Nombre de dirección es requerido, ejemplo: Mi Primera Dirección
                en Fastly.
              </Text>
            )}

            <Div my="md" />

            <Controller
              control={control}
              rules={{
                maxLength: 250,
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Tu primera dirección"
                  keyboardType="default"
                  fontSize="lg"
                  maxLength={250}
                  prefix={<Icon fontFamily="Ionicons" name="location" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderColor={!!errors.street ? 'red' : 'gray400'}
                />
              )}
              name="street"
            />
            {errors.street && (
              <Text color="red" mt={2} fontWeight="500">
                La dirección es requerido.
              </Text>
            )}

            <Div my="md" />

            <Controller
              control={control}
              rules={{
                maxLength: 250,
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Instrucción o referencia de tu dirección"
                  keyboardType="default"
                  fontSize="lg"
                  maxLength={250}
                  prefix={<Icon fontFamily="Ionicons" name="ios-map" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderColor={!!errors.instructions ? 'red' : 'gray400'}
                />
              )}
              name="instructions"
            />
            {errors.instructions && (
              <Text color="red" mt={2} fontWeight="500">
                La instrucción o referencia es requerido.
              </Text>
            )}

            <Div my="md" />

            <Controller
              control={control}
              rules={{
                maxLength: 15,
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Código postal de tu dirección"
                  keyboardType="numeric"
                  fontSize="lg"
                  maxLength={15}
                  prefix={<Icon fontFamily="Ionicons" name="ios-key" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderColor={!!errors.zip ? 'red' : 'gray400'}
                />
              )}
              name="zip"
            />
            {errors.zip && (
              <Text color="red" mt={2} fontWeight="500">
                El código postal es requerido.
              </Text>
            )}

            <Div my="md" />

            <Controller
              control={control}
              rules={{
                maxLength: 250,
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Tu ciudad"
                  keyboardType="default"
                  fontSize="lg"
                  maxLength={250}
                  prefix={
                    <Icon fontFamily="MaterialCommunityIcons" name="city" />
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderColor={!!errors.city ? 'red' : 'gray400'}
                />
              )}
              name="city"
            />
            {errors.city && (
              <Text color="red" mt={2} fontWeight="500">
                La ciudad es requerida.
              </Text>
            )}
          </Div>

          <Div h={50}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              style={{
                flex: 1,
              }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Radio.Group
                row
                onChange={tag => {
                  setTagError(false);
                  setTag(tag);
                }}>
                {defaultTags.map((item, key) => (
                  <Radio value={item.id} key={key.toString()}>
                    {({checked}) => (
                      <Div
                        bg={checked ? 'secondary' : 'white'}
                        borderWidth={1}
                        borderColor={checked ? 'primary' : 'transparent'}
                        row
                        alignItems="center"
                        justifyContent="center"
                        px="lg"
                        py="md"
                        mr={key === defaultTags.length - 1 ? 0 : 'md'}
                        shadow="xs"
                        rounded="circle">
                        <Icon
                          name={item.icon}
                          // @ts-ignore
                          fontFamily={item.iconFontFamily}
                          fontSize="sm"
                          color={checked ? 'white' : 'gray800'}
                        />
                        <Text
                          color={checked ? 'white' : 'gray800'}
                          fontSize="sm"
                          ml="xs"
                          fontWeight="bold">
                          {item.name}
                        </Text>
                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </ScrollView>
          </Div>
          {showTagError && (
            <Text color="red" fontWeight="500">
              Elige una etiqueta para tu dirección.
            </Text>
          )}

          <Div my="lg" />

          <Button
            block
            shadow="xs"
            fontWeight="bold"
            fontSize="2xl"
            loading={loading}
            h={50}
            onPress={handleFinish}>
            Finalizar
          </Button>
        </Div>
      </Div>
    </ContainerWithKeyboardAvoidingView>
  );
};
