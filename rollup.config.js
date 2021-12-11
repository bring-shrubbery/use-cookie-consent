import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: process.env.BUILD !== 'production',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: process.env.BUILD !== 'production',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    uglify(),
  ],
};
