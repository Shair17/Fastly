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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema } from '../schemas/login-schema';
import useAxios from 'axios-hooks';
import { useAuthStore, ITokens } from '../stores/useAuthStore';
// import { useAdminStore } from '../stores/useAdminStore';
import { getLoginErrorMessage } from '../utils/getErrorMessages';
import { AuthRedirect } from '../components/hoc/AuthRedirect';
import { Admin } from '../interfaces/appInterfaces';

export const Login = () => {
	const [{ data, loading, error }, executePost] = useAxios<
		ITokens & { admin: Admin }
	>(
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
	const navigate = useNavigate();
	const location = useLocation();
	const setTokens = useAuthStore((s) => s.setTokens);
	// const setAdmin = useAdminStore((a) => a.setAdmin);

	// @ts-ignore
	const from = location.state?.from?.pathname || '/dashboard';

	const handleLogin = form.onSubmit(({ email, password }) => {
		executePost({
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				const { admin, ...tokens } = res.data;
				setTokens(tokens);
				// setAdmin(admin);
			})
			.then(() => {
				navigate(from, { replace: true });
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
		<AuthRedirect>
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
		</AuthRedirect>
	);
};
