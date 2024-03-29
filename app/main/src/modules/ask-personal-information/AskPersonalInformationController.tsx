import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon, Avatar} from 'react-native-magnus';
import {Controller} from 'react-hook-form';
import {useEditProfile} from '@fastly/hooks/useEditProfile';
import {Button} from '@fastly/components/atoms/Button';
import {Input} from '@fastly/components/atoms/Input';
import {ContainerWithKeyboardAvoidingView} from '@fastly/components/templates/ContainerWithKeyboardAvoidingView';
import {AskPersonalInformationScreenProps} from '@fastly/navigation/screens/AskPersonalInformationScreen';

const avatarPlaceholderImage = require('../../assets/images/avatar-placeholder.jpg');

export const AskPersonalInformationController: FC<
  AskPersonalInformationScreenProps
> = ({navigation}) => {
  const {
    image,
    handleSubmit,
    control,
    errors,
    handleChangeAvatar,
    handleChangeAvatarInfo,
    handleRemoveAvatar,
    userPickedAvatar,
  } = useEditProfile();

  const avatarImage =
    image !== undefined && image?.assets !== undefined
      ? {uri: image.assets[0].uri}
      : avatarPlaceholderImage;

  const handleNext = handleSubmit(({email, phone, dni}) => {
    navigation.navigate('AskLocationScreen', {
      avatar:
        image !== undefined && image?.assets !== undefined
          ? `data:image/jpg;base64,${image.assets[0].base64}`
          : undefined,
      email,
      phone,
      dni,
    });
  });

  return (
    <ContainerWithKeyboardAvoidingView>
      <Div flex={1}>
        <Div p="2xl">
          <Div>
            <Text fontWeight="bold" fontSize="6xl" color="text">
              Completa tu perfil para continuar
            </Text>

            <Div my="md" />

            <Text color="text" textAlign="left" maxW="90%">
              Te pedimos estos datos para mejorar tu experiencia de usuario.
              Prometemos no compartirlos con nadie.
            </Text>
          </Div>

          <Div my="lg" />

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
                  borderColor={errors.dni ? 'red' : 'gray400'}
                />
              )}
              name="dni"
            />
            {errors.dni && (
              <Text color="red" mt={2} fontWeight="500">
                Tu DNI es inválido
              </Text>
            )}

            <Div my="md" />
          </Div>

          <Div my="md" />

          <Button
            block
            shadow="xs"
            fontWeight="bold"
            fontSize="2xl"
            onPress={handleNext}>
            Continuar
          </Button>

          <Div my="2xl" />
        </Div>
      </Div>
    </ContainerWithKeyboardAvoidingView>
  );
};
