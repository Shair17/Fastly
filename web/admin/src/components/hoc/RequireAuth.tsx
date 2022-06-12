import { isLoggedIn } from '../../services/refresh-token.service';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
	children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {
	const isAuthenticated = isLoggedIn();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
