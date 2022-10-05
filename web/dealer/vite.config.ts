import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://dev.to/abdeldjalilhachimi/how-to-avoid-long-path-import-using-react-with-ts-and-vite-4e2h
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
