import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Button, Input, Icon} from 'react-native-magnus';
import {SignUpScreenProps} from '@fastly/navigation/screens/SignUpScreen';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignUpSchema} from '@fastly/schemas/sign-up';
import {SignUpType, SignUpBody, SignUpResponse} from '@fastly/interfaces/app';
import {ContainerWithKeyboardAvoidingView} from '@fastly/components/templates/ContainerWithKeyboardAvoidingView';
import DatePicker from 'react-native-date-picker';
import {calcAgeFromDate} from '@fastly/utils/calcAgeFromDate';
import useAxios from 'axios-hooks';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {getRegisterErrorMessage} from '@fastly/utils/getErrorMessage';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {useSocketStore} from '@fastly/stores/useSocketStore';

export const SignUpController: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [{loading}, executeSignUpDealer] = useAxios<SignUpResponse, SignUpBody>(
    {
      url: '/auth/dealer/register',
      method: 'POST',
    },
    {manual: true},
  );
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [passwordConfirmationHidden, setPasswordConfirmationHidden] =
    useState<boolean>(true);
  const [showDateError, setDateError] = useState(false);
  const [date, setDate] = useState(new Date());
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });
  const setTokens = useAuthStore(s => s.setTokens);
  const setIsActive = useAuthStore(s => s.setIsActive);
  const setDealer = useDealerStore(d => d.setDealer);
  const socket = useSocketStore(s => s.socket);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);

  const togglePasswordVisibility = () => setPasswordHidden(!passwordHidden);
  const togglePasswordConfirmationVisibility = () =>
    setPasswordConfirmationHidden(!passwordConfirmationHidden);

  const handleFinish = handleSubmit(
    ({address, dni, email, fullName: name, password, phone}) => {
      const age = calcAgeFromDate(date);

      if (age < 18) {
        setDateError(true);
        return;
      }

      setDateError(false);

      executeSignUpDealer({
        data: {
          address,
          dni,
          email,
          name,
          password,
          phone,
          birthDate: String(date),
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
            socket?.emit('SET_DEALER_AVAILABLE', true);
            setDealerIsOnline(true);
          }
        })
        .catch(error => {
          Notifier.showNotification({
            title: 'Error!',
            description: getRegisterErrorMessage(error.response.data.message),
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
          });
        });
    },
  );

  return (
    <ContainerWithKeyboardAvoidingView>
      <Div bg="body">
        <Div p="2xl">
          <Div>
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
                    placeholder="Nombre(s) y Apellidos"
                    rounded="lg"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    borderColor={errors.fullName ? 'red' : 'gray400'}
                    prefix={
                      <Icon name="person" color="text" fontFamily="Ionicons" />
                    }
                  />
                )}
                name="fullName"
              />
              {errors.fullName && (
                <Text color="red" mt={2} fontWeight="500">
                  Introduce tu nombre completo.
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
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
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
                  letra mayúscula, una letra minúscula, un número y un carácter
                  especial.
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
                    placeholder="Confirmar contraseña"
                    secureTextEntry={passwordConfirmationHidden}
                    rounded="lg"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    borderColor={
                      !errors.password && errors.confirmPassword
                        ? 'red'
                        : 'gray400'
                    }
                    prefix={
                      <Icon
                        name="lock-closed"
                        color="text"
                        fontFamily="Ionicons"
                      />
                    }
                    suffix={
                      <TouchableOpacity
                        onPress={togglePasswordConfirmationVisibility}
                        activeOpacity={0.6}>
                        <Icon
                          name={passwordConfirmationHidden ? 'eye' : 'eye-off'}
                          color="text"
                          fontFamily="Ionicons"
                          fontSize="xl"
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
                name="confirmPassword"
              />
              {!errors.password && errors.confirmPassword && (
                <Text color="red" mt={2} fontWeight="500">
                  Las contraseñas no coinciden.
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
                    placeholder="Documento Nacional de Identidad"
                    keyboardType="number-pad"
                    rounded="lg"
                    onBlur={onBlur}
                    maxLength={8}
                    onChangeText={onChange}
                    value={value}
                    borderColor={errors.dni ? 'red' : 'gray400'}
                    prefix={
                      <Icon name="card" color="text" fontFamily="Ionicons" />
                    }
                  />
                )}
                name="dni"
              />
              {errors.dni && (
                <Text color="red" mt={2} fontWeight="500">
                  Documento Nacional de Identidad inválido.
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
                    placeholder="Número de celular"
                    keyboardType="number-pad"
                    rounded="lg"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={9}
                    borderColor={errors.phone ? 'red' : 'gray400'}
                    prefix={
                      <Icon
                        name="phone-portrait"
                        color="text"
                        fontFamily="Ionicons"
                      />
                    }
                  />
                )}
                name="phone"
              />
              {errors.phone && (
                <Text color="red" mt={2} fontWeight="500">
                  Número de celular inválido.
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
                    placeholder="Dirección"
                    rounded="lg"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    borderColor={errors.address ? 'red' : 'gray400'}
                    prefix={
                      <Icon name="home" color="text" fontFamily="Ionicons" />
                    }
                  />
                )}
                name="address"
              />
              {errors.address && (
                <Text color="red" mt={2} fontWeight="500">
                  Dirección inválida.
                </Text>
              )}

              <Div my="md" />

              <Text textAlign="left" fontWeight="600" fontSize="lg" mb="md">
                Fecha de Nacimiento
              </Text>
              <Div alignItems="center">
                <DatePicker date={date} onDateChange={setDate} mode="date" />
                {showDateError && (
                  <Text color="red" mt={2} fontWeight="500">
                    Tienes que ser mayor de edad para poder registrarte.
                  </Text>
                )}
              </Div>
            </Div>
          </Div>

          <Div my="2xl" />

          <Div>
            <Button
              fontWeight="600"
              block
              rounded="lg"
              fontSize="xl"
              h={55}
              bg="primary"
              loading={loading}
              onPress={handleFinish}>
              Siguiente
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
    </ContainerWithKeyboardAvoidingView>
  );
};
