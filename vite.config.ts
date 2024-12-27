import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	plugins: [react(), EnvironmentPlugin('all')],
});
