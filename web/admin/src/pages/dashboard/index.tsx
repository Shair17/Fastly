import { useState } from 'react';
import {
	ActionIcon,
	AppShell,
	Burger,
	Group,
	Header,
	MediaQuery,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { Navbar } from '../../components/organisms/Navbar';
import { Logo } from '../../components/atoms/Logo';
import { MoonStars, Sun } from 'tabler-icons-react';

export const Dashboard = () => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			navbar={<Navbar hidden={!opened} />}
			header={
				<Header height={70} p="md">
					<Group sx={{ height: '100%' }} px={20} position="apart">
						<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
							<Burger
								opened={!opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						{/* <Logo /> */}
						<div>logo</div>

						<ActionIcon
							variant="default"
							onClick={() => toggleColorScheme()}
							size={30}
						>
							{colorScheme === 'dark' ? (
								<Sun size={16} />
							) : (
								<MoonStars size={16} />
							)}
						</ActionIcon>
					</Group>
				</Header>
			}
		>
			<Text>Resize app to see responsive navbar in action</Text>
		</AppShell>
	);
};
