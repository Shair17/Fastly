import { useState } from 'react';
import {
	Navbar as MantineNavbar,
	SegmentedControl,
	Text,
	createStyles,
	ScrollArea,
} from '@mantine/core';
import {
	ShieldLock,
	User,
	Users,
	ShoppingCart,
	Settings,
	Logout,
	Motorbike,
	BuildingStore,
} from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef('icon');

	return {
		navbar: {
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		},

		title: {
			textTransform: 'uppercase',
			letterSpacing: -0.25,
		},

		link: {
			...theme.fn.focusStyles(),
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			fontSize: theme.fontSizes.sm,
			color:
				theme.colorScheme === 'dark'
					? theme.colors.dark[1]
					: theme.colors.gray[7],
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,

			'&:hover': {
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.colors.dark[7]
						: theme.colors.gray[0],
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,

				[`& .${icon}`]: {
					color: theme.colorScheme === 'dark' ? theme.white : theme.black,
				},
			},
		},

		linkIcon: {
			ref: icon,
			color:
				theme.colorScheme === 'dark'
					? theme.colors.dark[2]
					: theme.colors.gray[6],
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
						: theme.colors[theme.primaryColor][0],
				color:
					theme.colors[theme.primaryColor][
						theme.colorScheme === 'dark' ? 4 : 7
					],
				[`& .${icon}`]: {
					color:
						theme.colors[theme.primaryColor][
							theme.colorScheme === 'dark' ? 4 : 7
						],
				},
			},
		},

		footer: {
			borderTop: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[4]
					: theme.colors.gray[3]
			}`,
			paddingTop: theme.spacing.md,
		},
	};
});

const tabs = {
	accounts: [
		{
			link: '',
			label: 'Administradores',
			icon: ShieldLock,
		},
		{
			link: '',
			label: 'Usuarios',
			icon: User,
		},
		{
			link: '',
			label: 'Clientes',
			icon: Users,
		},
		{
			link: '',
			label: 'Repartidores',
			icon: Motorbike,
		},
	],
	system: [
		// {
		// 	link: '',
		// 	label: 'Orders',
		// 	icon: ShoppingCart,
		// },
	],
};

interface Props {
	hidden: boolean;
}

export const Navbar = ({ hidden }: Props) => {
	const { classes, cx } = useStyles();
	const [section, setSection] = useState('accounts');
	const [active, setActive] = useState('Billing');

	const links = tabs[section].map((item) => (
		<a
			className={cx(classes.link, {
				[classes.linkActive]: item.label === active,
			})}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} />
			<span>{item.label}</span>
		</a>
	));

	return (
		<MantineNavbar
			hidden={!hidden}
			hiddenBreakpoint="sm"
			width={{ sm: 300 }}
			p="md"
			className={classes.navbar}
		>
			<MantineNavbar.Section>
				<Text
					weight={500}
					size="sm"
					className={classes.title}
					color="dimmed"
					mb="xs"
				>
					bgluesticker@mantine.dev
				</Text>

				<SegmentedControl
					value={section}
					onChange={setSection}
					transitionTimingFunction="ease"
					fullWidth
					data={[
						{ label: 'Cuentas', value: 'accounts' },
						{ label: 'Sistema', value: 'system' },
					]}
				/>
			</MantineNavbar.Section>

			<MantineNavbar.Section grow component={ScrollArea} mt="xl">
				{links}
			</MantineNavbar.Section>

			<MantineNavbar.Section className={classes.footer}>
				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<Settings className={classes.linkIcon} />
					<span>Configuración</span>
				</a>
				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<Logout className={classes.linkIcon} />
					<span>Cerrar sesión</span>
				</a>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};
