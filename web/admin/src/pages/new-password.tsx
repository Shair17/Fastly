import {useEffect} from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Button,
  PasswordInput,
} from '@mantine/core';
import {AuthRedirect} from '@fastly/components/hoc/AuthRedirect';
import {useForm, zodResolver} from '@mantine/form';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {isValidToken} from '@fastly/utils/isValidToken';
import {isTokenExpired} from '@fastly/services/refresh-token.service';
import {isString} from '@fastly/utils';
import {showNotification} from '@mantine/notifications';
import useAxios from 'axios-hooks';
import {newPasswordSchema} from '@fastly/schemas/schemas';
import {getNewPasswordErrorMessage} from '@fastly/utils/getErrorMessages';

export const NewPassword = () => {
  const [{loading}, executeNewPassword] = useAxios<
    any,
    {
      newPassword: string;
      resetPasswordToken: string;
    }
  >(
    {
      url: '/auth/admin/new-password',
      method: 'POST',
    },
    {manual: true},
  );
  const form = useForm({
    validate: zodResolver(newPasswordSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleGoHome = (message: string) => {
    navigate('/', {
      replace: true,
      state: {
        newPasswordPayload: message,
      },
    });
  };

  const handleNewPassword = form.onSubmit(({password, confirmPassword}) => {
    if (password !== confirmPassword || !isString(token)) return;

    executeNewPassword({
      data: {
        newPassword: password,
        resetPasswordToken: token!,
      },
    })
      .then(() => {
        showNotification({
          title: 'Éxito',
          message:
            'Tu contraseña ha sido cambiada con éxito, por favor inicia sesión.',
          color: 'green',
        });
      })
      .then(() => {
        navigate('/login', {replace: true});
      })
      .catch(error => {
        if (error?.response?.data.message) {
          showNotification({
            title: 'Error!',
            message: getNewPasswordErrorMessage(error.response.data.message),
            color: 'red',
          });
        }
      });
  });

  useEffect(() => {
    if (!isString(token) || !token) {
      handleGoHome('No podemos procesar tu solicitud.');
      return;
    } else if (!isValidToken(token)) {
      handleGoHome('Los datos para recuperar tu contraseña son inválidos.');
      return;
    } else if (isTokenExpired(token)) {
      handleGoHome(
        'Por favor, vuelve a solicitar una nueva recuperación de contraseña.',
      );
      return;
    }
  }, [token]);

  return (
    <AuthRedirect>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={theme => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}>
          Cambiar contraseña
        </Title>

        <Paper
          component="form"
          onSubmit={handleNewPassword}
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md">
          <PasswordInput
            label="Nueva contraseña"
            placeholder="Tu nueva contraseña segura"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirmar nueva contraseña"
            placeholder="Confirma tu nueva contraseña segura"
            required
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />
          <Text color="dimmed" size="xs" align="justify" mt="sm">
            Asegúrate de que tenga mínimo ocho caracteres, al menos una letra
            mayúscula, una letra minúscula, un número y un carácter especial
          </Text>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Cambiar contraseña
          </Button>
        </Paper>
      </Container>
    </AuthRedirect>
  );
};
