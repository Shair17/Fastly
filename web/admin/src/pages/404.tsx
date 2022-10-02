import {
	createStyles,
	Container,
	Title,
	Text,
	Button,
	Group,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Illustration } from '@fastly/components/atoms/Illustration';

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	inner: {
		position: 'relative',
	},

	image: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		zIndex: 0,
		opacity: 0.75,
	},

	content: {
		paddingTop: 220,
		position: 'relative',
		zIndex: 1,

		[theme.fn.smallerThan('sm')]: {
			paddingTop: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5,
	},
}));

export function NotFound404() {
	const { classes } = useStyles();

	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>Nada que ver aquí</Title>
					<Text
						color="dimmed"
						size="lg"
						align="center"
						className={classes.description}
					>
						La página que intenta abrir no existe. Puede que hayas escrito mal
						la dirección, o la página se ha movido a otra URL. Si usted piensa
						esto es un error, póngase en contacto con el soporte.
					</Text>
					<Group position="center">
						<Button component={Link} to="/" size="md">
							Regresar a Inicio
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	);
}
