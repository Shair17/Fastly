import {
	Group,
	Text,
	Avatar,
	Button,
	Box,
	UnstyledButton,
	Grid,
	Paper,
	Space,
	createStyles,
} from '@mantine/core';
import {
	ShieldLock,
	User,
	Users,
	Archive,
	Motorbike,
	ShoppingCart,
	Tags,
	BuildingStore,
} from 'tabler-icons-react';
import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { useAdminStore } from '../../stores/useAdminStore';
import { useDate } from '../../hooks/useDate';
import useAxios from 'axios-hooks';
import { useSocketOrdersQueue } from '../../hooks/useSocketOrdersQueue';

const useStyles = createStyles((theme) => ({
	root: {
		padding: theme.spacing.xl * 1.5,
	},

	value: {
		fontSize: 24,
		fontWeight: 700,
		lineHeight: 1,
	},

	diff: {
		lineHeight: 1,
		display: 'flex',
		alignItems: 'center',
	},

	icon: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[3]
				: theme.colors.gray[4],
	},

	title: {
		fontWeight: 700,
		textTransform: 'uppercase',
	},
}));

export const Dashboard = () => {
	const [{ data: accountsCount }] = useAxios<{
		adminsCount: number;
		customersCount: number;
		dealersCount: number;
		usersCount: number;
	}>('/admins/accouns-count');
	const { classes } = useStyles();
	const { ordersQueue } = useSocketOrdersQueue();
	const date = useDate();
	const name = useAdminStore((a) => a.name);
	const avatar = useAdminStore((a) => a.avatar);
	const email = useAdminStore((a) => a.email);
	const greeting = `${date.greeting}, ${name.split(' ')[0]}`;
	const nameInitials = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;

	return (
		<DashboardLayout>
			<Box px="md">
				<Group position="apart">
					<Text size="xl" weight="bold">
						{greeting}
					</Text>

					<UnstyledButton>
						<Group>
							<div>
								<Text align="right">Admin</Text>
								<Text size="xs" color="gray" align="right">
									{email}
								</Text>
							</div>
							<Avatar size={40} color="blue" src={avatar}>
								{nameInitials}
							</Avatar>
						</Group>
					</UnstyledButton>
				</Group>

				<Space h="lg" />

				<Grid>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Administradores
								</Text>
								<ShieldLock className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{accountsCount?.adminsCount || 0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de administradores en Fastly
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Usuarios
								</Text>
								<User className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{accountsCount?.usersCount || 0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de usuarios en la aplicación Fastly
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Clientes
								</Text>
								<Users className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{accountsCount?.customersCount || 0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de clientes en Fastly
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Repartidores
								</Text>
								<Motorbike className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{accountsCount?.dealersCount || 0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de repartidores en Fastly
							</Text>
						</Paper>
					</Grid.Col>

					{/** System */}
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Negocios
								</Text>
								<BuildingStore className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de negocios en Fastly
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Productos
								</Text>
								<Archive className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de productos en Fastly
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Cupones
								</Text>
								<Tags className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de cupones en Fastly
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<Paper withBorder p="md" radius="md">
							<Group position="apart">
								<Text size="xs" color="dimmed" className={classes.title}>
									Pedidos
								</Text>
								<ShoppingCart className={classes.icon} size={22} />
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text size="lg" weight={500} className={classes.diff}>
									<span>{ordersQueue.length || 0}</span>
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Cantidad de pedidos en tiempo real en Fastly
							</Text>
						</Paper>
					</Grid.Col>
				</Grid>
			</Box>
		</DashboardLayout>
	);
};
