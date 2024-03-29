import {useEffect} from 'react';
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Center,
  useMantineTheme,
  Image,
  Anchor,
} from '@mantine/core';
import {Dots} from '@fastly/components/atoms/Dots';
import {Link, useLocation} from 'react-router-dom';
import Logo from '@fastly/assets/images/fastly@1000x1000.png';
import useAxios from 'axios-hooks';
import {AuthRedirect} from '@fastly/components/hoc/AuthRedirect';
import {isString} from '@fastly/utils';
import {showNotification} from '@mantine/notifications';

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  logoContainer: {
    backgroundColor: '#fee2e2',
    height: 120,
    width: 120,
    borderRadius: 100,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export const Index = () => {
  const [{data}] = useAxios<number>('/admins/count');
  const {classes} = useStyles();
  const theme = useMantineTheme();
  const location = useLocation();

  // @ts-ignore
  const newPasswordPayload = location?.state?.newPasswordPayload || undefined;

  useEffect(() => {
    if (isString(newPasswordPayload)) {
      showNotification({
        title: 'Error!',
        message: newPasswordPayload,
        color: 'red',
      });
    }
  }, [location]);

  return (
    <AuthRedirect>
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{left: 0, top: 0}} />
        <Dots className={classes.dots} style={{left: 60, top: 0}} />
        <Dots className={classes.dots} style={{left: 0, top: 140}} />
        <Dots className={classes.dots} style={{right: 0, top: 60}} />

        <div className={classes.inner}>
          <Center mb="xs">
            <div className={classes.logoContainer}>
              <Image src={Logo} width={80} height={80} />
            </div>
          </Center>
          <Title className={classes.title}>
            Bienvenido al panel de administración de{' '}
            <Text
              component="a"
              href="https://fastly.delivery/"
              target="_blank"
              color={theme.primaryColor}
              inherit>
              Fastly
            </Text>
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              Este sitio es solo para{' '}
              <Anchor
                href="https://www.instagram.com/shair.dev/"
                target="_blank">
                @shair.dev
              </Anchor>{' '}
              y personas o entidades autorizadas por él. Caso contrario este
              sitio no te será nada útil.
            </Text>
          </Container>
          <div className={classes.controls}>
            <Button
              component={Link}
              to="/login"
              className={classes.control}
              size="lg"
              variant="default">
              Iniciar sesión
            </Button>
            {data === 0 && (
              <Button
                component={Link}
                to="/register"
                className={classes.control}
                size="lg">
                Registrarse
              </Button>
            )}
          </div>
        </div>
      </Container>
    </AuthRedirect>
  );
};
