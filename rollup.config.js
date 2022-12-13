// We use bable+rollup to transpile and potentially bundle our typescript
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";

//https://github.com/rollup/plugins/issues/1366
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
global['__filename'] = __filename;

const extensions = ['.js', '.ts' ];


function mkConfig(format, minified) {
  let minifiedSuffix = minified ? ".min" : "";

  let base = {
    format,
    file: `dist/bundled/index.${format}${minifiedSuffix}.js`,
    sourcemap: true,
  };

  if (minified) {
    base.plugins = [terser({sourceMap: true})]
  }
  if (format == "umd") {
    base.name = "xayn_ts_sdk"
  }

  return base;
}

export default {
  input: 'src/index.ts',
  output: [
    mkConfig('esm', false),
    mkConfig('esm', true),
    mkConfig('umd', false),
    mkConfig('umd', true),
  ],
  plugins: [
    // used to resolve node_module dependencies
    resolve({ extensions }),
    babel({
      extensions,
      //FIXME: Consider "runtime".
      babelHelpers: 'bundled',
      include: ['src/**/*.ts'],
    })
  ]
};
