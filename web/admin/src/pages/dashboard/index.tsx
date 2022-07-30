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
} from '@mantine/core';
import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { useAdminStore } from '../../stores/useAdminStore';
import { useDate } from '../../hooks/useDate';

export const Dashboard = () => {
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
								<Text size="xs" color="dimmed">
									title
								</Text>
							</Group>

							<Group align="flex-end" spacing="xs" mt={25}>
								<Text>value</Text>
								<Text
									// color={stat.diff > 0 ? 'teal' : 'red'}
									size="sm"
									weight={500}
									// className={classes.diff}
								>
									<span>1%</span>
									{/* <DiffIcon size={16} stroke={1.5} /> */}
								</Text>
							</Group>

							<Text size="xs" color="dimmed" mt={7}>
								Compared to previous month
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						2
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						3
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						4
					</Grid.Col>
				</Grid>
			</Box>
		</DashboardLayout>
	);
};
