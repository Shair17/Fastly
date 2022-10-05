import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Text,
  Button,
} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useForm, zodResolver} from '@mantine/form';
import {loginSchema} from '@fastly/schemas/schemas';
import useAxios from 'axios-hooks';
import {useAuthStore, ITokens} from '@fastly/stores/useAuthStore';
import {useCustomerStore} from '@fastly/stores/useCustomerStore';
import {getLoginErrorMessage} from '@fastly/utils/getErrorMessages';
import {AuthRedirect} from '@fastly/components/hoc/AuthRedirect';
import {Customer} from '@fastly/interfaces/appInterfaces';
import {EMAIL_REGEX} from '@fastly/constants/regex.constants';

export const Login = () => {
  const [{loading}, executeLogin] = useAxios<ITokens & {customer: Customer}>(
    {
      url: '/auth/customer/login',
      method: 'POST',
    },
    {manual: true},
  );
  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const setTokens = useAuthStore(s => s.setTokens);
  const setCustomer = useCustomerStore(a => a.setCustomer);

  // @ts-ignore
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = form.onSubmit(({email, password}) => {
    executeLogin({
      data: {
        email,
        password,
      },
    })
      .then(res => {
        const {customer, accessToken, refreshToken} = res.data;
        setTokens({
          accessToken,
          refreshToken,
        });
        setCustomer(customer);
      })
      .then(() => {
        navigate(from, {replace: true});
      })
      .catch(error => {
        if (error?.response?.data.message) {
          showNotification({
            title: 'Error!',
            message: getLoginErrorMessage(error.response.data.message),
            color: 'red',
          });
        }
      });
  });

  return (
    <AuthRedirect>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={theme => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}>
          Bienvenido a Fastly!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Aún no tienes una cuenta?{' '}
          <Anchor component={Link} to="/register" size="sm">
            Crear cuenta
          </Anchor>
        </Text>

        <Paper
          component="form"
          onSubmit={handleLogin}
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md">
          <TextInput
            label="Correo electrónico"
            placeholder="tucorreo@gmail.com"
            type="email"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="Tu contraseña segura"
            description="Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="md">
            <Anchor
              component={Link}
              to="/forgot-password"
              state={{
                email: EMAIL_REGEX.test(form.values.email)
                  ? form.values.email
                  : undefined,
              }}
              size="sm">
              Olvidaste tu contraseña?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Iniciar sesión
          </Button>
        </Paper>
      </Container>
    </AuthRedirect>
  );
};
