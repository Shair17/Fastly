export enum OrderStatus {
	// El usuario tendrá 1 minuto para poder su orden, por eso agregamos esta opción.
	CANCELLED = 'Cancelado',
	// La orden tiene un problema, por ´x´ o ´y´ razón.
	PROBLEM = 'Problema',
	// La orden aún está pendiente de recojo del negocio.
	PENDING = 'Pendiente',
	// El repartidor ha recogido el pedido y está llevandolo a su destino.
	SENT = 'Enviado',
	// La orden ha sido entregada con éxito.
	DELIVERED = 'Entregado',
}
