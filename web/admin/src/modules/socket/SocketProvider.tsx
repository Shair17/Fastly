import { Fragment, FC, PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useSocketStore } from '../../stores/useSocketStore';

export const SocketProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const accessToken = useAuthStore((t) => t.accessToken);
	const socket = useSocketStore((s) => s.socket);
	const setSocket = useSocketStore((s) => s.setSocket);
	const setOnline = useSocketStore((s) => s.setOnline);

	useEffect(() => {
		setSocket(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!socket) return;

		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		if (!socket) return;

		socket.on('connect', () => {
			setOnline(true);
			console.log('[Fastly] Connected to server.');
		});
	}, [socket]);

	useEffect(() => {
		if (!socket) return;

		socket.on('disconnect', () => {
			setOnline(false);
			console.log('[Fastly] Disconnected from server.');
		});
	}, [socket]);

	return <Fragment>{children}</Fragment>;
};
