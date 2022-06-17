export const getEntityType = (type: string): string => {
	return (
		{
			admin: 'Administrador',
			user: 'Usuario',
			customer: 'Cliente',
			dealer: 'Repartidor',
		}[type] || 'Entidad'
	);
};
