import {
  Group,
  Title,
  Badge,
  Button,
  Text,
  Avatar,
  Grid,
  Drawer,
  useMantineTheme,
  Paper,
  TextInput,
  NumberInput,
  FileInput,
} from '@mantine/core';
import useAxios from 'axios-hooks';
import {useParams} from 'react-router-dom';
import {NotFound404} from '@fastly/pages/404';
import {isCuid} from '@fastly/utils';
import {DashboardLayout} from '@fastly/components/templates/DashboardLayout';
import {Product, Store} from '@fastly/interfaces/appInterfaces';
import {getStoreCategory} from '@fastly/utils/getCategory';
import {Plus, Refresh, Upload} from 'tabler-icons-react';
import {ProductItem} from '@fastly/components/organisms/ProductItem';
import {useForm, zodResolver} from '@mantine/form';
import {createProductSchema} from '@fastly/schemas/schemas';
import {showNotification} from '@mantine/notifications';
import {useState} from 'react';

export const DashboardStore = () => {
  const theme = useMantineTheme();
  const [newProductDrawerOpened, setNewProductDrawerOpened] = useState(false);
  const params = useParams();
  const storeId = params.id;
  const [
    {error: getStoreError, loading: getStoreIsLoading, data: store},
    refetchStore,
  ] = useAxios<Store>(`/stores/my-stores/${storeId}`);
  const [
    {error: getProductsError, loading: getProductsIsLoading, data: products},
    refetchProducts,
  ] = useAxios<Product[]>(`/stores/${storeId}/products`);
  const [{loading: createProductIsLoading}, executeCreateProduct] = useAxios(
    {
      url: '/products',
      method: 'POST',
    },
    {manual: true},
  );
  const form = useForm({
    validate: zodResolver(createProductSchema),
    initialValues: {
      name: '',
      description: '',
      price: 0,
      blurHash: '',
      image: '',
    },
  });

  const handleRefresh = () => {
    refetchStore();
    refetchProducts();
  };

  const handleRegisterNewProduct = form.onSubmit(
    ({blurHash, description, image, name, price}) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64 = reader.result as string;

        executeCreateProduct({
          data: {
            blurHash,
            description,
            image,
            name,
            price,
            storeId: store?.id || storeId,
          },
        })
          .then(() => {
            showNotification({
              message: 'Producto creado correctamente',
              color: 'green',
            });
            setNewProductDrawerOpened(false);
            refetchProducts();
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

  const handleAddButton = () => {
    setNewProductDrawerOpened(true);
  };

  if (!isCuid(storeId)) {
    return <NotFound404 message="Identificador inválido." />;
  }

  const renderProducts = () => {
    if (getProductsIsLoading) return <p>Cargando...</p>;

    if (getProductsError || !products) {
      return <NotFound404 message="No se encontró al negocio." />;
    }

    if (products.length === 0)
      return <p>No hay productos en tu negocio {store?.name}</p>;

    return (
      <Grid mt="md">
        {products.map(product => (
          <Grid.Col key={product.id} md={6} lg={3}>
            <ProductItem {...product} refetch={handleRefresh} />
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  const body = () => {
    if (getStoreIsLoading) return <p>Cargando...</p>;

    if (getStoreError || !store) {
      return <NotFound404 message="No se encontró al negocio." />;
    }

    return (
      <div>
        <Group position="apart">
          <Group>
            <Avatar src={store.logo} />
            <Title>Negocio: {store.name}</Title>
          </Group>

          <Button
            leftIcon={<Refresh />}
            variant="default"
            onClick={handleRefresh}
            loading={getStoreIsLoading}>
            REFRESCAR
          </Button>
          <Button
            leftIcon={<Plus />}
            variant="default"
            onClick={handleAddButton}
            loading={createProductIsLoading}>
            AGREGAR PRODUCTO
          </Button>
          <Badge>{getStoreCategory(store.category)}</Badge>
        </Group>

        <Text mt="md">Descripción: {store.description}</Text>
        <Text mt="xs">Dirección: {store.address}</Text>

        {renderProducts()}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <Drawer
        opened={newProductDrawerOpened}
        onClose={() => setNewProductDrawerOpened(false)}
        title="Crear Producto"
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        padding="xl"
        position="right"
        size="xl">
        <Paper>
          <form onSubmit={handleRegisterNewProduct}>
            <TextInput
              label="Nombre del Producto"
              placeholder="Ingresa el nombre del producto"
              required
              type="text"
              mt="md"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Descripción del Producto"
              placeholder="Ingresa la descripción del producto"
              type="text"
              mt="md"
              {...form.getInputProps('description')}
            />
            {/* <TextInput
              label="Blur Hash del Producto"
              placeholder="Ingresa Blur Hash del producto"
              required
              type="text"
              mt="md"
              {...form.getInputProps('blurHash')}
            /> */}
            {/* <TextInput
              label="Identificador de negocio del producto"
              placeholder="Ingresa el identificador de negocio del producto"
              required
              type="text"
              mt="md"
              {...form.getInputProps('storeId')}
            /> */}
            <NumberInput
              mt="md"
              label="Precio del producto en soles"
              placeholder="Ingresa el precio del producto en soles"
              decimalSeparator=","
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              {...form.getInputProps('price')}
            />

            <FileInput
              label="Imagen del producto (2MB máximo)"
              placeholder="Ingresa la imagen del producto"
              withAsterisk
              mt="md"
              required
              accept="image/png,image/jpeg,image/jpg"
              icon={<Upload size={14} />}
              {...form.getInputProps('image')}
            />
            <Group mt="xl">
              <Button fullWidth type="submit" loading={createProductIsLoading}>
                Crear Producto
              </Button>
            </Group>
          </form>
        </Paper>
      </Drawer>

      {body()}
    </DashboardLayout>
  );
};
