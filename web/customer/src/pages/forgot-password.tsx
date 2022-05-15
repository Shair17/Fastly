import {
	createStyles,
	Paper,
	Title,
	Text,
	TextInput,
	Button,
	Container,
	Group,
	Anchor,
	Center,
	Box,
} from '@mantine/core';
import { ArrowLeft } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
	title: {
		fontSize: 26,
		fontWeight: 900,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	controls: {
		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column-reverse',
		},
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			width: '100%',
			textAlign: 'center',
		},
	},
}));

export const ForgotPassword = () => {
	const { classes } = useStyles();

	return (
		<Container size={460} my={30}>
			<Title className={classes.title} align="center">
				Olvidaste tu contraseña?
			</Title>
			<Text color="dimmed" size="sm" align="center">
				Ingresa tu correo electrónico para recibir un enlace de restablecimiento
			</Text>

			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<TextInput
					label="Correo electrónico"
					placeholder="tucorreo@gmail.com"
					required
				/>
				<Group position="apart" mt="lg" className={classes.controls}>
					<Anchor color="dimmed" size="sm" className={classes.control}>
						<Center inline>
							<ArrowLeft size={12} />
							<Box ml={5}>Regresar a iniciar sesión</Box>
						</Center>
					</Anchor>
					<Button className={classes.control}>Enviar</Button>
				</Group>
			</Paper>
		</Container>
	);
};
