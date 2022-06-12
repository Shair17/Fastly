import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Group,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';
import { Admin } from '../../interfaces/appInterfaces';
import dayjs from 'dayjs';

interface Props extends Admin {}

export const UserTableItem = ({
	id,
	avatar,
	createdAt,
	updatedAt,
	name,
	email,
	dni,
	phone,
	address,
	age,
	birthDate,
	isActive,
	isBanned,
	banReason,
}: Props) => {
	const theme = useMantineTheme();

	return (
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
				<Anchor<'a'> size="sm" href="mailto:hello@shair.dev" title={email}>
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
					{age}
				</Text>
			</td>
			<td>
				<Text size="sm" color="gray" title={birthDate}>
					{dayjs(birthDate).format('DD/MM/YYYY')}
				</Text>
			</td>
			<td>
				<Badge
					color="green"
					variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
				>
					{isActive ? 'Sí' : 'No'}
				</Badge>
			</td>
			<td>
				<Badge
					color="red"
					variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
				>
					{isBanned ? 'Sí' : 'No'}
				</Badge>
			</td>
			<td>
				<Text size="sm" color="gray" lineClamp={1} title={banReason || 'Nulo'}>
					{banReason || 'Nulo'}
				</Text>
			</td>
			<td>
				<Group spacing={0} position="right">
					<ActionIcon>
						<Pencil size={16} />
					</ActionIcon>
					<ActionIcon color="red">
						<Trash size={16} />
					</ActionIcon>
				</Group>
			</td>
		</tr>
	);
};
