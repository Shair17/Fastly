import { useState } from 'react';
import {
	Drawer,
	Group,
	Paper,
	PasswordInput,
	Button,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { DashboardLayout } from '@fastly/components/templates/DashboardLayout';
import { MainAccount } from '@fastly/components/organisms/MainAccount';
import useAxios from 'axios-hooks';
import { UsersTable } from '@fastly/components/organisms/UsersTable';
import { ClientTableItem } from '@fastly/components/organisms/ClientTableItem';
import { useForm, zodResolver } from '@mantine/form';
import { Customer } from '@fastly/interfaces/appInterfaces';
import { DatePicker } from '@mantine/dates';
import { registerSchema } from '@fastly/schemas/register-schema';
import { showNotification } from '@mantine/notifications';
import { getCreateNewCustomerErrorMessage } from '@fastly/utils/getErrorMessages';

const initialValues = {
	fullName: '',
	email: '',
	password: '',
	confirmPassword: '',
	dni: '',
	phone: '',
	address: '',
	birthDate: '',
};

export const DashboardCustomers = () => {
	const [newCustomerDrawerOpened, setNewCustomerDrawerOpened] = useState(false);
	const theme = useMantineTheme();
	const [
		{ error, loading: getCustomersIsLoading, data: customers },
		refetchCustomers,
	] = useAxios<Customer[]>({
		url: '/customers',
		method: 'GET',
	});
	const [{ loading: createCustomerIsLoading }, executeCreateCustomer] =
		useAxios(
			{
				url: '/customers',
				method: 'POST',
			},
			{ manual: true }
		);
	const form = useForm({
		schema: zodResolver(registerSchema),
		initialValues,
	});

	const handleRegisterNewCustomer = form.onSubmit(
		({ address, birthDate, dni, email, fullName, password, phone }) => {
			executeCreateCustomer({
				data: {
					address,
					birthDate: new Date(birthDate),
					dni,
					email,
					name: fullName,
					password,
					phone,
				},
			})
				.then(() => {
					showNotification({
						message: 'Cliente creado correctamente',
						color: 'green',
					});
					setNewCustomerDrawerOpened(false);
					refetchCustomers();
					form.setValues(initialValues);
				})
				.catch((error) => {
					if (error?.response?.data.message) {
						showNotification({
							title: 'Error!',
							message: getCreateNewCustomerErrorMessage(
								error.response.data.message
							),
							color: 'red',
						});
					}
				});
		}
	);

	const handleAddButton = () => {
		setNewCustomerDrawerOpened(true);
	};

	const handleRefresh = () => {
		refetchCustomers();
	};

	const body = () => {
		if (getCustomersIsLoading) return <p>Cargando...</p>;

		if (error || !customers) {
			console.log(error);
			return <p>Error!</p>;
		}

		if (customers.length === 0) {
			return <p>No hay datos.</p>;
		}

		return (
			<UsersTable type="customers">
				{customers.map((customer) => (
					<ClientTableItem
						key={customer.id}
						{...customer}
						type="customer"
						refetch={refetchCustomers}
					/>
				))}
			</UsersTable>
		);
	};

	return (
		<DashboardLayout>
			<Drawer
				opened={newCustomerDrawerOpened}
				onClose={() => setNewCustomerDrawerOpened(false)}
				title="Crear Cliente"
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
					<form onSubmit={handleRegisterNewCustomer}>
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

						<Group mt="xl">
							<Button fullWidth type="submit" loading={createCustomerIsLoading}>
								Crear Cliente
							</Button>
						</Group>
					</form>
				</Paper>
			</Drawer>

			<MainAccount
				title="Clientes ✨"
				description={`Aquí podrás ver la lista de clientes en Fastly.${
					customers
						? ` Hay ${customers.length} cliente${
								customers.length !== 1 ? 's' : ''
						  }.`
						: ''
				}`}
				addIsLoading={createCustomerIsLoading}
				handleAddButton={handleAddButton}
				handleRefresh={handleRefresh}
				refreshIsLoading={getCustomersIsLoading}
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
