import { DashboardLayout } from '@fastly/components/templates/DashboardLayout';
import {
	Group,
	Grid,
	Paper,
	Text,
	Box,
	createStyles,
	Space,
} from '@mantine/core';
import { useSocketOrdersQueue } from '@fastly/hooks/useSocketOrdersQueue';
import { ShoppingCart } from 'tabler-icons-react';
import { getOrderStatus } from '@fastly/utils/getOrderStatus';

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
		lineHeight: 1.5,
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

export const DashboardOrders = () => {
	const { classes } = useStyles();
	const { ordersQueue } = useSocketOrdersQueue();

	return (
		<DashboardLayout>
			<Box px="md">
				<Group position="apart">
					<Text size="xl" weight="bold">
						Pedidos en cola (tiempo real): {ordersQueue.length}
					</Text>
				</Group>

				<Space h="lg" />

				{ordersQueue.length === 0 ? (
					<Text>No hay pedidos en cola actualmente.</Text>
				) : (
					<Grid>
						{ordersQueue.map((item) => (
							<Grid.Col key={item.id} md={6} lg={3}>
								<Paper withBorder p="md" radius="md">
									<Group position="apart">
										<Text size="xs" color="dimmed" className={classes.title}>
											Pedido • <span>{getOrderStatus(item.order.status)}</span>
										</Text>
										<ShoppingCart className={classes.icon} size={22} />
									</Group>

									<Group spacing="xs" mt={25}>
										{/**
										 * Reemplazar luego los siguientes datos...
										 * item.order.product.storeId => storeName
										 * item.order.product.description => storeStreet
										 * item.order.product.id => customerPhone
										 *
										 * Cambiar estos datos que vienen en el backend
										 */}
										<Text size="lg" weight={500} className={classes.diff}>
											{item.order.product.name} • S/.{item.order.product.name} •{' '}
											{item.order.quantity}{' '}
											{item.order.quantity > 1 ? 'unidades' : 'unidad'} •{' '}
											{item.order.product.storeId} •{' '}
											{item.order.product.description} • {item.order.product.id}
										</Text>
									</Group>

									<Text size="xs" color="dimmed" mt={7}>
										Coordenadas:
										<Text size="xs" color="dimmed">
											latitud: {item.coordinates.latitude}, longitud:{' '}
											{item.coordinates.longitude}
										</Text>
									</Text>
								</Paper>
							</Grid.Col>
						))}
					</Grid>
				)}
			</Box>
		</DashboardLayout>
	);
};
