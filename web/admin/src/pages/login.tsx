import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from '@mantine/core';

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
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Aún no eres miembro?{' '}
				<Anchor<'a'>
					href="#"
					size="sm"
					onClick={(event) => event.preventDefault()}
				>
					Unirme
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Correo electrónico"
					placeholder="tucorreo@gmail.com"
					required
				/>
				<PasswordInput
					label="Contraseña"
					placeholder="Tu contraseña segura"
					required
					mt="md"
				/>
				<Group position="apart" mt="md">
					<Checkbox label="Recuérdame" />
					<Anchor<'a'>
						onClick={(event) => event.preventDefault()}
						href="#"
						size="sm"
					>
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
