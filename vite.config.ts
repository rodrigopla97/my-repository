import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/portfolio': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    test: {
        globals: false,
        environment: 'jsdom',
        setupFiles: './src/modules/main/tests/setup.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: [],
        }
    },
  };
})