import { Fragment, useRef } from 'react';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Input,
	Text,
	Group,
	useMantineTheme,
} from '@mantine/core';
import { Ban, Check } from 'tabler-icons-react';
import { User } from '../../interfaces/appInterfaces';
import { useModals } from '@mantine/modals';
import { getEntityType } from '../../utils/getEntityType';
import { showNotification } from '@mantine/notifications';
import useAxios from 'axios-hooks';

interface Props extends User {
	type: 'admin' | 'user' | 'customer' | 'dealer';
	refetch: () => void;
}

export const UserTableItem = ({
	id,
	avatar,
	name,
	email,
	dni,
	phone,
	isBanned,
	banReason,
	facebookId,

	type,
	refetch,
}: Props) => {
	const theme = useMantineTheme();
	const modals = useModals();
	const inputRef = useRef<HTMLInputElement>(null);
	const [{ loading }, executeBanUser] = useAxios<
		{
			success: boolean;
		},
		{
			reason?: string;
		},
		any
	>(
		{
			url: `/users/${id}`,
			method: 'DELETE',
		},
		{ manual: true }
	);

	const openBanUser = () => {
		modals.openConfirmModal({
			title: `Banear ${getEntityType(type)}`,
			centered: true,
			children: (
				<Group grow>
					<Text size="sm" inline>
						¿Estás seguro que quieres banear a <strong>{name}</strong>?
					</Text>
					<Input
						ref={inputRef}
						defaultValue={banReason}
						placeholder="Razón de baneo"
					/>
				</Group>
			),
			labels: {
				confirm: `${isBanned ? 'Desbanear' : 'Banear'} a ${name}`,
				cancel: 'Cancelar',
			},
			confirmProps: { color: 'red' },
			onConfirm: () => {
				executeBanUser({
					data: {
						reason: inputRef.current?.value,
					},
				})
					.then(() => {
						showNotification({
							title: isBanned ? 'Desbaneado' : 'Baneado',
							message: `Usuario ${name} ${
								isBanned ? 'desbaneado' : 'baneado'
							} correctamente.`,
							color: 'green',
						});

						refetch();
					})
					.catch((error) => {
						showNotification({
							title: 'Error!',
							message: error.response.data.message,
							color: 'red',
						});
					});
			},
		});
	};

	return (
		<Fragment>
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
					<Text
						size="sm"
						color="gray"
						title={`Identificador de facebook: ${facebookId}`}
					>
						{facebookId}
					</Text>
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
					<Badge
						color={isBanned ? 'green' : 'red'}
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
					<ActionIcon
						title={`${isBanned ? 'Desbanear' : 'Banear'} a ${name}`}
						color={isBanned ? 'green' : 'red'}
						onClick={openBanUser}
					>
						{isBanned ? <Check size={16} /> : <Ban size={16} />}
					</ActionIcon>
				</td>
			</tr>
		</Fragment>
	);
};
