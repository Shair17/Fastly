import { Table } from '@mantine/core';

type Type =
	| 'admins'
	| 'users'
	| 'customers'
	| 'dealers'
	| 'stores'
	| 'products';

interface Props {
	children?: React.ReactNode;
	type: Type;
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
	stores: [
		'ID del Negocio',
		'Nombre del Negocio',
		'Descripción del Negocio',
		'Dirección del Negocio',
		'Categoría',
		'Descripción de la Categoría',
		'ID del Dueño',
		'Correo del Dueño',
		'Hora de Apertura',
		'Hora de Cierre',
		'Creación',
		'Actualizado',
	],
	products: [
		'Nombre',
		'Descripción',
		'Precio',
		'Imagen',
		'Blur Hash (Código para efecto de desenfoque)',
		'ID del Negocio',
		'Creación',
		'Actualizado',
	],
};

export const GlobalTable = ({ children, type }: Props) => {
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
