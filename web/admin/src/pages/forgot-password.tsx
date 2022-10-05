import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import {Link, useLocation} from 'react-router-dom';
import {ArrowLeft} from 'tabler-icons-react';
import {AuthRedirect} from '@fastly/components/hoc/AuthRedirect';
import {useForm, zodResolver} from '@mantine/form';
import {forgotPasswordSchema} from '@fastly/schemas/schemas';
import useAxios from 'axios-hooks';
import {showNotification} from '@mantine/notifications';
import {getForgotPasswordMessage} from '@fastly/utils/getErrorMessages';

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export const ForgotPassword = () => {
  const [{loading}, executeForgotPassword] = useAxios<
    {
      message: string;
      success: boolean;
    },
    {email: string}
  >(
    {
      url: '/auth/admin/forgot-password',
      method: 'POST',
    },
    {manual: true},
  );
  const location = useLocation();
  const form = useForm({
    validate: zodResolver(forgotPasswordSchema),
    initialValues: {
      // @ts-ignore
      email: location.state?.email || undefined,
    },
  });
  const {classes} = useStyles();

  const handleForgotPassword = form.onSubmit(({email}) => {
    executeForgotPassword({
      data: {
        email,
      },
    })
      .then(res => {
        showNotification({
          title: 'Éxito!',
          message:
            res.data.message ||
            'Verifica tu correo para resetear tu contraseña',
          color: 'green',
        });
      })
      .catch(error => {
        if (error?.response?.data.message) {
          showNotification({
            title: 'Error!',
            message: getForgotPasswordMessage(error.response.data.message),
            color: 'red',
          });
        }
      });
  });

  return (
    <AuthRedirect>
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Olvidaste tu contraseña?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Ingresa tu correo electrónico para recibir un enlace de
          restablecimiento
        </Text>

        <Paper
          component="form"
          onSubmit={handleForgotPassword}
          withBorder
          shadow="md"
          p={30}
          radius="md"
          mt="xl">
          <TextInput
            label="Correo electrónico"
            placeholder="tucorreo@gmail.com"
            type="email"
            required
            {...form.getInputProps('email')}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor
              component={Link}
              to="/login"
              color="dimmed"
              size="sm"
              className={classes.control}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Regresar a iniciar sesión</Box>
              </Center>
            </Anchor>
            <Button type="submit" className={classes.control} loading={loading}>
              Enviar
            </Button>
          </Group>
        </Paper>
      </Container>
    </AuthRedirect>
  );
};
