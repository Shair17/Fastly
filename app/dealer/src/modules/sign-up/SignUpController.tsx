import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Div, Text, Button, Input, Icon} from 'react-native-magnus';
import {SignUpScreenProps} from '@fastly/navigation/screens/SignUpScreen';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignUpSchema} from '@fastly/schemas/sign-up';
import {SignUpType} from '@fastly/interfaces/app';

export const SignUpController: React.FC<SignUpScreenProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const handleFinish = handleSubmit(
    ({
      address,
      birthDate,
      confirmPassword,
      dni,
      email,
      fullName,
      password,
      phone,
    }) => {
      console.log({
        address,
        birthDate,
        confirmPassword,
        dni,
        email,
        fullName,
        password,
        phone,
      });
    },
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
        <Div flex={1} bg="body">
          <Div flex={1} p="2xl">
            <Div flex={4}>
              <Div>
                <Text fontWeight="bold" color="text" fontSize="5xl">
                  Crear una Cuenta
                </Text>
                <Text mt="lg" fontSize="md" color="gray700">
                  Empieza creando una cuenta en Fastly para Repartidores.
                </Text>
              </Div>

              <Div mt="2xl">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      bg="body"
                      color="text"
                      focusBorderColor="primary"
                      fontWeight="500"
                      placeholder="Correo electrónico"
                      rounded="lg"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      borderColor={errors.email ? 'red' : 'gray400'}
                      prefix={
                        <Icon name="mail" color="text" fontFamily="Ionicons" />
                      }
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text color="red" mt={2} fontWeight="500">
                    Correo electrónico es requerido, ejemplo: ejemplo@email.com.
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
                      bg="body"
                      color="text"
                      focusBorderColor="primary"
                      fontWeight="500"
                      placeholder="Contraseña"
                      secureTextEntry
                      rounded="lg"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      borderColor={errors.password ? 'red' : 'gray400'}
                      prefix={
                        <Icon
                          name="lock-closed"
                          color="text"
                          fontFamily="Ionicons"
                        />
                      }
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text color="red" mt={2} fontWeight="500">
                    Contraseña inválida, mínimo ocho caracteres, al menos una
                    letra mayúscula, una letra minúscula, un número y un
                    carácter especial.
                  </Text>
                )}
              </Div>
            </Div>
            <Div flex={2} justifyContent="flex-end">
              <Button
                fontWeight="600"
                block
                rounded="lg"
                fontSize="xl"
                h={55}
                bg="primary"
                onPress={handleFinish}>
                Crear una Cuenta
              </Button>

              <Div my="xl" />

              <Div alignItems="center">
                <Text fontSize="xs" color="gray700">
                  ¿Ya tienes una cuenta?{' '}
                  <Text
                    color="primary"
                    fontSize="xs"
                    onPress={() => navigation.replace('SignInScreen')}>
                    Iniciar Sesión
                  </Text>
                  .
                </Text>
              </Div>
            </Div>
          </Div>
        </Div>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
