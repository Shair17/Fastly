import { useState } from 'react';
import {
	Navbar as MantineNavbar,
	SegmentedControl,
	Text,
	createStyles,
	ScrollArea,
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	ShieldLock,
	User,
	Users,
	Settings,
	Logout,
	Motorbike,
} from 'tabler-icons-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { isLoggedIn } from '../../services/refresh-token.service';

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
			link: '/dashboard/admins',
			label: 'Administradores',
			icon: ShieldLock,
		},
		{
			link: '/dashboard/users',
			label: 'Usuarios',
			icon: User,
		},
		{
			link: '/dashboard/customers',
			label: 'Clientes',
			icon: Users,
		},
		{
			link: '/dashboard/dealers',
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
	// const [active, setActive] = useState('Billing');
	const { pathname } = useLocation();
	const removeTokens = useAuthStore((s) => s.removeTokens);
	const navigate = useNavigate();

	const logOut = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault();
		removeTokens();
		navigate('/login', { replace: true });
	};

	// @ts-ignore
	const links = tabs[section].map((item) => (
		<Link
			to={item.link}
			key={item.label}
			className={cx(classes.link, {
				[classes.linkActive]: pathname === item.link,
			})}
			// onClick={(event) => {
			// setActive(item.label);
			// }}
		>
			<item.icon className={classes.linkIcon} />
			<span>{item.label}</span>
		</Link>
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
				<a href="#" className={classes.link} onClick={logOut}>
					<Logout className={classes.linkIcon} />
					<span>Cerrar sesión</span>
				</a>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};
