import { DashboardLayout } from '../../components/templates/DashboardLayout';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Group,
	Grid,
	Paper,
	Table,
	Text,
	useMantineTheme,
	Box,
	createStyles,
	Space,
} from '@mantine/core';
import { useSocketOrdersQueue } from '../../hooks/useSocketOrdersQueue';
import { ShoppingCart } from 'tabler-icons-react';

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
						{ordersQueue.map((item, key) => (
							<Grid.Col key={key.toString()} md={6} lg={3}>
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
						))}
					</Grid>
				)}
			</Box>
		</DashboardLayout>
	);
};
