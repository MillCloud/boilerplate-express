import { defineConfig } from 'vite';
import { VitePluginNode as node } from 'vite-plugin-node';
import path from 'path';

export default defineConfig({
  plugins: [
    ...node({
      adapter: 'express',
      appPath: './src/vite.ts',
      exportName: 'server',
      tsCompiler: 'swc',
    }),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': `${path.resolve('src')}/`,
    },
  },
});
