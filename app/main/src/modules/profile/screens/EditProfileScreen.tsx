import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text, Icon, Avatar} from 'react-native-magnus';
import {HeaderScreen} from '../../../components/organisms/HeaderScreen';
import {ContainerWithKeyboardAvoidingView} from '../../../components/templates/ContainerWithKeyboardAvoidingView';
import {useUserStore} from '../../../stores/useUserStore';
import {ProfileStackParams} from '../ProfileStackParams.type';
import {Controller} from 'react-hook-form';
import {useEditProfile} from '../../../hooks/useEditProfile';
import {Button} from '../../../components/atoms/Button';
import {Input} from '../../../components/atoms/Input';
import useAxios from 'axios-hooks';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'EditProfile'> {}

export const EditProfileScreen: FC<Props> = ({navigation}) => {
  const [{loading}, executeEditProfile] = useAxios(
    {url: '/users/me', method: 'PUT'},
    {manual: true},
  );

  const name = useUserStore(s => s.name);
  const dni = useUserStore(s => s.dni);
  const email = useUserStore(s => s.email);
  const phone = useUserStore(s => s.phone);
  const avatar = useUserStore(s => s.avatar);

  const fetchUser = useUserStore(s => s.fetchUser);

  const {
    image,
    control,
    errors,
    userPickedAvatar,
    handleChangeAvatar,
    handleChangeAvatarInfo,
    handleChangeNameInfo,
    handleRemoveAvatar,
    handleSubmit,
  } = useEditProfile({
    dni,
    email,
    phone,
  });

  const avatarImage = userPickedAvatar
    ? {uri: image?.assets![0].uri}
    : {uri: avatar};

  const goBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = handleSubmit(({email, phone, dni}) => {
    executeEditProfile({
      data: {
        avatar:
          image !== undefined && image?.assets !== undefined
            ? `data:image/jpg;base64,${image.assets[0].base64}`
            : undefined,
        email,
        phone,
        dni,
      },
    })
      .then(response => {
        if (response.status === 200 && response.data) {
          if (response.data.modified) {
            fetchUser();
          }
          goBack();
        }
      })
      .catch(e => {
        console.log(e?.response?.data.message);
      });
  });

  return (
    <ContainerWithKeyboardAvoidingView>
      <HeaderScreen
        left={
          <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
            <Icon
              fontFamily="Ionicons"
              name="arrow-back"
              fontSize="xl"
              color="text"
            />
          </TouchableOpacity>
        }
        middle={
          <Text fontWeight="bold" fontSize="xl">
            Editar Perfil
          </Text>
        }
      />
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
          <TouchableOpacity onPress={handleChangeNameInfo} activeOpacity={1}>
            <Input
              placeholder="Correo electrónico"
              keyboardType="email-address"
              fontSize="lg"
              prefix={
                <Icon color="gray300" fontFamily="Ionicons" name="happy" />
              }
              value={name}
              borderColor="gray300"
              color="gray300"
              editable={false}
              focusable={false}
            />
          </TouchableOpacity>
        </Div>

        <Div mb="lg">
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
                borderColor={!!errors.email ? 'red' : 'gray400'}
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
                borderColor={!!errors.phone ? 'red' : 'gray400'}
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

          <Controller
            control={control}
            rules={{
              maxLength: 8,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Número de DNI"
                keyboardType="number-pad"
                fontSize="lg"
                maxLength={8}
                prefix={<Icon fontFamily="Ionicons" name="person" />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                borderColor={!!errors.dni ? 'red' : 'gray400'}
              />
            )}
            name="dni"
          />
          {errors.dni && (
            <Text color="red" mt={2} fontWeight="500">
              Tu DNI es inválido
            </Text>
          )}
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
