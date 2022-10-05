import {useState} from 'react';
import {
  Drawer,
  Group,
  Paper,
  PasswordInput,
  Button,
  TextInput,
  useMantineTheme,
  Select,
} from '@mantine/core';
import {DashboardLayout} from '@fastly/components/templates/DashboardLayout';
import {MainAccount} from '@fastly/components/organisms/MainAccount';
import useAxios from 'axios-hooks';
import {GlobalTable} from '@fastly/components/organisms/GlobalTable';
import {useForm, zodResolver} from '@mantine/form';
import {Dealer, Vehicle} from '@fastly/interfaces/appInterfaces';
import {DatePicker} from '@mantine/dates';
import {registerDealerSchema} from '@fastly/schemas/schemas';
import {showNotification} from '@mantine/notifications';
import {getCreateNewDealerErrorMessage} from '@fastly/utils/getErrorMessages';
import {DealerTableItem} from '@fastly/components/organisms/DealerTableItem';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dni: '',
  phone: '',
  address: '',
  birthDate: '',
  isActive: false,
  available: false,
  isBanned: false,
  banReason: '',
  vehicle: Vehicle.NONE,
  avatar: '',
};

export const DashboardDealers = () => {
  const [newDealerDrawerOpened, setNewDealerDrawerOpened] = useState(false);
  const theme = useMantineTheme();
  const [{error, loading: getDealersIsLoading, data: dealers}, refetchDealers] =
    useAxios<Dealer[]>({
      url: '/dealers',
      method: 'GET',
    });
  const [{loading: createDealerIsLoading}, executeCreateDealer] = useAxios<
    any,
    {
      name: string;
      email: string;
      password: string;
      dni: string;
      phone: string;
      address: string;
      avatar?: string;
      birthDate: Date;
      vehicle: Vehicle;
    }
  >(
    {
      url: '/dealers',
      method: 'POST',
    },
    {manual: true},
  );
  const form = useForm({
    validate: zodResolver(registerDealerSchema),
    initialValues,
  });

  const handleRegisterNewDealer = form.onSubmit(
    ({
      address,
      birthDate,
      dni,
      email,
      fullName,
      password,
      phone,
      avatar,
      confirmPassword,
      vehicle,
    }) => {
      if (password !== confirmPassword) return;

      executeCreateDealer({
        data: {
          address,
          birthDate: new Date(birthDate),
          dni,
          email,
          name: fullName,
          password,
          phone,
          avatar,
          vehicle,
        },
      })
        .then(() => {
          showNotification({
            message: 'Repartidor creado correctamente',
            color: 'green',
          });
          setNewDealerDrawerOpened(false);
          refetchDealers();
          form.setValues(initialValues);
        })
        .catch(error => {
          if (error?.response?.data.message) {
            showNotification({
              title: 'Error!',
              message: getCreateNewDealerErrorMessage(
                error.response.data.message,
              ),
              color: 'red',
            });
          }
        });
    },
  );

  const handleAddButton = () => {
    setNewDealerDrawerOpened(true);
  };

  const handleRefresh = () => {
    refetchDealers();
  };

  const body = () => {
    if (getDealersIsLoading) return <p>Cargando...</p>;

    if (error || !dealers) return <p>Error!</p>;

    if (dealers.length === 0) return <p>No hay repartidores.</p>;

    return (
      <GlobalTable type="dealers">
        {dealers.map(dealer => (
          <DealerTableItem
            key={dealer.id}
            {...dealer}
            type="dealer"
            refetch={refetchDealers}
          />
        ))}
      </GlobalTable>
    );
  };

  return (
    <DashboardLayout>
      <Drawer
        opened={newDealerDrawerOpened}
        onClose={() => setNewDealerDrawerOpened(false)}
        title="Crear Repartidor"
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
          <form onSubmit={handleRegisterNewDealer}>
            <TextInput
              label="Nombre(s) y Apellidos"
              placeholder="Tus nombre(s) y apellidos"
              required
              type="text"
              mt="md"
              {...form.getInputProps('fullName')}
            />
            <TextInput
              label="Correo electrónico"
              placeholder="tucorreo@gmail.com"
              required
              type="email"
              mt="md"
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
            <PasswordInput
              label="Confirma tu contraseña"
              description="Aquí debes escribir la contraseña que pusiste arriba."
              placeholder="Confirma tu contraseña segura"
              required
              mt="md"
              {...form.getInputProps('confirmPassword')}
            />

            <Group grow>
              <TextInput
                label="Documento Nacional de Identidad"
                placeholder="Tu Documento Nacional de Identidad"
                required
                type="number"
                maxLength={8}
                mt="md"
                {...form.getInputProps('dni')}
              />
              <TextInput
                label="Número de celular"
                placeholder="Tu número de celular"
                required
                type="number"
                mt="md"
                {...form.getInputProps('phone')}
              />
            </Group>
            <TextInput
              label="Dirección"
              placeholder="Tu dirección de casa o residencia"
              required
              type="text"
              mt="md"
              {...form.getInputProps('address')}
            />
            <DatePicker
              label="Fecha de nacimiento"
              placeholder="Tu fecha de nacimiento"
              mt="md"
              required
              {...form.getInputProps('birthDate')}
            />

            <Select
              mt="md"
              data={[
                {value: 'CARRO', label: 'Carro'},
                {value: 'MOTO', label: 'Moto'},
                {value: 'BICICLETA', label: 'Bicicleta'},
                {value: 'PIE', label: 'Pie'},
                {value: 'NONE', label: 'Ninguno'},
              ]}
              placeholder="Elige tu vehiculo"
              label="Tu vehiculo"
              {...form.getInputProps('vehicle')}
            />

            <Group mt="xl">
              <Button fullWidth type="submit" loading={createDealerIsLoading}>
                Crear Repartidor
              </Button>
            </Group>
          </form>
        </Paper>
      </Drawer>

      <MainAccount
        title="Repartidores 🛵"
        description={`Aquí podrás ver la lista de repartidores en Fastly.${
          dealers
            ? ` Hay ${dealers.length} repartidor${
                dealers.length !== 1 ? 'es' : ''
              }.`
            : ''
        }`}
        addIsLoading={createDealerIsLoading}
        handleAddButton={handleAddButton}
        handleRefresh={handleRefresh}
        refreshIsLoading={getDealersIsLoading}>
        {body()}
      </MainAccount>
    </DashboardLayout>
  );
};
