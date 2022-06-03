import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';
import { Routes, Route } from 'react-router-dom';
import { Index } from './pages/index';
import { Login } from './pages/login';
import { ForgotPassword } from './pages/forgot-password';

function App() {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: '@fastly.customer/theme',
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
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Routes>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
