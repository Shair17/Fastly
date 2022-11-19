import {FC, Fragment, useState} from 'react';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  TextInput,
  Modal,
  Paper,
  NumberInput,
  FileInput,
} from '@mantine/core';
import {Product} from '@fastly/interfaces/appInterfaces';
import {Trash, Upload} from 'tabler-icons-react';
import useAxios from 'axios-hooks';
import {useModals} from '@mantine/modals';
import {showNotification} from '@mantine/notifications';
import {useForm, zodResolver} from '@mantine/form';
import {editProductSchema} from '@fastly/schemas/schemas';
import {formatDate} from '@fastly/utils/formatDate';

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  trash: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface Props extends Product {
  refetch: () => void;
}

export const ProductItem: FC<Props> = ({
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

  refetch,
}) => {
  const modals = useModals();
  const [editProductOpened, setEditProductOpened] = useState(false);
  const [{loading: editProductIsLoading}, executeEditProduct] = useAxios(
    {
      method: 'PUT',
      url: `/products/${id}`,
    },
    {
      manual: true,
    },
  );
  const [, executeDeleteProduct] = useAxios(
    {
      method: 'DELETE',
      url: `/products/${id}`,
    },
    {
      manual: true,
    },
  );
  const {classes, theme} = useStyles();

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
                message: error.response.data.message,
                color: 'red',
              });
            }
          });
      };
    },
  );

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: `Eliminar Producto`,
      centered: true,
      children: (
        <Text size="sm" inline>
          Estás seguro que quieres eliminar el producto <strong>{name}</strong>?
        </Text>
      ),
      labels: {
        confirm: `Eliminar Producto`,
        cancel: 'Cancelar',
      },
      confirmProps: {color: 'red'},
      onConfirm: () => {
        executeDeleteProduct()
          .then(() => {
            showNotification({
              title: 'Eliminado',
              message: `Producto eliminado correctamente.`,
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

      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src={image} alt={name} height={180} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <Text size="lg" weight={500}>
              {name}
            </Text>
            <Badge size="sm">country</Badge>
          </Group>
          <Text size="sm" mt="xs">
            Descripción: {description || 'Nulo'}
          </Text>
          <Text size="sm" mt="xs">
            Precio: S/. {price.toString()}
          </Text>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" color="dimmed" title={createdAt}>
            Creado: {formatDate(new Date(createdAt))}
          </Text>
          <Text mt="md" color="dimmed" title={updatedAt}>
            Actualizado: {formatDate(new Date(updatedAt))}
          </Text>
        </Card.Section>

        <Group mt="xs">
          <Button
            radius="md"
            style={{flex: 1}}
            onClick={() => setEditProductOpened(true)}>
            Editar Producto
          </Button>
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            onClick={openDeleteModal}>
            <Trash size={18} className={classes.trash} />
          </ActionIcon>
        </Group>
      </Card>
    </Fragment>
  );
};
