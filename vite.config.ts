import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';
import url from 'node:url';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

var resolvePath = (p: string) => {
  return url.fileURLToPath(new URL(p, import.meta.url));
};

export default defineConfig({
  publicDir: false,
  esbuild: {
    legalComments: 'none',
  },
  plugins: [
    dts({
      outDir: resolvePath('./dist'),
      include: resolvePath('./lib'),
      // exclude: ['vite.config.*', 'rollup.config.*'],
    }),
    solidPlugin({
      include: 'lib/**/*',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  build: {
    target: tsconfig.compilerOptions.target,
    outDir: resolvePath('./dist'),
    cssCodeSplit: true,
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        preserveModules: false,
        exports: 'named',
        globals: {
          'solid-js': 'solidJs',
        },
      },
    },
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      name: pkg.name,
      entry: {
        'index': resolvePath('./lib/index.ts'),
        'with-increment-decrement': resolvePath(
          './lib/plugins/with-increment-decrement/index.ts'
        ),
        'with-limits': resolvePath('./lib/plugins/with-limits/index.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return 'index.js';
        }

        if (entryName === 'with-increment-decrement') {
          return 'plugins/with-increment-decrement/index.js';
        }

        if (entryName === 'with-limits') {
          return 'plugins/with-limits/index.js';
        }

        return '';
      },
    },
  },
});
