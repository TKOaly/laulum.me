import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    json({
      preferConst: true,
      compact: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react-is/index.js': ['isValidElementType']
      },
    }),
    terser()
  ]
};
