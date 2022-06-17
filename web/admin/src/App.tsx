import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';

import { Routes, Route } from 'react-router-dom';

import { NotFound404 } from './pages/404';

import { Index } from './pages/index';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgot-password';
import { NewPassword } from './pages/new-password';

import { Dashboard } from './pages/dashboard/index';
import { DashboardAdmins } from './pages/dashboard/admins';
import { DashboardUsers } from './pages/dashboard/users';
import { DashboardCustomers } from './pages/dashboard/customers';
import { DashboardDealers } from './pages/dashboard/dealers';
import useAxios from 'axios-hooks';
import { RequireAuth } from './components/hoc/RequireAuth';
import { useShowSessionIsExpired } from './hooks/useShowSessionIsExpired';

function App() {
	const [{ data }] = useAxios<number>('/admins/count');
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: '@fastly.admin/theme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	useShowSessionIsExpired();

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					colorScheme,
					colors: {
						brand: [
							'#FEF0E3',
							'#FEE9DA',
							'#FECDB6',
							'#FEAB92',
							'#FE8A77',
							'#FE554A',
							'#DA3639',
							'#B62534',
							'#93172E',
							'#790E2B',
						],
					},
					primaryColor: 'brand',
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<ModalsProvider>
					<NotificationsProvider>
						<Routes>
							<Route index element={<Index />} />
							<Route path="/login" element={<Login />} />
							{data === 0 && <Route path="/register" element={<Register />} />}
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/new-password" element={<NewPassword />} />

							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/dashboard/admins" element={<DashboardAdmins />} />
							<Route path="/dashboard/users" element={<DashboardUsers />} />
							<Route
								path="/dashboard/customers"
								element={<DashboardCustomers />}
							/>
							<Route path="/dashboard/dealers" element={<DashboardDealers />} />

							<Route path="*" element={<NotFound404 />} />
						</Routes>
					</NotificationsProvider>
				</ModalsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
