import {
	Container,
	Title,
	Paper,
	TextInput,
	Text,
	PasswordInput,
	Avatar,
	Center,
	Anchor,
	Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Link } from 'react-router-dom';
import { getDefaultAvatar } from '../utils/getDefaultAvatar';

const avatar = getDefaultAvatar(100);

export const Register = () => {
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
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Ya tienes una cuenta?{' '}
				<Anchor component={Link} to="/login" size="sm">
					Iniciar sesión
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<Center>
					<Avatar src={avatar} size="xl" radius={100} alt="Fastly avatar" />
				</Center>
				<TextInput
					label="Nombre(s) y Apellidos"
					placeholder="Tus nombre(s) y apellidos"
					required
					type="text"
					mt="md"
				/>
				<TextInput
					label="Correo electrónico"
					placeholder="tucorreo@gmail.com"
					required
					type="email"
					mt="md"
				/>
				<PasswordInput
					label="Contraseña"
					placeholder="Tu contraseña segura"
					required
					mt="md"
				/>
				<PasswordInput
					label="Confirma tu contraseña"
					placeholder="Confirma tu contraseña segura"
					required
					mt="md"
				/>
				<TextInput
					label="Documento Nacional de Identidad"
					placeholder="Tu Documento Nacional de Identidad"
					required
					type="number"
					mt="md"
				/>
				<TextInput
					label="Número de celular"
					placeholder="Tu número de celular"
					required
					type="number"
					mt="md"
				/>
				<TextInput
					label="Dirección"
					placeholder="Tu dirección de casa o residencia"
					required
					type="text"
					mt="md"
				/>
				<DatePicker
					label="Fecha de nacimiento"
					placeholder="Tu fecha de nacimiento"
					mt="md"
					required
				/>
				<Button fullWidth mt="xl">
					Registrarse
				</Button>
			</Paper>
		</Container>
	);
};
