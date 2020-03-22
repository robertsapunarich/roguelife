import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    file: 'public/dist/bundle.js',
    format: 'cjs'
  },
  plugins: [resolve(), typescript()]
};
