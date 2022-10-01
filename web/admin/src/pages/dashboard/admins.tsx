import { useState } from 'react';
import {
	Modal,
	Button,
	Group,
	useMantineTheme,
	Paper,
	TextInput,
	PasswordInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import { UsersTable } from '../../components/organisms/UsersTable';
import { AdminTableItem } from '../../components/organisms/AdminTableItem';
import { registerSchema } from '../../schemas/register-schema';
import { DatePicker } from '@mantine/dates';
import useAxios from 'axios-hooks';
import { getRegisterErrorMessage } from '../../utils/getErrorMessages';
import { Admin } from '../../interfaces/appInterfaces';

export const DashboardAdmins = () => {
	const [newAdminModalOpened, setNewAdminModalOpened] = useState(false);
	const theme = useMantineTheme();
	const [
		{ error: getAdminsError, loading: getAdminsLoading, data: admins },
		refetchAdmins,
	] = useAxios<Admin[]>('/admins');
	const [{ loading }, executePost] = useAxios(
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

	const handleRegister = form.onSubmit(
		({ address, birthDate, dni, email, fullName, password, phone }) => {
			executePost({
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
						setNewAdminModalOpened(false);
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
		setNewAdminModalOpened(true);
	};

	const handleRefresh = () => {
		refetchAdmins();
	};

	const body = () => {
		if (getAdminsLoading) return <p>Cargando...</p>;

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
			<Modal
				opened={newAdminModalOpened}
				onClose={() => setNewAdminModalOpened(false)}
				title="Crear Administrador"
				centered
				size="lg"
				overlayColor={
					theme.colorScheme === 'dark'
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<Paper>
					<form onSubmit={handleRegister}>
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
							<Button fullWidth color="blue" type="submit" loading={loading}>
								Crear Administrador
							</Button>
						</Group>
					</form>
				</Paper>
			</Modal>

			<MainAccount
				title="Administradores 🛡️"
				description="Aquí podrás ver la lista de administradores en Fastly"
				handleAddButton={handleAddButton}
				handleRefresh={handleRefresh}
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
