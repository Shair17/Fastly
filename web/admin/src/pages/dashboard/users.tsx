import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Group,
	Table,
	Text,
	useMantineTheme,
	Modal,
	Button,
	Paper,
	TextInput,
	PasswordInput,
} from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { UsersTable } from '../../components/organisms/UsersTable';
import { UserTableItem } from '../../components/organisms/UserTableItem';
import { useAdminsStore } from '../../stores/useAdminsStore';
import { registerSchema } from '../../schemas/register-schema';
import { DatePicker } from '@mantine/dates';
import useAxios from 'axios-hooks';
import { showNotification } from '@mantine/notifications';
import { getRegisterErrorMessage } from '../../utils/getErrorMessages';

export const DashboardUsers = () => {
	const theme = useMantineTheme();
	const [{ error, loading, data, response }, executePost] = useAxios({
		url: '/users',
		method: 'GET',
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error!</p>;

	return (
		<DashboardLayout>
			<MainAccount
				title="Usuarios 📱"
				description="Aquí podrás ver la lista de usuarios de la aplicación de Fastly"
				addButtonDisabled
			>
				<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
					<thead>
						<tr>
							<th>Nombres y Apellidos</th>
							<th>Correo electrónico</th>
							<th>DNI</th>
							<th>Teléfono</th>
							<th>Dirección</th>
							<th>Edad</th>
							<th>Fecha de nacimiento</th>
							<th>Activo</th>
							<th>Baneado</th>
							<th>Razón de baneo</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<Group spacing="sm">
									<Avatar size={30} radius={30} />
									<Text size="sm" weight={500}>
										Jimmy Morales
									</Text>
								</Group>
							</td>
							<td>
								<Anchor<'a'> size="sm" href="mailto:hello@shair.dev">
									hello@shair.dev
								</Anchor>
							</td>
							<td>
								<Text size="sm" color="gray">
									74408267
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									966107266
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									Ricardo Palma 200, Chequen
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									20
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									29/11/2001
								</Text>
							</td>
							<td>
								<Badge
									color="green"
									variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
								>
									Si
								</Badge>
							</td>
							<td>
								<Badge
									color="red"
									variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
								>
									No
								</Badge>
							</td>
							<td>
								<Text size="sm" color="gray">
									Nula
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

						{/** Jorge */}
						<tr>
							<td>
								<Group spacing="sm">
									<Avatar size={30} radius={30} />
									<Text size="sm" weight={500}>
										Jorge Malca
									</Text>
								</Group>
							</td>
							<td>
								<Anchor<'a'> size="sm" href="mailto:hello@shair.dev">
									jorge@gmail.com
								</Anchor>
							</td>
							<td>
								<Text size="sm" color="gray">
									65456237
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									900100233
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									Rivera 300, Chepén
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									20
								</Text>
							</td>
							<td>
								<Text size="sm" color="gray">
									30/10/2001
								</Text>
							</td>
							<td>
								<Badge
									color="green"
									variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
								>
									Si
								</Badge>
							</td>
							<td>
								<Badge
									color="red"
									variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
								>
									No
								</Badge>
							</td>
							<td>
								<Text size="sm" color="gray">
									Nula
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
					</tbody>
				</Table>
			</MainAccount>
		</DashboardLayout>
	);
};
