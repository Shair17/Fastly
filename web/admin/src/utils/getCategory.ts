import { StoreCategory } from '@fastly/interfaces/appInterfaces';

export const getStoreCategory = (storeCategory: keyof typeof StoreCategory) => {
	return (
		{
			LICORERIA: 'Licorería',
			RESTAURANTE: 'Restaurante',
			MASCOTAS: 'Mascotas',
			MODA: 'Moda',
			TECNOLOGIA: 'Tecnología',
			JUGUETERIA: 'Juguetería',
			FARMACIA: 'Farmacia',
			CUIDADO_PERSONAL: 'Cuidado Personal',
			MAQUILLAJE: 'Maquillaje',
			FLORISTERIA: 'Floristería',
			TIENDA: 'Tienda',
			SUPERMERCADOS: 'Supermercado',
			LIBRERIA: 'Librería',
			JUGUERIA: 'Juguería',
			OTRO: 'Otro',
		}[storeCategory] || 'Desconocido'
	);
};
