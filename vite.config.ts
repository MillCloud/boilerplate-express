import { defineConfig } from 'vite';
import { VitePluginNode as node } from 'vite-plugin-node';
import path from 'path';
import pkg from './package.json';

export default defineConfig({
  optimizeDeps: {
    include: [...Object.keys(pkg.dependencies)],
  },
  plugins: [
    ...node({
      adapter: 'express',
      appPath: './src/vite.ts',
      exportName: 'server',
    }),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': `${path.resolve('src')}/`,
    },
  },
});
