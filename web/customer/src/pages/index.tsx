import {useEffect} from 'react';
import {
  Anchor,
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import {Link} from 'react-router-dom';
import {Logo} from '@fastly/components/atoms/Logo';
import {Check} from 'tabler-icons-react';
import {useLocation} from 'react-router-dom';
import {AuthRedirect} from '@fastly/components/hoc/AuthRedirect';
import {isString} from '@fastly/utils';
import {showNotification} from '@mantine/notifications';
import logo from '@fastly/assets/images/fastly@1000x1000.png';

const links = [
  {
    link: 'https://fastly.delivery/blog',
    label: 'Blog',
  },
  {
    link: 'https://fastly.delivery/privacidad',
    label: 'Privacidad',
  },
  {
    link: 'https://fastly.delivery/terminos',
    label: 'Terminos',
  },
  {
    link: 'https://fastly.delivery/contacto',
    label: 'Contacto',
  },
];

const useStyles = createStyles(theme => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },
  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,
    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,
    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },
  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },
  image: {
    flex: 1,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  innerFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export const Index = () => {
  const location = useLocation();
  const {classes} = useStyles();

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

  const items = links.map(link => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={event => event.preventDefault()}
      size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <AuthRedirect>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>Impulsa</span> tu negocio{' '}
              <br /> con Fastly.
            </Title>
            <Text color="dimmed" mt="md">
              Llega a más personas y aumenta las ventas de tu negocio con
              Fastly. Empezar es totalmente gratis y fácil.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }>
              <List.Item>
                <b>Gratuito</b> – Empezar con Fastly es totalmente gratis.
              </List.Item>
              <List.Item>
                <b>Sistema Eficaz</b> – Con Fastly podrás administrar tu
                negocio.
              </List.Item>
              <List.Item>
                <b>Gestión de Negocio</b> – Puedes gestionar tu negocio.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                component={Link}
                to="/register"
                size="lg"
                className={classes.control}>
                ¡Comienza Gratis!
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="default"
                size="lg"
                className={classes.control}>
                Ingresar
              </Button>
            </Group>
          </div>
          <Image src={logo} className={classes.image} />
        </div>
      </Container>
      <div className={classes.footer}>
        <Container className={classes.inner}>
          <Logo style={{height: '1.75rem', marginRight: '0.5rem'}} />
          <Group className={classes.links}>{items}</Group>
        </Container>
      </div>
    </AuthRedirect>
  );
};
