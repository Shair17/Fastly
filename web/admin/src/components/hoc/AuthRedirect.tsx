import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

interface Props {
	children: JSX.Element;
}

export const AuthRedirect = ({ children }: Props) => {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};
