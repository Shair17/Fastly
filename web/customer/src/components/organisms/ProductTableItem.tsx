import {useState, Fragment} from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  Anchor,
  Group,
  Paper,
  Text,
  NumberInput,
  TextInput,
  Modal,
  useMantineTheme,
  Select,
  FileInput,
} from '@mantine/core';
import useAxios from 'axios-hooks';
import {showNotification} from '@mantine/notifications';
import {zodResolver, useForm} from '@mantine/form';
import {useModals} from '@mantine/modals';
import {Pencil, Trash, Upload} from 'tabler-icons-react';
import {Product, StoreCategory} from '@fastly/interfaces/appInterfaces';
import {getEntityType} from '@fastly/utils/getEntityType';
import {editProductSchema} from '@fastly/schemas/schemas';
import {getRegisterErrorMessage} from '@fastly/utils/getErrorMessages';
import {formatDate} from '@fastly/utils/formatDate';
import {getStoreCategory} from '@fastly/utils/getCategory';
import {SelectStoreItem} from './SelectStoreItem';

interface Props extends Product {
  type: 'admin' | 'user' | 'customer' | 'dealer' | 'store' | 'product';
  refetch: () => void;
}

type MyStoresSelectResponse = {
  id: string;
  name: string;
  logo?: string;
  category: StoreCategory;
};

export const ProductTableItem = ({
  blurHash,
  createdAt,
  id,
  image,
  name,
  price,
  storeId,
  updatedAt,
  couponId,
  description,

  type,
  refetch,
}: Props) => {
  const theme = useMantineTheme();
  const modals = useModals();
  const [editProductOpened, setEditProductOpened] = useState(false);
  const [
    {
      error: myStoresSelectError,
      loading: myStoresSelectIsLoading,
      data: myStoresSelect,
    },
    refetchMyStoresSelect,
  ] = useAxios<MyStoresSelectResponse[]>('/stores/my-stores-select');
  const [{loading: editProductIsLoading}, executeEditProduct] = useAxios(
    {
      url: `/products/${id}`,
      method: 'PUT',
    },
    {manual: true},
  );
  const [, executeDeleteProduct] = useAxios(
    {
      url: `/products/${id}`,
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  const editForm = useForm({
    validate: zodResolver(editProductSchema),
    initialValues: {
      name,
      description,
      price,
      blurHash,
      storeId,
      image,
    },
  });

  const handleEditProduct = editForm.onSubmit(
    ({blurHash, description, image, name, price, storeId}) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64 = reader.result as string;

        executeEditProduct({
          data: {
            storeId,
            name,
            description,
            blurHash,
            price,
            image: base64,
          },
        })
          .then(() => {
            showNotification({
              message: 'Producto editado correctamente',
              color: 'green',
            });
            setEditProductOpened(false);
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

  const loadSelectStores = () => {
    if (myStoresSelectIsLoading) return <p>Cargando...</p>;

    if (myStoresSelectError || !myStoresSelect) return <p>Error!</p>;

    const data = myStoresSelect.map(item => {
      return {
        image: item.logo!,
        label: item.name,
        value: item.id,
        description: getStoreCategory(item.category),
      };
    });

    return (
      <Select
        label="Elige uno de tus negocios"
        mt="md"
        placeholder="Elige un negocio"
        itemComponent={SelectStoreItem}
        data={data}
        searchable
        maxDropdownHeight={400}
        nothingFound="No hay negocios"
        filter={(value, item) =>
          item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim())
        }
        {...editForm.getInputProps('storeId')}
      />
    );
  };

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: `Eliminar ${getEntityType(type)}`,
      centered: true,
      children: (
        <Text size="sm" inline>
          Estás seguro que quieres eliminar a <strong>{name}</strong>? Todos los
          datos relacionados al producto serán eliminados.
        </Text>
      ),
      labels: {
        confirm: `Eliminar ${getEntityType(type)}`,
        cancel: 'Cancelar',
      },
      confirmProps: {color: 'red'},
      onConfirm: () => {
        executeDeleteProduct()
          .then(() => {
            showNotification({
              title: 'Eliminado',
              message: `Producto ${name} borrado correctamente.`,
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
        opened={editProductOpened}
        onClose={() => setEditProductOpened(false)}
        title="Editar Producto"
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
          <form onSubmit={handleEditProduct}>
            <TextInput
              label="Nombre del Producto"
              placeholder="Ingresa el nombre del producto"
              required
              type="text"
              mt="md"
              {...editForm.getInputProps('name')}
            />
            <TextInput
              label="Descripción del Producto"
              placeholder="Ingresa la descripción del producto"
              type="text"
              mt="md"
              {...editForm.getInputProps('description')}
            />
            {/* <TextInput
              label="Blur Hash del Producto"
              placeholder="Ingresa Blur Hash del producto"
              required
              type="text"
              mt="md"
              {...editForm.getInputProps('blurHash')}
            /> */}
            <>{loadSelectStores()}</>
            <NumberInput
              label="Precio del producto en soles"
              placeholder="Ingresa el precio del producto en soles"
              mt="md"
              required
              decimalSeparator=","
              precision={2}
              step={0.05}
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              {...editForm.getInputProps('price')}
            />

            <FileInput
              label="Imagen del producto (2MB máximo)"
              placeholder="Ingresa la imagen del producto"
              withAsterisk
              mt="md"
              required
              accept="image/png,image/jpeg,image/jpg"
              icon={<Upload size={14} />}
              {...editForm.getInputProps('image')}
            />

            <Group mt="xl">
              <Button
                fullWidth
                color="primary"
                type="submit"
                loading={editProductIsLoading}>
                Editar Producto
              </Button>
            </Group>
          </form>
        </Paper>
      </Modal>

      <tr>
        <td>
          <Avatar size={30} radius={30} src={image} />
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
          <Text size="sm" weight={500} lineClamp={1} title={price.toString()}>
            S/. {price}
          </Text>
        </td>
        <td>
          <Anchor<'a'>
            lineClamp={1}
            size="sm"
            href={image}
            target="_blank"
            title={description}>
            {image}
          </Anchor>
        </td>
        {/* <td>
          <Text size="sm" weight={500} lineClamp={1} title={blurHash}>
            {blurHash}
          </Text>
        </td> */}
        <td>
          <Text size="sm" weight={500} lineClamp={1} title={storeId}>
            {storeId}
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
            <ActionIcon onClick={() => setEditProductOpened(true)}>
              <Pencil size={16} />
            </ActionIcon>
            <ActionIcon
              color="red"
              title="Eliminar Producto"
              onClick={openDeleteModal}>
              <Trash size={16} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </Fragment>
  );
};
