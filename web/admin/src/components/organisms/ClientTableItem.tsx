import { FC, Fragment, useState } from 'react';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Button,
	Group,
	Modal,
	Paper,
	PasswordInput,
	Switch,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import useAxios from 'axios-hooks';
import { Customer } from '@fastly/interfaces/appInterfaces';
import { getEntityType } from '@fastly/utils/getEntityType';
import { showNotification } from '@mantine/notifications';
import { calcAgeFromDate } from '@fastly/utils/calcAgeFromDate';
import { useForm, zodResolver } from '@mantine/form';
import { registerSchema } from '@fastly/schemas/schemas';
import { getRegisterErrorMessage } from '@fastly/utils/getErrorMessages';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { formatDate } from '@fastly/utils/formatDate';
import { Pencil, Trash } from 'tabler-icons-react';

interface Props extends Customer {
	type: 'admin' | 'user' | 'customer' | 'dealer';
	refetch: () => void;
}

export const ClientTableItem: FC<Props> = ({
	address,
	avatar,
	birthDate,
	createdAt,
	dni,
	email,
	id,
	isActive,
	isBanned,
	name,
	phone,
	updatedAt,
	banReason,

	refetch,
	type,
}) => {
	const age = calcAgeFromDate(new Date(birthDate));
	const theme = useMantineTheme();
	const modals = useModals();
	const [editCustomerOpened, setEditCustomerOpened] = useState(false);
	const [{ loading: editCustomerIsLoading }, executeEditCustomer] = useAxios(
		{
			url: `/customers/${id}`,
			method: 'PUT',
		},
		{ manual: true }
	);
	const [_, executeDeleteCustomer] = useAxios(
		{
			url: `/customers/${id}`,
			method: 'DELETE',
		},
		{
			manual: true,
		}
	);
	const editForm = useForm({
		schema: zodResolver(registerSchema),
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

	const handleEditCustomer = editForm.onSubmit(
		({
			address,
			birthDate,
			dni,
			email,
			fullName,
			password,
			phone,
			isActive,
		}) => {
			executeEditCustomer({
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
					showNotification({
						message: 'Cliente editado correctamente',
						color: 'green',
					});
					setEditCustomerOpened(false);
					refetch();
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
			confirmProps: { color: 'red' },
			onConfirm: () => {
				executeDeleteCustomer()
					.then(() => {
						showNotification({
							title: 'Eliminado',
							message: `Cuenta de ${name} desactivada correctamente.`,
							color: 'green',
						});

						refetch();
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
			},
		});
	};

	return (
		<Fragment>
			<Modal
				opened={editCustomerOpened}
				onClose={() => setEditCustomerOpened(false)}
				title="Editar Cliente"
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
					<form onSubmit={handleEditCustomer}>
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
								loading={editCustomerIsLoading}
							>
								Editar Cliente
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
					<Text size="sm" color="gray" title={dni}>
						{dni}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={phone}>
						{phone}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={address} lineClamp={1}>
						{address}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={age.toString()}>
						{age.toString()}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={birthDate}>
						{dayjs(birthDate).format('DD/MM/YYYY')}
					</Text>
				</td>
				<td>
					<Badge
						color={isActive ? 'green' : 'red'}
						variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
					>
						{isActive ? 'Sí' : 'No'}
					</Badge>
				</td>
				<td>
					<Badge
						color={isBanned ? 'red' : 'green'}
						variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
					>
						{isBanned ? 'Sí' : 'No'}
					</Badge>
				</td>
				<td>
					<Text
						size="sm"
						color="gray"
						lineClamp={1}
						title={banReason || 'Nulo'}
					>
						{banReason || 'Nulo'}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={createdAt}>
						{formatDate(new Date(createdAt))}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={updatedAt}>
						{formatDate(new Date(updatedAt))}
					</Text>
				</td>
				<td>
					<Group spacing={0} position="right">
						<ActionIcon onClick={() => setEditCustomerOpened(true)}>
							<Pencil size={16} />
						</ActionIcon>
						<ActionIcon
							color="red"
							title={
								!isActive
									? 'No puedes eliminar a un usuario desactivado'
									: undefined
							}
							disabled={!isActive}
							onClick={openDeleteModal}
						>
							<Trash size={16} />
						</ActionIcon>
					</Group>
				</td>
			</tr>
		</Fragment>
	);
};
