import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Div, Text, Button, Input, Icon} from 'react-native-magnus';
import {ForgotPasswordScreenProps} from '@fastly/navigation/screens/ForgotPasswordScreen';
import {useForm, Controller} from 'react-hook-form';
import {
  ForgotPasswordBody,
  ForgotPasswordResponse,
  ForgotPasswordType,
} from '@fastly/interfaces/app';
import {zodResolver} from '@hookform/resolvers/zod';
import {ForgotPasswordSchema} from '@fastly/schemas/forgot-password';
import useAxios from 'axios-hooks';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {getForgotPasswordErrorMessage} from '@fastly/utils/getErrorMessage';

export const ForgotPasswordController: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const [{loading}, executeDealerForgotPassword] = useAxios<
    ForgotPasswordResponse,
    ForgotPasswordBody
  >(
    {
      url: '/auth/dealer/forgot-password',
      method: 'PUT',
    },
    {manual: true},
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: route.params?.email,
    },
  });

  const handleFinish = handleSubmit(({email}) => {
    executeDealerForgotPassword({
      data: {email},
    })
      .then(response => {
        const {message, statusCode, success} = response.data;

        if (success && statusCode === 200 && message) {
          Notifier.showNotification({
            title: 'Recuperación de Contraseña',
            description: message,
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'success',
            },
            duration: 5000,
          });
        } else {
          Notifier.showNotification({
            title: 'Error!',
            description: 'Ha ocurrido un error inesperado',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
            duration: 5000,
          });
        }
      })
      .catch(error => {
        if (error?.response?.data.message) {
          Notifier.showNotification({
            title: 'Error!',
            description: getForgotPasswordErrorMessage(
              error.response.data.message,
            ),
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
          });
        }
      });
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
        <Div flex={1} bg="body">
          <Div flex={1} p="2xl">
            <Div flex={4}>
              <Div>
                <Text fontWeight="bold" color="text" fontSize="4xl">
                  ¿Olvidaste tu contraseña?
                </Text>
                <Text mt="lg" fontSize="md" color="gray700">
                  No te preocupes, ingresa el correo asociado a tu cuenta de
                  Fastly para Repartidores. Si es válido, te enviaremos un
                  correo electrónico de restablecimiento de contraseña.
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
                      keyboardType="email-address"
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
              </Div>
            </Div>
            <Div flex={2} justifyContent="flex-end">
              <Button
                fontWeight="600"
                block
                rounded="lg"
                fontSize="xl"
                h={55}
                loading={loading}
                bg="primary"
                onPress={handleFinish}
                shadow="sm">
                Enviar
              </Button>

              <Div my="xl" />

              <Div alignItems="center">
                <Text fontSize="xs" color="gray700">
                  ¿Ya recuperaste tu contraseña?{' '}
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
