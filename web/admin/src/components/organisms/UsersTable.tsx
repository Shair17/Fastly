import { Table } from '@mantine/core';

interface Props {
	children?: React.ReactNode;
	type?: 'admins' | 'users' | 'customers' | 'dealers';
}

const items = {
	admins: [
		'Nombre(s) y Apellidos',
		'Correo Electrónico',
		'DNI',
		'Teléfono',
		'Dirección',
		'Edad',
		'Fecha de Nacimiento',
		'Activo',
		'Baneado',
		'Razón de Baneo',
		'Creación',
		'Actualizado',
	],
	users: [
		'Nombre(s) y Apellidos',
		'Correo Electrónico',
		'Facebook ID',
		'DNI',
		'Teléfono',
		'Baneado',
		'Razón de Baneo',
		'Creación',
		'Actualizado',
	],
	customers: [
		'Nombre(s) y Apellidos',
		'Correo Electrónico',
		'DNI',
		'Teléfono',
		'Dirección',
		'Edad',
		'Fecha de Nacimiento',
		'Activo',
		'Baneado',
		'Razón de Baneo',
		'Creación',
		'Actualizado',
	],
	dealers: [
		'Nombre(s) y Apellidos',
		'Correo Electrónico',
		'DNI',
		'Teléfono',
		'Dirección',
		'Calificación',
		'Vehiculo',
		'Edad',
		'Fecha de Nacimiento',
		'Disponible',
		'Activo',
		'Baneado',
		'Razón de Baneo',
		'Creación',
		'Actualizado',
	],
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
