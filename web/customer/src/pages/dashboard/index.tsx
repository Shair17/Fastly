import {
  Group,
  Text,
  Avatar,
  Box,
  UnstyledButton,
  Grid,
  Space,
  Button,
  Badge,
  Paper,
} from '@mantine/core';
import {Refresh, Heart} from 'tabler-icons-react';
import {DashboardLayout} from '@fastly/components/templates/DashboardLayout';
import {useCustomerStore} from '@fastly/stores/useCustomerStore';
import {useDate} from '@fastly/hooks/useDate';
import useAxios from 'axios-hooks';
// import {useSocketOrdersQueue} from '@fastly/hooks/useSocketOrdersQueue';
import {isFunction} from '@fastly/utils';
import {Store} from '@fastly/interfaces/appInterfaces';
import {Link} from 'react-router-dom';

const Child = () => {
  return (
    <Paper
      component={Link}
      to="/dashboard/stores/12345678910"
      radius="md"
      withBorder
      p="lg">
      <Group position="apart">
        <Group>
          <Avatar
            src="https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1631005766/defaults/avatars/fastly_mwizrt.jpg"
            size={50}
            radius={100}
          />
          <Text size="lg" weight={500}>
            Nombre del negocio
          </Text>
        </Group>
        <Badge>Categoría</Badge>
      </Group>
      <Text mt="md" color="dimmed" size="sm">
        Descripción de mi negocio...
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Dirección: mi dirección...
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Descripción de la categoría: mi descripción de la categoría...
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Hora de apertura: mi hora de apertura de la categoría...
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Hora de cierre: mi hora de cierre de la categoría...
      </Text>
    </Paper>
  );
};

export const Dashboard = () => {
  const [
    {error: myStoresError, loading: myStoresIsLoading, data: myStores},
    refetchMyStores,
  ] = useAxios<Store[]>('/customers/me/stores');
  // const {ordersQueue} = useSocketOrdersQueue();
  // Aquí debería ir la cola de ordenes pero solamente para este cliente en especifico
  // console.log(ordersQueue.lenth)
  const date = useDate();
  const name = useCustomerStore(a => a.name);
  const avatar = useCustomerStore(a => a.avatar);
  const email = useCustomerStore(a => a.email);
  const greeting = `${date.greeting}, ${name.split(' ')[0]}`;
  const nameInitials = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;

  const handleRefresh = () => {
    refetchMyStores();
  };

  const body = () => {
    if (myStoresIsLoading) return <p>Cargando...</p>;

    if (myStoresError || !myStores) return <p>Error!</p>;

    return (
      <Grid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, key) => (
          <Grid.Col key={key.toString()} md={6} lg={4}>
            <Child />
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  return (
    <DashboardLayout>
      <Box px="md">
        <Group position="apart">
          <Text size="xl" weight="bold">
            {greeting}
          </Text>

          <Group>
            <Button
              leftIcon={<Refresh />}
              variant="default"
              onClick={handleRefresh}
              disabled={!isFunction(handleRefresh)}
              loading={myStoresIsLoading}>
              REFRESCAR
            </Button>
            <UnstyledButton>
              <Group>
                <div>
                  <Text align="right">Cliente</Text>
                  <Text size="xs" align="right">
                    {email}
                  </Text>
                </div>
                <Avatar size={40} color="blue" src={avatar} alt={name}>
                  {nameInitials}
                </Avatar>
              </Group>
            </UnstyledButton>
          </Group>
        </Group>

        <Space h="lg" />

        {body()}
      </Box>
    </DashboardLayout>
  );
};
