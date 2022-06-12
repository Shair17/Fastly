import { isLoggedIn } from '../../services/refresh-token.service';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
	children: JSX.Element;
}

export const AuthRedirect = ({ children }: Props) => {
	const isAuthenticated = isLoggedIn();

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};
