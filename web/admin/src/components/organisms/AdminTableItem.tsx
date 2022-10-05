import {useState, Fragment} from 'react';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Modal,
  useMantineTheme,
  Switch,
} from '@mantine/core';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import {DatePicker} from '@mantine/dates';
import {showNotification} from '@mantine/notifications';
import {zodResolver, useForm} from '@mantine/form';
import {useModals} from '@mantine/modals';
import {Pencil, Trash} from 'tabler-icons-react';
import {Admin} from '@fastly/interfaces/appInterfaces';
import {useAdminStore} from '@fastly/stores/useAdminStore';
import {getEntityType} from '@fastly/utils/getEntityType';
import {registerSchema} from '@fastly/schemas/schemas';
import {getRegisterErrorMessage} from '@fastly/utils/getErrorMessages';
import {calcAgeFromDate} from '@fastly/utils/calcAgeFromDate';
import {formatDate} from '@fastly/utils/formatDate';

interface Props extends Admin {
  type: 'admin' | 'user' | 'customer' | 'dealer';
  refetch: () => void;
}

export const AdminTableItem = ({
  id,
  avatar,
  createdAt,
  updatedAt,
  name,
  email,
  dni,
  phone,
  address,
  age,
  birthDate,
  isActive,
  isBanned,
  banReason,

  type,
  refetch,
}: Props) => {
  age = calcAgeFromDate(new Date(birthDate));
  const theme = useMantineTheme();
  const selfId = useAdminStore(a => a.id);
  const modals = useModals();
  const [editAdminOpened, setEditAdminOpened] = useState(false);
  const [{loading: editAdminIsLoading}, executeEditAdmin] = useAxios(
    {
      url: `/admins/${id}`,
      method: 'PUT',
    },
    {manual: true},
  );
  const [_, executeDeleteAdmin] = useAxios(
    {
      url: `/admins/${id}`,
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  const editForm = useForm({
    validate: zodResolver(registerSchema),
    initialValues: {
      fullName: name,
      email,
      password: '',
      confirmPassword: '',
      dni,
      phone,
      address,
      birthDate: new Date(birthDate),
      isActive,
    },
  });

  const handleEditAdmin = editForm.onSubmit(
    ({address, birthDate, dni, email, fullName, password, phone, isActive}) => {
      executeEditAdmin({
        data: {
          address,
          birthDate: new Date(birthDate),
          dni,
          email,
          name: fullName,
          password,
          phone,
          isActive,
        },
      })
        .then(() => {
          // if (res.status === 200) {
          showNotification({
            message: 'Administrador editado correctamente',
            color: 'green',
          });
          setEditAdminOpened(false);
          refetch();
          // } else {
          // showNotification({
          // title: 'Error!',
          // message: 'Ocurrió un error al editar el administrador',
          // color: 'red',
          // });
          // }
        })
        .catch(error => {
          if (error?.response?.data.message) {
            showNotification({
              title: 'Error!',
              message: getRegisterErrorMessage(error.response.data.message),
              color: 'red',
            });
          }
        });
    },
  );

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: `Eliminar ${getEntityType(type)}`,
      centered: true,
      children: (
        <Text size="sm" inline>
          Estás seguro que quieres eliminar a <strong>{name}</strong>? Todos los
          datos relacionados a su cuenta serán eliminados luego de 1 mes, por
          mientras se establecerá su cuenta en desactivado.
        </Text>
      ),
      labels: {
        confirm: `Eliminar ${getEntityType(type)}`,
        cancel: 'Cancelar',
      },
      confirmProps: {color: 'red'},
      onConfirm: () => {
        executeDeleteAdmin()
          .then(() => {
            showNotification({
              title: 'Eliminado',
              message: `Cuenta de ${name} desactivada correctamente.`,
              color: 'green',
            });

            refetch();
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
      },
    });
  };

  return (
    <Fragment>
      <Modal
        opened={editAdminOpened}
        onClose={() => setEditAdminOpened(false)}
        title="Editar Administrador"
        centered
        size="lg"
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}>
        <Paper>
          <form onSubmit={handleEditAdmin}>
            <TextInput
              label="Nombre(s) y Apellidos"
              placeholder="Tus nombre(s) y apellidos"
              required
              type="text"
              mt="md"
              {...editForm.getInputProps('fullName')}
            />
            <TextInput
              label="Correo electrónico"
              placeholder="tucorreo@gmail.com"
              required
              type="email"
              mt="md"
              {...editForm.getInputProps('email')}
            />
            <PasswordInput
              label="Contraseña"
              placeholder="Tu contraseña segura"
              description="Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
              required
              mt="md"
              {...editForm.getInputProps('password')}
            />
            <PasswordInput
              label="Confirma tu contraseña"
              description="Aquí debes escribir la contraseña que pusiste arriba."
              placeholder="Confirma tu contraseña segura"
              required
              mt="md"
              {...editForm.getInputProps('confirmPassword')}
            />

            <Group grow>
              <TextInput
                label="Documento Nacional de Identidad"
                placeholder="Tu Documento Nacional de Identidad"
                required
                type="number"
                maxLength={8}
                mt="md"
                {...editForm.getInputProps('dni')}
              />
              <TextInput
                label="Número de celular"
                placeholder="Tu número de celular"
                required
                type="number"
                mt="md"
                {...editForm.getInputProps('phone')}
              />
            </Group>
            <TextInput
              label="Dirección"
              placeholder="Tu dirección de casa o residencia"
              required
              type="text"
              mt="md"
              {...editForm.getInputProps('address')}
            />
            <DatePicker
              label="Fecha de nacimiento"
              placeholder="Tu fecha de nacimiento"
              mt="md"
              required
              {...editForm.getInputProps('birthDate')}
            />

            <Switch
              mt="md"
              label="Cuenta activada"
              defaultChecked={isActive}
              {...editForm.getInputProps('isActive')}
            />

            <Group mt="xl">
              <Button
                fullWidth
                color="primary"
                type="submit"
                loading={editAdminIsLoading}>
                Editar Administrador
              </Button>
            </Group>
          </form>
        </Paper>
      </Modal>

      <tr>
        <td>
          <Avatar size={30} radius={30} src={avatar} />
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={name}>
            {name}
          </Text>
        </td>
        <td>
          <Anchor<'a'> size="sm" href={`mailto:${email}`} title={email}>
            {email}
          </Anchor>
        </td>
        <td>
          <Text size="sm" title={dni}>
            {dni}
          </Text>
        </td>
        <td>
          <Text size="sm" title={phone}>
            {phone}
          </Text>
        </td>
        <td>
          <Text size="sm" title={address} lineClamp={1}>
            {address}
          </Text>
        </td>
        <td>
          <Text size="sm" title={age.toString()}>
            {age.toString()}
          </Text>
        </td>
        <td>
          <Text size="sm" title={birthDate}>
            {dayjs(birthDate).format('DD/MM/YYYY')}
          </Text>
        </td>
        <td>
          <Badge
            color={isActive ? 'green' : 'red'}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
            {isActive ? 'Sí' : 'No'}
          </Badge>
        </td>
        <td>
          <Badge
            color={isBanned ? 'red' : 'green'}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
            {isBanned ? 'Sí' : 'No'}
          </Badge>
        </td>
        <td>
          <Text size="sm" lineClamp={1} title={banReason || 'Nulo'}>
            {banReason || 'Nulo'}
          </Text>
        </td>
        <td>
          <Text size="sm" title={createdAt}>
            {formatDate(new Date(createdAt))}
          </Text>
        </td>
        <td>
          <Text size="sm" title={updatedAt}>
            {formatDate(new Date(updatedAt))}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => setEditAdminOpened(true)}>
              <Pencil size={16} />
            </ActionIcon>
            <ActionIcon
              color="red"
              title={
                id === selfId
                  ? 'No puedes eliminarte a ti mismo'
                  : !isActive
                  ? 'No puedes eliminar a un usuario desactivado'
                  : undefined
              }
              disabled={id === selfId || !isActive}
              onClick={openDeleteModal}>
              <Trash size={16} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </Fragment>
  );
};
