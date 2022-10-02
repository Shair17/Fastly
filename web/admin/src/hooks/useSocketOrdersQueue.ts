import { useState, useEffect } from 'react';
import { OrderClass } from '@fastly/interfaces/appInterfaces';
import { useSocketStore } from '@fastly/stores/useSocketStore';

export type OrdersStoreValues = {
	ordersCancelledQueue: OrderClass[];
	ordersDeliveredQueue: OrderClass[];
	ordersPendingQueue: OrderClass[];
	ordersProblemQueue: OrderClass[];
	ordersQueue: OrderClass[];
	ordersSentQueue: OrderClass[];
};

export const useSocketOrdersQueue = (): OrdersStoreValues => {
	const socket = useSocketStore((s) => s.socket);
	const [ordersQueueState, setOrdersQueue] = useState<OrdersStoreValues>({
		ordersCancelledQueue: [],
		ordersDeliveredQueue: [],
		ordersPendingQueue: [],
		ordersProblemQueue: [],
		ordersQueue: [],
		ordersSentQueue: [],
	});

	useEffect(() => {
		socket?.on('ORDERS_QUEUE', (ordersQueue: OrderClass[]) => {
			setOrdersQueue({
				...ordersQueueState,
				ordersQueue,
			});
		});

		return () => {
			socket?.off('ORDERS_QUEUE');
		};
	}, [socket]);

	useEffect(() => {
		socket?.on(
			'ORDERS_DELIVERED_QUEUE',
			(ordersDeliveredQueue: OrderClass[]) => {
				setOrdersQueue({
					...ordersQueueState,
					ordersDeliveredQueue,
				});
			}
		);

		return () => {
			socket?.off('ORDERS_DELIVERED_QUEUE');
		};
	}, [socket]);

	useEffect(() => {
		socket?.on(
			'ORDERS_CANCELLED_QUEUE',
			(ordersCancelledQueue: OrderClass[]) => {
				setOrdersQueue({
					...ordersQueueState,
					ordersCancelledQueue,
				});
			}
		);

		return () => {
			socket?.off('ORDERS_CANCELLED_QUEUE');
		};
	}, [socket]);

	useEffect(() => {
		socket?.on('ORDERS_PROBLEM_QUEUE', (ordersProblemQueue: OrderClass[]) => {
			setOrdersQueue({
				...ordersQueueState,
				ordersProblemQueue,
			});
		});

		return () => {
			socket?.off('ORDERS_PROBLEM_QUEUE');
		};
	}, [socket]);

	useEffect(() => {
		socket?.on('ORDERS_SENT_QUEUE', (ordersSentQueue: OrderClass[]) => {
			setOrdersQueue({
				...ordersQueueState,
				ordersSentQueue,
			});
		});

		return () => {
			socket?.off('ORDERS_SENT_QUEUE');
		};
	}, [socket]);

	useEffect(() => {
		socket?.on('ORDERS_PENDING_QUEUE', (ordersPendingQueue: OrderClass[]) => {
			setOrdersQueue({
				...ordersQueueState,
				ordersPendingQueue,
			});
		});

		return () => {
			socket?.off('ORDERS_PENDING_QUEUE');
		};
	}, [socket]);

	return ordersQueueState;
};
