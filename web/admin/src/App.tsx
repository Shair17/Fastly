import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import { Index } from './pages/index';
import { Login } from './pages/login';
import { ForgotPassword } from './pages/forgot-password';

function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</MantineProvider>
	);
}

export default App;
