import {
	Group,
	Text,
	Avatar,
	Box,
	UnstyledButton,
	Grid,
	Space,
	createStyles,
	Button,
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
	Refresh,
} from 'tabler-icons-react';
import { DashboardLayout } from '@fastly/components/templates/DashboardLayout';
import { useAdminStore } from '@fastly/stores/useAdminStore';
import { useDate } from '@fastly/hooks/useDate';
import useAxios from 'axios-hooks';
import { useSocketOrdersQueue } from '@fastly/hooks/useSocketOrdersQueue';
import { CardCount } from '@fastly/components/organisms/CardCount';
import { isFunction } from '@fastly/utils';

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
	const [{ error, loading, data: allCount }, refetchAllCount] = useAxios<{
		accounts: {
			adminsCount: number;
			usersCount: number;
			customersCount: number;
			dealersCount: number;
		};
		system: {
			stores: number;
			products: number;
			coupons: number;
			orders: number;
			ordersQueue: number;
		};
	}>('/admins/all-count');
	const { classes } = useStyles();
	const { ordersQueue } = useSocketOrdersQueue();
	const date = useDate();
	const name = useAdminStore((a) => a.name);
	const avatar = useAdminStore((a) => a.avatar);
	const email = useAdminStore((a) => a.email);
	const greeting = `${date.greeting}, ${name.split(' ')[0]}`;
	const nameInitials = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;

	const handleRefresh = () => {
		refetchAllCount();
	};

	const body = () => {
		if (loading) {
			return <p>Cargando...</p>;
		}

		if (error || !allCount) {
			console.log(error);
			return <p>Error!</p>;
		}

		const data = [
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: ShieldLock,
				title: 'Administradores',
				description: 'Cantidad de administradores en Fastly',
				count: allCount.accounts.adminsCount,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: User,
				title: 'Usuarios',
				description: 'Cantidad de usuarios en la aplicación de Fastly',
				count: allCount.accounts.usersCount,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: Users,
				title: 'Clientes',
				description: 'Cantidad de clientes en Fastly',
				count: allCount.accounts.customersCount,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: Motorbike,
				title: 'Repartidores',
				description: 'Cantidad de repartidores en Fastly',
				count: allCount.accounts.dealersCount,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: BuildingStore,
				title: 'Negocios',
				description: 'Cantidad de negocios en Fastly',
				count: allCount.system.stores,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: Archive,
				title: 'Productos',
				description: 'Cantidad de productos en Fastly',
				count: allCount.system.products,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: Tags,
				title: 'Cupones',
				description: 'Cantidad de cupones en Fastly',
				count: allCount.system.coupons,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: Archive,
				title: 'Pedidos',
				description: 'Cantidad de pedidos en Fastly',
				count: allCount.system.orders,
			},
			{
				classes: {
					title: classes.title,
					icon: classes.icon,
					diff: classes.diff,
				},
				Icon: ShoppingCart,
				title: 'Pedidos',
				description: 'Cantidad de pedidos en tiempo real en Fastly',
				count: ordersQueue.length || allCount.system.ordersQueue,
				isRealTime: true,
			},
		];

		return (
			<Grid>
				{data.map(
					(
						{ classes, Icon, count, description, title, isRealTime = false },
						key
					) => (
						<Grid.Col md={6} lg={3} key={key.toString()}>
							<CardCount
								classes={classes}
								Icon={Icon}
								count={count}
								title={title}
								description={description}
								isRealTime={isRealTime}
							/>
						</Grid.Col>
					)
				)}
			</Grid>
		);
	};

	return (
		<DashboardLayout>
			<Box px="md">
				<Group position="apart">
					<Text size="xl" weight="bold">
						{greeting}
					</Text>

					<Group>
						<Button
							leftIcon={<Refresh />}
							variant="default"
							onClick={handleRefresh}
							disabled={!isFunction(handleRefresh)}
							loading={loading}
						>
							REFRESCAR
						</Button>
						<UnstyledButton>
							<Group>
								<div>
									<Text align="right">Admin</Text>
									<Text size="xs" color="gray" align="right">
										{email}
									</Text>
								</div>
								<Avatar size={40} color="blue" src={avatar} alt={name}>
									{nameInitials}
								</Avatar>
							</Group>
						</UnstyledButton>
					</Group>
				</Group>

				<Space h="lg" />

				{body()}
			</Box>
		</DashboardLayout>
	);
};
