import React, {useState} from 'react';
import {Avatar, Div, Icon, Radio, Text} from 'react-native-magnus';
import {ProfileStackProps} from '@fastly/navigation/stacks/profile';
import useAxios from 'axios-hooks';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ProfileInformationSchema} from '@fastly/schemas/profile';
import {Vehicle} from '@fastly/interfaces/app';
import {ContainerWithKeyboardAvoidingView} from '@fastly/components/templates/ContainerWithKeyboardAvoidingView';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Button} from '@fastly/components/atoms/Button';
import {Input} from '@fastly/components/atoms/Input';

type VehicleDataItem = {
  displayName: string;
  vehicle: Vehicle;
};

const vehicleData: VehicleDataItem[] = [
  {
    displayName: 'Bicicleta',
    vehicle: 'BICICLETA',
  },
  {
    displayName: 'Carro',
    vehicle: 'CARRO',
  },
  {
    displayName: 'Moto',
    vehicle: 'MOTO',
  },
  {
    displayName: 'Pie',
    vehicle: 'PIE',
  },
  {
    displayName: 'Ninguno',
    vehicle: 'NONE',
  },
];

interface PersonalInformationType {
  email: string;
  name: string;
  address: string;
  phone: string;
}

export const ProfileController: React.FC<ProfileStackProps> = () => {
  const [image, setImage] = useState<ImagePickerResponse>();
  const userPickedAvatar = image !== undefined && image?.assets !== undefined;
  const [{loading}, executeEditProfile] = useAxios(
    {url: '/dealers/me', method: 'PUT'},
    {manual: true},
  );

  const email = useDealerStore(d => d.email);
  const name = useDealerStore(d => d.name);
  const avatar = useDealerStore(d => d.avatar);
  const address = useDealerStore(d => d.address);
  const phone = useDealerStore(d => d.phone);
  const vehicle = useDealerStore(d => d.vehicle);

  const [vehicleState, setVehicle] = useState<Vehicle>(vehicle);

  const fetchDealer = useDealerStore(d => d.fetchDealer);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalInformationType>({
    resolver: zodResolver(ProfileInformationSchema),
    defaultValues: {
      address,
      email,
      name,
      phone,
    },
  });

  const handleChangeAvatar = () => {
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (!response.assets) {
          return;
        }

        setImage(response);
      },
    );
  };
  const handleRemoveAvatar = () => {
    setImage(undefined);
  };
  const handleChangeAvatarInfo = () => {
    Notifier.showNotification({
      title: 'Personaliza tu avatar',
      description: 'Toca el avatar para elegir uno desde tu galería.',
      Component: NotifierComponents.Notification,
    });
  };

  const avatarImage = userPickedAvatar
    ? {uri: image?.assets![0].uri}
    : {uri: avatar};

  const handleEditProfile = handleSubmit(({address, email, name, phone}) => {
    executeEditProfile({
      data: {
        avatar:
          image !== undefined && image?.assets !== undefined
            ? `data:image/jpg;base64,${image.assets[0].base64}`
            : undefined,
        email,
        phone,
        address,
        name,
        vehicle: vehicleState,
      },
    })
      .then(response => {
        if (response.data.modified) {
          fetchDealer();
        }
        Notifier.showNotification({
          title: 'Perfil Actualizado',
          description: 'Tu perfil ha sido actualizado correctamente.',
          Component: NotifierComponents.Notification,
        });
      })
      .catch(e => {
        console.log(e?.response?.data.message);
      });
  });

  return (
    <ContainerWithKeyboardAvoidingView>
      <Div p="2xl">
        <Div justifyContent="center" alignItems="center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleChangeAvatar}
            onLongPress={handleChangeAvatarInfo}>
            {userPickedAvatar && (
              <Button
                bg="red"
                right={0}
                top={2}
                w={28}
                h={28}
                p={0}
                zIndex={9}
                borderWidth={2}
                borderColor="white"
                rounded="circle"
                position="absolute"
                onPress={handleRemoveAvatar}>
                <Icon
                  fontFamily="Ionicons"
                  name="close"
                  color="white"
                  fontSize="xl"
                />
              </Button>
            )}
            <Div
              borderWidth={!userPickedAvatar ? 2 : 0}
              borderColor={!userPickedAvatar ? 'gray100' : undefined}
              w={120}
              h={120}
              rounded="circle">
              <Avatar
                size={116}
                rounded="circle"
                bg="gray100"
                source={avatarImage}
              />
            </Div>
          </TouchableOpacity>
        </Div>

        <Div my="lg" />

        <Div mb="lg">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Nombre(s) y Apellidos"
                keyboardType="default"
                fontSize="lg"
                prefix={<Icon fontFamily="Ionicons" name="person" />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                borderColor={errors.name ? 'red' : 'gray400'}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text color="red" mt={2} fontWeight="500">
              Tus nombre(s) y apellidos es inválido
            </Text>
          )}

          <Div my="md" />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Correo electrónico"
                keyboardType="email-address"
                fontSize="lg"
                prefix={<Icon fontFamily="Ionicons" name="mail" />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                borderColor={errors.email ? 'red' : 'gray400'}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text color="red" mt={2} fontWeight="500">
              Tu correo electrónico es inválido
            </Text>
          )}

          <Div my="md" />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Dirección"
                keyboardType="default"
                fontSize="lg"
                prefix={<Icon fontFamily="Ionicons" name="location" />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                borderColor={errors.address ? 'red' : 'gray400'}
              />
            )}
            name="address"
          />
          {errors.address && (
            <Text color="red" mt={2} fontWeight="500">
              Tu dirección es inválida
            </Text>
          )}

          <Div my="md" />

          <Controller
            control={control}
            rules={{
              maxLength: 9,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Número de Celular"
                keyboardType="number-pad"
                fontSize="lg"
                maxLength={9}
                prefix={<Icon fontFamily="Ionicons" name="phone-portrait" />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                borderColor={errors.phone ? 'red' : 'gray400'}
              />
            )}
            name="phone"
          />
          {errors.phone && (
            <Text color="red" mt={2} fontWeight="500">
              Tu número de celular es inválido
            </Text>
          )}

          <Div my="md" />

          {/**
           * vehicle
           */}
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
              onChange={vehicle => {
                setVehicle(vehicle);
              }}
              defaultValue={vehicle}>
              {vehicleData.map((item, key) => (
                <Radio value={item.vehicle} key={item.vehicle}>
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
                      mr={key === vehicleData.length - 1 ? 0 : 'md'}
                      shadow="xs"
                      rounded="circle">
                      <Text
                        color={checked ? 'white' : 'gray800'}
                        fontSize="sm"
                        ml="xs"
                        fontWeight="bold">
                        {item.displayName}
                      </Text>
                    </Div>
                  )}
                </Radio>
              ))}
            </Radio.Group>
          </ScrollView>

          <Div my="md" />
        </Div>

        <Div my="md" />

        <Button
          block
          shadow="xs"
          fontWeight="bold"
          fontSize="2xl"
          h={50}
          onPress={handleEditProfile}
          loading={loading}>
          Guardar
        </Button>

        <Div my="2xl" />
      </Div>
    </ContainerWithKeyboardAvoidingView>
  );
};
