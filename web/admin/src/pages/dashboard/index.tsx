import {
	Group,
	Text,
	Avatar,
	Button,
	Box,
	UnstyledButton,
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
								{`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
							</Avatar>
						</Group>
					</UnstyledButton>
				</Group>
			</Box>
		</DashboardLayout>
	);
};
