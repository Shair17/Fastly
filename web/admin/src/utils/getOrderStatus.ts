import { OrderStatusEnum } from '@fastly/interfaces/appInterfaces';

export const getOrderStatus = (status: keyof typeof OrderStatusEnum) => {
	return (
		{
			CANCELLED: 'CANCELADO',
			PROBLEM: 'PROBLEMA',
			PENDING: 'PENDIENTE',
			SENT: 'ENVIADO',
			DELIVERED: 'ENTREGADO',
		}[status] || 'DESCONOCIDO'
	);
};
