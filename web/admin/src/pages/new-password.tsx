import {
	createStyles,
	Container,
	Title,
	Text,
	TextInput,
	Paper,
	Group,
	Anchor,
	Center,
	Box,
	Button,
	PasswordInput,
} from '@mantine/core';

export const NewPassword = () => {
	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				})}
			>
				Cambiar contraseña
			</Title>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<PasswordInput
					label="Contraseña"
					placeholder="Tu contraseña segura"
					required
					mt="md"
				/>
				<PasswordInput
					label="Confirmar contraseña"
					placeholder="Confirma tu contraseña segura"
					required
					mt="md"
				/>
				<Text color="dimmed" size="xs" align="justify" mt="sm">
					Asegúrate de que tenga mínimo ocho caracteres, al menos una letra
					mayúscula, una letra minúscula, un número y un carácter especial
				</Text>
				<Button fullWidth mt="xl">
					Cambiar contraseña
				</Button>
			</Paper>
		</Container>
	);
};
