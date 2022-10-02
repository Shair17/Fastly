import { useState } from 'react';
import {
	Drawer,
	Paper,
	useMantineTheme,
	TextInput,
	Group,
	Button,
	Select,
	Text,
} from '@mantine/core';
import { DashboardLayout } from '@fastly/components/templates/DashboardLayout';
import { MainAccount } from '@fastly/components/organisms/MainAccount';
import useAxios from 'axios-hooks';
import { Store } from '@fastly/interfaces/appInterfaces';
import { useForm, zodResolver } from '@mantine/form';
import { registerStoreSchema } from '@fastly/schemas/register-schema';
import { showNotification } from '@mantine/notifications';
import { TimeInput } from '@mantine/dates';

export const DashboardStores = () => {
	const theme = useMantineTheme();
	const [newStoreDrawerOpened, setNewStoreDrawerOpened] = useState(false);
	const [
		{ error: getStoresError, loading: getStoresIsLoading, data: stores },
		refetchStores,
	] = useAxios<Store[]>('/stores/admin');
	const [{ loading: createStoreIsLoading }, executeCreateStore] = useAxios(
		{
			url: '/stores',
			method: 'POST',
		},
		{ manual: true }
	);
	const form = useForm({
		schema: zodResolver(registerStoreSchema),
		initialValues: {
			owner: '',
			name: '',
			address: '',
			description: '',
			categoryDescription: '',
			openTime: new Date(),
			closeTime: new Date(),
			logo: '',
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
			executeCreateStore({
				data: {
					address,
					name,
					category,
					categoryDescription,
					description,
					logo,
					openTime,
					closeTime,
					owner,
				},
			})
				.then(() => {
					showNotification({
						message: 'Negocio creado correctamente',
						color: 'green',
					});
					setNewStoreDrawerOpened(false);
					refetchStores();
				})
				.catch((error) => {
					if (error?.response?.data.message) {
						showNotification({
							title: 'Error!',
							message: error.response.data.message,
							color: 'red',
						});
					}
				});
		}
	);

	const handleAddButton = () => {
		setNewStoreDrawerOpened(true);
	};

	const handleRefresh = () => {
		refetchStores();
	};

	const body = () => {
		if (getStoresIsLoading) return <p>Cargando...</p>;

		if (getStoresError || !stores) {
			return <p>Error!</p>;
		}

		if (stores.length === 0) {
			return <p>No hay datos.</p>;
		}

		return null;
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
				size="2xl"
			>
				<Paper>
					<form onSubmit={handleRegisterNewStore}>
						<TextInput
							label="Identificador del dueño"
							placeholder="Ingresa el identificador del dueño o cliente"
							required
							type="text"
							mt="md"
							{...form.getInputProps('owner')}
						/>

						<Group grow>
							<TextInput
								label="Nombre del negocio"
								placeholder="Ingresa el nombre del negocio"
								required
								type="text"
								mt="md"
								{...form.getInputProps('name')}
							/>
							<TextInput
								label="Logotipo del negocio"
								placeholder="Ingresa la url del logotipo del negocio"
								type="text"
								mt="md"
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
							{...form.getInputProps('owner')}
						/>

						<Group grow>
							<Select
								mt="md"
								data={[
									{ value: 'LICORERIA', label: 'Licorería' },
									{ value: 'RESTAURANTE', label: 'Restaurante' },
									{ value: 'MASCOTAS', label: 'Mascotas' },
									{ value: 'MODA', label: 'Moda' },
									{ value: 'TECNOLOGIA', label: 'Tecnología' },
									{ value: 'JUGUETERIA', label: 'Juguetería' },
									{ value: 'FARMACIA', label: 'Farmacia' },
									{ value: 'CUIDADO_PERSONAL', label: 'Cuidado Personal' },
									{ value: 'MAQUILLAJE', label: 'Maquillaje' },
									{ value: 'FLORISTERIA', label: 'Floristería' },
									{ value: 'TIENDA', label: 'Tienda' },
									{ value: 'SUPERMERCADOS', label: 'Supermercado' },
									{ value: 'LIBRERIA', label: 'Librería' },
									{ value: 'JUGUERIA', label: 'Juguería' },
									{ value: 'OTRO', label: 'Otro' },
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
								{...form.getInputProps('openTime')}
							/>

							<TimeInput
								format="12"
								label="Hora de cierre"
								placeholder="Hora de cierre del negocio"
								mt="md"
								clearable
								defaultValue={new Date()}
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

			<MainAccount
				title="Negocios 🏪"
				description={`Aquí podrás ver la lista de negocios en Fastly.${
					stores
						? ` Hay ${stores.length} negocio${stores.length !== 1 ? 's' : ''}.`
						: ''
				}`}
				handleAddButton={handleAddButton}
				addIsLoading={createStoreIsLoading}
				handleRefresh={handleRefresh}
				refreshIsLoading={getStoresIsLoading}
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
