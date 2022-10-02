import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		minify: 'esbuild',
		target: 'esnext',
	},
	plugins: [react()],
	publicDir: 'public',
	resolve: {
		alias: [{ find: '@fastly', replacement: path.resolve(__dirname, 'src') }],
	},
});
