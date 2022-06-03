import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';

function App() {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: '@fastly.dealer/theme',
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
				<div>dealer</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
