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
import { showNotification } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema } from '../schemas/login-schema';
import useAxios from 'axios-hooks';
import { getLoginErrorMessage } from '../utils/getErrorMessages';

export const Login = () => {
	const [{ data, loading, error }, executePost] = useAxios(
		{
			url: '/auth/admin/login',
			method: 'POST',
		},
		{ manual: true }
	);
	const form = useForm({
		schema: zodResolver(loginSchema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const handleLogin = form.onSubmit(({ email, password }) => {
		executePost({
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				const { accessToken, refreshToken } = res.data;
				console.log({ accessToken, refreshToken });
			})
			.catch((error) => {
				if (error?.response?.data.message) {
					showNotification({
						title: 'Error!',
						message: getLoginErrorMessage(error.response.data.message),
						color: 'red',
					});
				}
			});
	});

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

			<Paper
				component="form"
				onSubmit={handleLogin}
				withBorder
				shadow="md"
				p={30}
				mt={30}
				radius="md"
			>
				<TextInput
					label="Correo electrónico"
					placeholder="tucorreo@gmail.com"
					type="email"
					required
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					label="Contraseña"
					placeholder="Tu contraseña segura"
					description="Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
					required
					mt="md"
					{...form.getInputProps('password')}
				/>
				<Group position="apart" mt="md">
					<Anchor component={Link} to="/forgot-password" size="sm">
						Olvidaste tu contraseña?
					</Anchor>
				</Group>
				<Button type="submit" fullWidth mt="xl" loading={loading}>
					Iniciar sesión
				</Button>
			</Paper>
		</Container>
	);
};
