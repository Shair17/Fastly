import {useState, Fragment} from 'react';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  Modal,
  useMantineTheme,
  Select,
  FileInput,
} from '@mantine/core';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';
import {TimeInput} from '@mantine/dates';
import {showNotification} from '@mantine/notifications';
import {zodResolver, useForm} from '@mantine/form';
import {useModals} from '@mantine/modals';
import {Pencil, Trash, Upload} from 'tabler-icons-react';
import {Store} from '@fastly/interfaces/appInterfaces';
import {getEntityType} from '@fastly/utils/getEntityType';
import {editStoreSchema} from '@fastly/schemas/schemas';
import {getRegisterErrorMessage} from '@fastly/utils/getErrorMessages';
import {formatDate} from '@fastly/utils/formatDate';
import {getStoreCategory} from '@fastly/utils/getCategory';

interface Props extends Store {
  type: 'admin' | 'user' | 'customer' | 'dealer' | 'store' | 'product';
  refetch: () => void;
}

export const StoreTableItem = ({
  address,
  category,
  createdAt,
  id,
  name,
  owner,
  ownerId,
  updatedAt,
  categoryDescription,
  closeTime,
  description,
  logo,
  openTime,

  type,
  refetch,
}: Props) => {
  const theme = useMantineTheme();
  const modals = useModals();
  const [editStoreOpened, setEditStoreOpened] = useState(false);
  const [{loading: editStoreIsLoading}, executeEditStore] = useAxios(
    {
      url: `/stores/${id}`,
      method: 'PUT',
    },
    {manual: true},
  );
  const [_, executeDeleteStore] = useAxios(
    {
      url: `/stores/${id}`,
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  const editForm = useForm({
    validate: zodResolver(editStoreSchema),
    initialValues: {
      name,
      description,
      address,
      category,
      categoryDescription,
      openTime: openTime ? new Date(openTime) : new Date(),
      closeTime: closeTime ? new Date(closeTime) : new Date(),
      logo,
    },
  });

  const handleEditStore = editForm.onSubmit(
    ({
      address,
      category,
      categoryDescription,
      closeTime,
      description,
      logo,
      name,
      openTime,
    }) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(logo);
      reader.onloadend = () => {
        const base64 = reader.result as string;

        executeEditStore({
          data: {
            owner: ownerId,
            logo: base64,
            name,
            description,
            address,
            category,
            categoryDescription,
            openTime: openTime ? new Date(openTime) : undefined,
            closeTime: closeTime ? new Date(closeTime) : undefined,
          },
        })
          .then(() => {
            showNotification({
              message: 'Negocio editado correctamente',
              color: 'green',
            });
            setEditStoreOpened(false);
            refetch();
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
      };
    },
  );

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: `Eliminar ${getEntityType(type)}`,
      centered: true,
      children: (
        <Text size="sm" inline>
          Estás seguro que quieres eliminar a <strong>{name}</strong>? Todos los
          datos relacionados al negocio serán eliminados luego de 1 mes, por
          mientras se establecerá como invisible.
        </Text>
      ),
      labels: {
        confirm: `Eliminar ${getEntityType(type)}`,
        cancel: 'Cancelar',
      },
      confirmProps: {color: 'red'},
      onConfirm: () => {
        executeDeleteStore()
          .then(() => {
            showNotification({
              title: 'Eliminado',
              message: `Negocio de ${owner.email} borrado correctamente.`,
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
        opened={editStoreOpened}
        onClose={() => setEditStoreOpened(false)}
        title="Editar Negocio"
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
          <Group position="center">
            <Avatar src={logo} alt={name} />
            <Text weight="bold" size="xl">
              {name}
            </Text>
          </Group>
          <form onSubmit={handleEditStore}>
            <Group grow>
              <TextInput
                label="Nombre del negocio"
                placeholder="Ingresa el nombre del negocio"
                required
                type="text"
                mt="md"
                {...editForm.getInputProps('name')}
              />
              <FileInput
                label="Logotipo del negocio (2MB máximo)"
                withAsterisk
                mt="md"
                required
                accept="image/png,image/jpeg,image/jpg"
                icon={<Upload size={14} />}
                placeholder="Ingresa el logotipo del negocio"
                {...editForm.getInputProps('logo')}
              />
            </Group>
            <TextInput
              label="Descripción del negocio"
              placeholder="Ingresa la descripción del negocio"
              type="text"
              mt="md"
              {...editForm.getInputProps('description')}
            />

            <TextInput
              label="Dirección del negocio"
              placeholder="Ingresa la dirección del negocio"
              required
              type="text"
              mt="md"
              {...editForm.getInputProps('address')}
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
                {...editForm.getInputProps('category')}
              />

              <TextInput
                label="Descripción de categoría"
                placeholder="Ingresa la dirección de la categoría"
                type="text"
                mt="md"
                {...editForm.getInputProps('categoryDescription')}
              />
            </Group>

            <Group grow>
              <TimeInput
                format="12"
                label="Hora de apertura"
                placeholder="Hora de apertura del negocio"
                mt="md"
                defaultValue={openTime ? new Date(openTime) : new Date()}
                clearable
                {...editForm.getInputProps('openTime')}
              />

              <TimeInput
                format="12"
                label="Hora de cierre"
                placeholder="Hora de cierre del negocio"
                mt="md"
                clearable
                defaultValue={closeTime ? new Date(closeTime) : new Date()}
                {...editForm.getInputProps('closeTime')}
              />
            </Group>

            <Text mt="md">
              * Si no se indica una hora de apertura y hora de cierre, se
              considera que está abierto 24/7
            </Text>

            <Group mt="xl">
              <Button
                fullWidth
                color="primary"
                type="submit"
                loading={editStoreIsLoading}>
                Editar Negocio
              </Button>
            </Group>
          </form>
        </Paper>
      </Modal>

      <tr>
        <td>
          <Avatar size={30} radius={30} src={logo} />
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={id}>
            {id}
          </Text>
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={name}>
            {name}
          </Text>
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={description}>
            {description || 'Nulo'}
          </Text>
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={address}>
            {address}
          </Text>
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={address}>
            {getStoreCategory(category)}
          </Text>
        </td>
        <td>
          <Text
            size="sm"
            weight={500}
            lineClamp={1}
            title={categoryDescription}>
            {categoryDescription || 'Nulo'}
          </Text>
        </td>
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={ownerId}>
            {ownerId}
          </Text>
        </td>
        <td>
          <Anchor<'a'>
            size="sm"
            href={`mailto:${owner.email}`}
            title={owner.email}>
            {owner.email}
          </Anchor>
        </td>
        <td>
          <Text size="sm" title={openTime}>
            {openTime ? dayjs(openTime).format('hh:mm a') : 'Nulo'}
          </Text>
        </td>
        <td>
          <Text size="sm" title={closeTime}>
            {closeTime ? dayjs(closeTime).format('hh:mm a') : 'Nulo'}
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
            <ActionIcon onClick={() => setEditStoreOpened(true)}>
              <Pencil size={16} />
            </ActionIcon>
            <ActionIcon
              color="red"
              title="Eliminar Negocio"
              onClick={openDeleteModal}>
              <Trash size={16} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </Fragment>
  );
};
