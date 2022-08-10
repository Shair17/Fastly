import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Div, Text, Button, Input, Icon} from 'react-native-magnus';
import {SignInScreenProps} from '@fastly/navigation/screens/SignInScreen';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignInSchema} from '@fastly/schemas/sign-in';
import {SignInBody, SignInResponse, SignInType} from '@fastly/interfaces/app';
import useAxios from 'axios-hooks';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {getLoginErrorMessage} from '@fastly/utils/getErrorMessage';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export const SignInController: React.FC<SignInScreenProps> = ({navigation}) => {
  const [{loading}, executeSignInDealer] = useAxios<SignInResponse, SignInBody>(
    {
      url: '/auth/dealer/login',
      method: 'POST',
    },
    {manual: true},
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    getValues,
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
  });
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const togglePasswordVisibility = () => setPasswordHidden(!passwordHidden);
  const setTokens = useAuthStore(s => s.setTokens);
  const setIsActive = useAuthStore(s => s.setIsActive);
  const setDealer = useDealerStore(d => d.setDealer);
  const socket = useSocketStore(s => s.socket);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);

  const emailState = watch('email') || getValues('email');

  const handleFinish = handleSubmit(({email, password}) => {
    executeSignInDealer({
      data: {
        email,
        password,
      },
    })
      .then(response => {
        const {accessToken, refreshToken, dealer} = response.data;

        setTokens({
          accessToken,
          refreshToken,
        });
        setDealer(dealer);
        setIsActive(dealer.isActive);
        if (dealer.isActive) {
          socket.emit('SET_DEALER_AVAILABLE', true);
          setDealerIsOnline(true);
        }
      })
      .catch(error => {
        if (error?.response?.data.message) {
          Notifier.showNotification({
            title: 'Error!',
            description: getLoginErrorMessage(error.response.data.message),
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
                <Text fontWeight="bold" color="text" fontSize="5xl">
                  Bienvenido de nuevo!
                </Text>
                <Text mt="lg" fontSize="md" color="gray700">
                  Estamos felices de verte, inicia sesión para empezar con
                  Fastly para Repartidores. Que tengas un buen día :)
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
                      secureTextEntry={passwordHidden}
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
                      suffix={
                        <TouchableOpacity
                          onPress={togglePasswordVisibility}
                          activeOpacity={0.6}>
                          <Icon
                            name={passwordHidden ? 'eye' : 'eye-off'}
                            color="text"
                            fontFamily="Ionicons"
                            fontSize="xl"
                          />
                        </TouchableOpacity>
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

                <Div my="md" />

                <Text
                  textAlign="right"
                  color="primary"
                  fontWeight="500"
                  onPress={() =>
                    navigation.navigate('ForgotPasswordScreen', {
                      email: emailState,
                    })
                  }>
                  ¿Olvidaste tu contraseña?
                </Text>
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
                loading={loading}
                onPress={handleFinish}
                shadow="sm">
                Iniciar Sesión
              </Button>

              <Div my="xl" />

              <Div alignItems="center">
                <Text fontSize="xs" color="gray700">
                  ¿Aún no tienes una cuenta?{' '}
                  <Text
                    color="primary"
                    fontSize="xs"
                    onPress={() => navigation.replace('SignUpScreen')}>
                    Crear una Cuenta
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
