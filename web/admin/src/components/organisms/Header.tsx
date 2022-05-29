import { FC } from 'react';
import {
	Header as MantineHeader,
	Text,
	ActionIcon,
	Group,
	MediaQuery,
	Anchor,
	Burger,
	useMantineTheme,
	useMantineColorScheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo';
import { MoonStars, Sun } from 'tabler-icons-react';

interface Props {
	children?: React.ReactNode;
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<Props> = ({ children, opened, setOpened }) => {
	const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<MantineHeader height={70} p="md">
			<Group sx={{ height: '100%' }} px={20} position="apart">
				<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
					<Burger
						opened={opened}
						onClick={() => setOpened((o) => !o)}
						size="sm"
						color={theme.colors.gray[6]}
						mr="xl"
					/>
				</MediaQuery>

				<Group>
					<Anchor
						component={Link}
						underline={false}
						to="/dashboard"
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Logo style={{ height: '1.75rem', marginRight: '0.5rem' }} />
						<Text
							size="xl"
							weight="bold"
							color="gray"
							variant="text"
							underline={false}
							style={{ display: 'inline-block', alignSelf: 'center' }}
						>
							Fastly
						</Text>
					</Anchor>
				</Group>

				<Group>
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
			</Group>
		</MantineHeader>
	);
};
