import { useState } from 'react';
import {
	Button,
	Group,
	Drawer,
	useMantineTheme,
	Paper,
	TextInput,
	PasswordInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import useAxios from 'axios-hooks';
import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import { UsersTable } from '../../components/organisms/UsersTable';
import { AdminTableItem } from '../../components/organisms/AdminTableItem';
import { registerSchema } from '../../schemas/register-schema';
import { getRegisterErrorMessage } from '../../utils/getErrorMessages';
import { Admin } from '../../interfaces/appInterfaces';

export const DashboardAdmins = () => {
	const [newAdminDrawerOpened, setNewAdminDrawerOpened] = useState(false);
	const theme = useMantineTheme();
	const [
		{ error: getAdminsError, loading: getAdminsIsLoading, data: admins },
		refetchAdmins,
	] = useAxios<Admin[]>('/admins');
	const [{ loading: createAdminIsLoading }, executeCreateAdmin] = useAxios(
		{
			url: '/admins',
			method: 'POST',
		},
		{ manual: true }
	);
	const form = useForm({
		schema: zodResolver(registerSchema),
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			dni: '',
			phone: '',
			address: '',
			birthDate: '',
		},
	});

	const handleRegisterNewAdmin = form.onSubmit(
		({ address, birthDate, dni, email, fullName, password, phone }) => {
			executeCreateAdmin({
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
				.then((res) => {
					if (res.status === 200) {
						showNotification({
							message: 'Administrador creado correctamente',
							color: 'green',
						});
						setNewAdminDrawerOpened(false);
						refetchAdmins();
					} else {
						showNotification({
							title: 'Error!',
							message: 'Ocurrió un error al crear el administrador',
							color: 'red',
						});
					}
				})
				.catch((error) => {
					if (error?.response?.data.message) {
						showNotification({
							title: 'Error!',
							message: getRegisterErrorMessage(error.response.data.message),
							color: 'red',
						});
					}
				});
		}
	);

	const handleAddButton = () => {
		setNewAdminDrawerOpened(true);
	};

	const handleRefresh = () => {
		refetchAdmins();
	};

	const body = () => {
		if (getAdminsIsLoading) return <p>Cargando...</p>;

		if (getAdminsError || !admins) {
			console.error(getAdminsError);
			return <p>Error!</p>;
		}

		if (admins.length === 0) {
			return <p>No hay datos.</p>;
		}

		return (
			<UsersTable type="admins">
				{admins.map((admin) => (
					<AdminTableItem
						key={admin.id}
						{...admin}
						type="admin"
						refetch={refetchAdmins}
					/>
				))}
			</UsersTable>
		);
	};

	return (
		<DashboardLayout>
			<Drawer
				opened={newAdminDrawerOpened}
				onClose={() => setNewAdminDrawerOpened(false)}
				title="Crear Administrador"
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
					<form onSubmit={handleRegisterNewAdmin}>
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
							<Button fullWidth type="submit" loading={createAdminIsLoading}>
								Crear Administrador
							</Button>
						</Group>
					</form>
				</Paper>
			</Drawer>

			<MainAccount
				title="Administradores 🛡️"
				description="Aquí podrás ver la lista de administradores en Fastly"
				handleAddButton={handleAddButton}
				addIsLoading={createAdminIsLoading}
				handleRefresh={handleRefresh}
				refreshIsLoading={getAdminsIsLoading}
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
