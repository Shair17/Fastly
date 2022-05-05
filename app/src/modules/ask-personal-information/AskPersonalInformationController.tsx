import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Image, Text, Icon} from 'react-native-magnus';
import {Button} from '../../components/atoms/Button';
import {Input} from '../../components/atoms/Input';
import {ContainerWithKeyboardAvoidingView} from '../../components/templates/ContainerWithKeyboardAvoidingView';
import {AskPersonalInformationScreenProps} from '../../navigation/screens/AskPersonalInformationScreen';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

const avatarPlaceholderImage = require('../../assets/images/avatar-placeholder.jpg');

type PersonalInformationType = {
  phone: string;
  dni: string;
};

const schema = z.object({
  phone: z
    .string()
    .max(9)
    .regex(/^[9]\d{8}$/),
  dni: z.string().max(8),
});

export const AskPersonalInformationController: FC<
  AskPersonalInformationScreenProps
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalInformationType>({
    resolver: zodResolver(schema),
  });

  // const onSubmit = handleSubmit(data => {
  //   console.log(data);
  //   navigation.navigate('AskLocationScreen');
  // });

  const onSubmit = () => {
    // actualizar isNewUser boolean to true
    console.log('finish');
  };

  return (
    <ContainerWithKeyboardAvoidingView>
      <Div flex={1}>
        <Div p="2xl">
          <Div>
            <Text fontWeight="bold" fontSize="6xl" color="text">
              Completa tu perfil para comenzar
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
              onPress={() => console.log('user press avatar picture')}
              onLongPress={() => console.log('user longpress avatar picture')}>
              <Div shadow="sm" w={120} h={120} rounded="circle">
                <Image
                  flex={1}
                  rounded="circle"
                  borderColor="#fff"
                  borderWidth={4}
                  source={avatarPlaceholderImage}
                />
              </Div>
            </TouchableOpacity>
          </Div>

          <Div my="lg" />

          <Div mb="lg">
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
                />
              )}
              name="phone"
            />
            {errors.phone && <Text>This is required.</Text>}

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
                />
              )}
              name="dni"
            />
            {errors.dni && <Text>This is required.</Text>}

            <Div my="md" />
          </Div>

          <Div my="md" />

          <Button
            block
            shadow="xs"
            fontWeight="bold"
            fontSize="2xl"
            onPress={onSubmit}>
            Finalizar
          </Button>

          <Div my="2xl" />
        </Div>
      </Div>
    </ContainerWithKeyboardAvoidingView>
  );
};
