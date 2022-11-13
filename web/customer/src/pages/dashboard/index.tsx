import {useState} from 'react';
import {
  Group,
  Text,
  Avatar,
  Box,
  UnstyledButton,
  Grid,
  Space,
  Button,
  TextInput,
  Select,
  Drawer,
  useMantineTheme,
  FileInput,
} from '@mantine/core';
import {Plus, Refresh, Upload} from 'tabler-icons-react';
import {DashboardLayout} from '@fastly/components/templates/DashboardLayout';
import {useCustomerStore} from '@fastly/stores/useCustomerStore';
import {useDate} from '@fastly/hooks/useDate';
import useAxios from 'axios-hooks';
// import {useSocketOrdersQueue} from '@fastly/hooks/useSocketOrdersQueue';
import {isFunction} from '@fastly/utils';
import {Store} from '@fastly/interfaces/appInterfaces';
import {MyStoreCard} from '@fastly/components/organisms/MyStoreCard';
import {showNotification} from '@mantine/notifications';
import {useForm, zodResolver} from '@mantine/form';
import {registerStoreSchema} from '@fastly/schemas/schemas';
import {TimeInput} from '@mantine/dates';
import {Paper} from '@mantine/core';

export const Dashboard = () => {
  const theme = useMantineTheme();
  const [newStoreDrawerOpened, setNewStoreDrawerOpened] = useState(false);
  const [
    {error: myStoresError, loading: myStoresIsLoading, data: myStores},
    refetchMyStores,
  ] = useAxios<Store[]>('/customers/me/stores');
  const [{loading: createStoreIsLoading}, executeCreateStore] = useAxios(
    {
      url: '/stores',
      method: 'POST',
    },
    {manual: true},
  );
  // const {ordersQueue} = useSocketOrdersQueue();
  // Aquí debería ir la cola de ordenes pero solamente para este cliente en especifico
  // console.log(ordersQueue.lenth)
  const date = useDate();
  const name = useCustomerStore(a => a.name);
  const avatar = useCustomerStore(a => a.avatar);
  const email = useCustomerStore(a => a.email);
  const greeting = `${date.greeting}, ${name.split(' ')[0]}`;
  const nameInitials = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;

  const form = useForm({
    validate: zodResolver(registerStoreSchema),
    initialValues: {
      owner: email,
      name: '',
      address: '',
      description: '',
      categoryDescription: '',
      openTime: new Date(),
      closeTime: new Date(),
      logo: null,
      category: '',
    },
  });

  const handleRegisterNewStore = form.onSubmit(
    ({
      address,
      category,
      categoryDescription,
      closeTime,
      description,
      logo,
      name,
      openTime,
      owner,
    }) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(logo!);
      reader.onloadend = () => {
        const base64 = reader.result as string;

        executeCreateStore({
          data: {
            address,
            name,
            category,
            categoryDescription,
            description,
            logo: base64,
            openTime,
            closeTime,
            owner: owner || email,
          },
        })
          .then(() => {
            showNotification({
              message: 'Negocio creado correctamente',
              color: 'green',
            });
            setNewStoreDrawerOpened(false);
            refetchMyStores();
          })
          .catch(error => {
            if (error?.response?.data.message) {
              showNotification({
                title: 'Error!',
                message: error.response.data.message,
                color: 'red',
              });
            }
          });
      };
    },
  );

  const handleRefresh = () => {
    refetchMyStores();
  };

  const handleAddStore = () => {
    setNewStoreDrawerOpened(true);
  };

  const body = () => {
    if (myStoresIsLoading) return <p>Cargando...</p>;

    if (myStoresError || !myStores) return <p>Error!</p>;

    return (
      <Grid>
        {myStores.map(store => (
          <Grid.Col key={store.id} md={6} lg={4}>
            <MyStoreCard {...store} />
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  return (
    <DashboardLayout>
      <Drawer
        opened={newStoreDrawerOpened}
        onClose={() => setNewStoreDrawerOpened(false)}
        title="Crear Negocio"
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        padding="xl"
        position="right"
        size="2xl">
        <Paper>
          <form onSubmit={handleRegisterNewStore}>
            {/* <TextInput
              label="Correo electrónico del dueño"
              placeholder="Ingresa el correo electrónico de la cuenta del dueño o cliente en Fastly"
              required
              type="email"
              mt="md"
              {...form.getInputProps('owner')}
            /> */}

            <Group grow>
              <TextInput
                label="Nombre del negocio"
                placeholder="Ingresa el nombre del negocio"
                required
                type="text"
                mt="md"
                {...form.getInputProps('name')}
              />
              <FileInput
                label="Logotipo del negocio (2MB máximo)"
                withAsterisk
                mt="md"
                required
                placeholder="Ingresa el logotipo del negocio"
                accept="image/png,image/jpeg,image/jpg"
                icon={<Upload size={14} />}
                {...form.getInputProps('logo')}
              />
            </Group>

            <TextInput
              label="Descripción del negocio"
              placeholder="Ingresa la descripción del negocio"
              type="text"
              mt="md"
              {...form.getInputProps('description')}
            />

            <TextInput
              label="Dirección del negocio"
              placeholder="Ingresa la dirección del negocio"
              required
              type="text"
              mt="md"
              {...form.getInputProps('address')}
            />

            <Group grow>
              <Select
                mt="md"
                data={[
                  {value: 'LICORERIA', label: 'Licorería'},
                  {value: 'RESTAURANTE', label: 'Restaurante'},
                  {value: 'MASCOTAS', label: 'Mascotas'},
                  {value: 'MODA', label: 'Moda'},
                  {value: 'TECNOLOGIA', label: 'Tecnología'},
                  {value: 'JUGUETERIA', label: 'Juguetería'},
                  {value: 'FARMACIA', label: 'Farmacia'},
                  {value: 'CUIDADO_PERSONAL', label: 'Cuidado Personal'},
                  {value: 'MAQUILLAJE', label: 'Maquillaje'},
                  {value: 'FLORISTERIA', label: 'Floristería'},
                  {value: 'TIENDA', label: 'Tienda'},
                  {value: 'SUPERMERCADOS', label: 'Supermercado'},
                  {value: 'LIBRERIA', label: 'Librería'},
                  {value: 'JUGUERIA', label: 'Juguería'},
                  {value: 'OTRO', label: 'Otro'},
                ]}
                placeholder="Elige la categoría del negocio"
                label="Categoría del negocio"
                {...form.getInputProps('category')}
              />

              <TextInput
                label="Descripción de categoría"
                placeholder="Ingresa la dirección de la categoría"
                type="text"
                mt="md"
                {...form.getInputProps('categoryDescription')}
              />
            </Group>

            <Group grow>
              <TimeInput
                format="12"
                label="Hora de apertura"
                placeholder="Hora de apertura del negocio"
                mt="md"
                defaultValue={new Date()}
                clearable
                required={false}
                {...form.getInputProps('openTime')}
              />

              <TimeInput
                format="12"
                label="Hora de cierre"
                placeholder="Hora de cierre del negocio"
                mt="md"
                clearable
                defaultValue={new Date()}
                required={false}
                {...form.getInputProps('closeTime')}
              />
            </Group>

            <Text mt="md">
              * Si no se indica una hora de apertura y hora de cierre, se
              considera que está abierto 24/7
            </Text>

            <Group mt="xl">
              <Button fullWidth type="submit" loading={createStoreIsLoading}>
                Crear Negocio
              </Button>
            </Group>
          </form>
        </Paper>
      </Drawer>

      <Box px="md">
        <Group position="apart">
          <Text size="xl" weight="bold">
            {greeting}
          </Text>

          <Group>
            <Group>
              <Button
                leftIcon={<Refresh />}
                variant="default"
                onClick={handleRefresh}
                disabled={!isFunction(handleRefresh)}
                loading={myStoresIsLoading}>
                REFRESCAR
              </Button>
              <Button
                leftIcon={<Plus />}
                variant="default"
                onClick={handleAddStore}
                disabled={!isFunction(handleAddStore)}
                loading={createStoreIsLoading}>
                AGREGAR NEGOCIO
              </Button>
            </Group>

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
