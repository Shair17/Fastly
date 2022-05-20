import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Container,
	Group,
	Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';

export const Login = () => {
	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				})}
			>
				Bienvenido a Fastly!
			</Title>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Correo electrónico"
					placeholder="tucorreo@gmail.com"
					type="email"
					required
				/>
				<PasswordInput
					label="Contraseña"
					placeholder="Tu contraseña segura"
					required
					mt="md"
				/>
				<Group position="apart" mt="md">
					<Anchor component={Link} to="/forgot-password" size="sm">
						Olvidaste tu contraseña?
					</Anchor>
				</Group>
				<Button fullWidth mt="xl">
					Iniciar sesión
				</Button>
			</Paper>
		</Container>
	);
};
