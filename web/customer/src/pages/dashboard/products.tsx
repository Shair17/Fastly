import {useState} from 'react';
import {
  Drawer,
  Paper,
  useMantineTheme,
  Group,
  Button,
  TextInput,
  NumberInput,
} from '@mantine/core';
import {DashboardLayout} from '@fastly/components/templates/DashboardLayout';
import {MainAccount} from '@fastly/components/organisms/MainAccount';
import useAxios from 'axios-hooks';
import {Product} from '@fastly/interfaces/appInterfaces';
import {useForm, zodResolver} from '@mantine/form';
import {registerProductSchema} from '@fastly/schemas/schemas';
import {showNotification} from '@mantine/notifications';
import {GlobalTable} from '@fastly/components/organisms/GlobalTable';
import {ProductTableItem} from '@fastly/components/organisms/ProductTableItem';

export const DashboardProducts = () => {
  const theme = useMantineTheme();
  const [newProductDrawerOpened, setNewProductDrawerOpened] = useState(false);
  const [
    {error: getProductsError, loading: getProductsIsLoading, data: products},
    refetchProducts,
  ] = useAxios<Product[]>('/products');
  const [{loading: createProductIsLoading}, executeCreateProduct] = useAxios(
    {
      url: '/products',
      method: 'POST',
    },
    {manual: true},
  );
  const form = useForm({
    validate: zodResolver(registerProductSchema),
    initialValues: {
      name: '',
      description: '',
      price: 0,
      blurHash: '',
      storeId: '',
      image: '',
    },
  });

  const handleRegisterNewProduct = form.onSubmit(
    ({blurHash, description, image, name, price, storeId}) => {
      executeCreateProduct({
        data: {
          blurHash,
          description,
          image,
          name,
          price,
          storeId,
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
    },
  );

  const handleAddButton = () => {
    setNewProductDrawerOpened(true);
  };

  const handleRefresh = () => {
    refetchProducts();
  };

  const body = () => {
    if (getProductsIsLoading) return <p>Cargando...</p>;

    if (getProductsError || !products) return <p>Error!</p>;

    if (products.length === 0) return <p>No hay productos.</p>;

    return (
      <GlobalTable type="products">
        {products.map(product => (
          <ProductTableItem
            key={product.id}
            {...product}
            type="product"
            refetch={refetchProducts}
          />
        ))}
      </GlobalTable>
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
            <TextInput
              label="Blur Hash del Producto"
              placeholder="Ingresa Blur Hash del producto"
              required
              type="text"
              mt="md"
              {...form.getInputProps('blurHash')}
            />
            <TextInput
              label="Identificador de negocio del producto"
              placeholder="Ingresa el identificador de negocio del producto"
              required
              type="text"
              mt="md"
              {...form.getInputProps('storeId')}
            />
            <NumberInput
              label="Precio del producto en soles"
              placeholder="Ingresa el precio del producto en soles"
              decimalSeparator=","
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              {...form.getInputProps('price')}
            />
            <TextInput
              label="Imagen del producto"
              placeholder="Ingresa la URL de la imagen del producto"
              required
              type="text"
              mt="md"
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

      <MainAccount
        title="Productos 📦"
        description={`Aquí podrás ver la lista de productos en Fastly.${
          products
            ? ` Hay ${products.length} producto${
                products.length !== 1 ? 's' : ''
              }.`
            : ''
        }`}
        handleAddButton={handleAddButton}
        addIsLoading={createProductIsLoading}
        handleRefresh={handleRefresh}
        refreshIsLoading={getProductsIsLoading}>
        {body()}
      </MainAccount>
    </DashboardLayout>
  );
};
