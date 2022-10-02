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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getDefaultAvatar } from '@fastly/utils/getDefaultAvatar';
import { useForm, zodResolver } from '@mantine/form';
import useAxios from 'axios-hooks';
import { getRegisterErrorMessage } from '@fastly/utils/getErrorMessages';
import { registerSchema } from '@fastly/schemas/register-schema';
import { showNotification } from '@mantine/notifications';
import { useAuthStore, ITokens } from '@fastly/stores/useAuthStore';
import { AuthRedirect } from '@fastly/components/hoc/AuthRedirect';
import { Admin } from '@fastly/interfaces/appInterfaces';

const avatar = getDefaultAvatar(100);

export const Register = () => {
	const [{ loading }, executePost] = useAxios<ITokens & { admin: Admin }>(
		{
			url: '/auth/admin/register',
			method: 'POST',
		},
		{ manual: true }
	);
	const form = useForm({
		schema: zodResolver(registerSchema),
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			dni: '',
			phone: '',
			address: '',
			birthDate: '',
		},
	});
	const navigate = useNavigate();
	const location = useLocation();
	const setTokens = useAuthStore((s) => s.setTokens);
	// const setAdmin = useAdminStore((a) => a.setAdmin);

	// @ts-ignore
	const from = location.state?.from?.pathname || '/dashboard';

	const handleRegister = form.onSubmit(
		({ address, birthDate, dni, email, fullName, password, phone }) => {
			executePost({
				data: {
					address,
					birthDate: new Date(birthDate),
					dni,
					email,
					name: fullName,
					password,
					phone,
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
							message: getRegisterErrorMessage(error.response.data.message),
							color: 'red',
						});
					}
				});
		}
	);

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
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Ya tienes una cuenta?{' '}
					<Anchor component={Link} to="/login" size="sm">
						Iniciar sesión
					</Anchor>
				</Text>

				<Paper
					withBorder
					shadow="md"
					p={30}
					mt={30}
					radius="md"
					component="form"
					onSubmit={handleRegister}
				>
					<Center>
						<Avatar src={avatar} size="xl" radius={100} alt="Fastly avatar" />
					</Center>
					<TextInput
						label="Nombre(s) y Apellidos"
						placeholder="Tus nombre(s) y apellidos"
						required
						type="text"
						mt="md"
						{...form.getInputProps('fullName')}
					/>
					<TextInput
						label="Correo electrónico"
						placeholder="tucorreo@gmail.com"
						required
						type="email"
						mt="md"
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
					<PasswordInput
						label="Confirma tu contraseña"
						description="Aquí debes escribir la contraseña que pusiste arriba."
						placeholder="Confirma tu contraseña segura"
						required
						mt="md"
						{...form.getInputProps('confirmPassword')}
					/>
					<TextInput
						label="Documento Nacional de Identidad"
						placeholder="Tu Documento Nacional de Identidad"
						required
						type="number"
						maxLength={8}
						mt="md"
						{...form.getInputProps('dni')}
					/>
					<TextInput
						label="Número de celular"
						placeholder="Tu número de celular"
						required
						type="number"
						mt="md"
						{...form.getInputProps('phone')}
					/>
					<TextInput
						label="Dirección"
						placeholder="Tu dirección de casa o residencia"
						required
						type="text"
						mt="md"
						{...form.getInputProps('address')}
					/>
					<DatePicker
						label="Fecha de nacimiento"
						placeholder="Tu fecha de nacimiento"
						mt="md"
						required
						{...form.getInputProps('birthDate')}
					/>
					<Button fullWidth mt="xl" type="submit" loading={loading}>
						Registrarse
					</Button>
				</Paper>
			</Container>
		</AuthRedirect>
	);
};
