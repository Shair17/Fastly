import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import { Index } from './pages/index';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgot-password';
import { NewPassword } from './pages/new-password';

function App() {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: 'dark' }}
		>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/new-password" element={<NewPassword />} />
			</Routes>
		</MantineProvider>
	);
}

export default App;
