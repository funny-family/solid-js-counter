import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import typescript from '@rollup/plugin-typescript';
import multi from '@rollup/plugin-multi-entry';
import { dts } from 'rollup-plugin-dts';
import url from 'node:url';

var resolvePath = (p: string) => {
  return url.fileURLToPath(new URL(p, import.meta.url));
};

export default defineConfig({
  input: './lib/index.ts',
  plugins: [
    esbuild({
      target: 'esnext',
    }),
    dts(),
  ],
  output: [
    {
      file: './dist/index.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: './dist/plugins/',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
});

// export default defineConfig([
//   // ----------------------- "counter" -----------------------
//   {
//     input: './lib/index.ts',
//     plugins: [
//       esbuild({
//         target: 'esnext',
//       }),
//       // typescript({
//       //   tsconfig: './tsconfig.json',
//       //   declaration: true,
//       //   exclude: ['vite.config.*', 'rollup.config.*', './lib/plugins/**'],
//       // }),
//     ],
//     output: [
//       {
//         file: './dist/counter/index.js',
//         format: 'esm',
//         sourcemap: true,
//         exports: 'named',
//       },
//     ],
//     external: ['solid-js'],
//   },
//   {
//     input: './lib/index.ts',
//     output: [{ file: './dist/counter/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
//   // ----------------------- "counter" -----------------------

//   // ----------------------- "with-increment-decrement plugin" -----------------------
//   {
//     input: './lib/plugins/with-increment-decrement/index.ts',
//     plugins: [
//       esbuild({
//         target: 'esnext',
//       }),
//     ],
//     output: [
//       {
//         file: './dist/plugins/with-increment-decrement/index.js',
//         format: 'esm',
//         sourcemap: true,
//         exports: 'named',
//       },
//     ],
//     external: ['solid-js'],
//   },
//   {
//     input: './lib/plugins/with-increment-decrement/index.ts',
//     output: [
//       {
//         file: './dist/plugins/with-increment-decrement/index.d.ts',
//         format: 'esm',
//       },
//     ],
//     plugins: [dts()],
//   },
//   // ----------------------- "with-increment-decrement plugin" -----------------------
// ]);
