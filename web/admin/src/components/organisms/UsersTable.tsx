import { Table } from '@mantine/core';

interface Props {
	children?: React.ReactNode;
}

export const UsersTable = ({ children }: Props) => {
	return (
		<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
			<thead>
				<tr>
					<th></th>
					<th>Nombres y Apellidos</th>
					<th>Correo electrónico</th>
					<th>DNI</th>
					<th>Teléfono</th>
					<th>Dirección</th>
					<th>Edad</th>
					<th>Fecha de nacimiento</th>
					<th>Activo</th>
					<th>Baneado</th>
					<th>Razón de baneo</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</Table>
	);
};
