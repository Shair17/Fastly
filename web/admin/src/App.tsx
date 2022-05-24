import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';

import { Routes, Route } from 'react-router-dom';

import { NotFound404 } from './pages/404';

import { Index } from './pages/index';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgot-password';
import { NewPassword } from './pages/new-password';

import { Dashboard } from './pages/dashboard/index';

function App() {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: '@fastly.admin/theme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{ colorScheme }}
				withGlobalStyles
				withNormalizeCSS
			>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/new-password" element={<NewPassword />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<NotFound404 />} />
				</Routes>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
