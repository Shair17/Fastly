import { Table } from '@mantine/core';

interface Props {
	children?: React.ReactNode;
	type?: 'admins' | 'users' | 'customers' | 'dealers';
}

const items = {
	admins: [
		'Nombres y Apellidos',
		'Correo Electrónico',
		'DNI',
		'Teléfono',
		'Dirección',
		'Edad',
		'Fecha de nacimiento',
		'Activo',
		'Baneado',
		'Razón de baneo',
	],
	users: [
		'Nombres y Apellidos',
		'Correo Electrónico',
		'Facebook Id',
		'DNI',
		'Teléfono',
		'Baneado',
		'Razón de baneo',
	],
	customers: [],
	dealers: [],
};

export const UsersTable = ({ children, type = 'admins' }: Props) => {
	return (
		<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
			<thead>
				<tr>
					<th></th>

					{items[type].map((item, key) => (
						<th key={key.toString()}>{item}</th>
					))}

					<th></th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</Table>
	);
};
