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
	Select,
	Switch,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import useAxios from 'axios-hooks';
import { Dealer, Vehicle } from '@fastly/interfaces/appInterfaces';
import { getEntityType } from '@fastly/utils/getEntityType';
import { showNotification } from '@mantine/notifications';
import { calcAgeFromDate } from '@fastly/utils/calcAgeFromDate';
import { useForm, zodResolver } from '@mantine/form';
import { registerDealerSchema } from '@fastly/schemas/schemas';
import { getRegisterErrorMessage } from '@fastly/utils/getErrorMessages';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { formatDate } from '@fastly/utils/formatDate';
import { Pencil, Trash } from 'tabler-icons-react';
import { getVehicle } from '@fastly/utils/getVehicle';

interface Props extends Dealer {
	type: 'admin' | 'user' | 'customer' | 'dealer';
	refetch: () => void;
}

export const DealerTableItem: FC<Props> = ({
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
	available,
	ranking,
	vehicle,

	refetch,
	type,
}) => {
	const age = calcAgeFromDate(new Date(birthDate));
	const theme = useMantineTheme();
	const modals = useModals();
	const [editDealerOpened, setEditDealerOpened] = useState(false);
	const [{ loading: editDealerIsLoading }, executeEditDealer] = useAxios<
		any,
		{
			name: string;
			email: string;
			password: string;
			dni: string;
			phone: string;
			address: string;
			avatar?: string;
			birthDate: Date;
			isActive: boolean;
			available: boolean;
			isBanned: boolean;
			banReason?: string;
			vehicle: Vehicle;
		}
	>(
		{
			url: `/dealers/${id}`,
			method: 'PUT',
		},
		{ manual: true }
	);
	const [_, executeDeleteDealer] = useAxios(
		{
			url: `/dealers/${id}`,
			method: 'DELETE',
		},
		{
			manual: true,
		}
	);
	const editForm = useForm({
		schema: zodResolver(registerDealerSchema),
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
			available,
			isBanned,
			banReason: banReason || '',
			vehicle,
			avatar,
		},
	});

	const handleEditDealer = editForm.onSubmit(
		({
			address,
			birthDate,
			dni,
			email,
			fullName,
			password,
			phone,
			isActive,
			available,
			banReason,
			confirmPassword,
			isBanned,
			vehicle,
		}) => {
			if (password !== confirmPassword) return;

			executeEditDealer({
				data: {
					address,
					birthDate: new Date(birthDate),
					dni,
					email,
					name: fullName,
					password,
					phone,
					isActive,
					available,
					isBanned,
					vehicle,
					avatar,
					banReason,
				},
			})
				.then(() => {
					showNotification({
						message: 'Cliente editado correctamente',
						color: 'green',
					});
					setEditDealerOpened(false);
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
				executeDeleteDealer()
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
				opened={editDealerOpened}
				onClose={() => setEditDealerOpened(false)}
				title="Editar Repartidor"
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
					<form onSubmit={handleEditDealer}>
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
						<Group position="apart" grow>
							<Switch
								mt="md"
								label="Cuenta baneada"
								defaultChecked={isBanned}
								{...editForm.getInputProps('isBanned')}
							/>
							<TextInput
								label="Razón de Baneo"
								placeholder="Ingresa una razón para banear al repartidor"
								required={false}
								type="text"
								mt="md"
								{...editForm.getInputProps('banReason')}
							/>
						</Group>

						<Group grow>
							<Switch
								mt="md"
								label="Cuenta activada"
								defaultChecked={isActive}
								{...editForm.getInputProps('isActive')}
							/>

							<Switch
								mt="md"
								label="Disponible"
								defaultChecked={available}
								{...editForm.getInputProps('available')}
							/>
						</Group>

						<Select
							mt="md"
							data={['CARRO', 'MOTO', 'BICICLETA', 'PIE', 'NONE']}
							placeholder="Elige tu vehiculo"
							label="Tu vehiculo"
							{...editForm.getInputProps('vehicle')}
						/>

						<Group mt="xl">
							<Button
								fullWidth
								color="primary"
								type="submit"
								loading={editDealerIsLoading}
							>
								Editar Repartidor
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
					<Text
						size="sm"
						color="gray"
						title={ranking === 0 ? 'Sin Calificaciones' : ranking.toString()}
					>
						{ranking === 0 ? 'Sin Calificaciones' : ranking.toString()}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={getVehicle(vehicle)}>
						{getVehicle(vehicle)}
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
						color={available ? 'green' : 'red'}
						variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
					>
						{available ? 'Sí' : 'No'}
					</Badge>
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
						<ActionIcon onClick={() => setEditDealerOpened(true)}>
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
