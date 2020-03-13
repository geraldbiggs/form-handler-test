import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import analyze from "rollup-plugin-analyzer";
import path from "path";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";

let plugins = [
  peerDepsExternal(),
  alias({
    entries: []
  }),
  resolve({
    // pass custom options to the resolve plugin
    customResolveOptions: {
      moduleDirectory: "node_modules"
    }
  }),
  babel({
    runtimeHelpers: true,
    exclude: "node_modules/**" // only transpile our source code
  }),
  commonjs(),
  terser()
];

let config = {
  global: {
    external: ["@vue/composition-api", "vue"]
  },
  input: "./src/toggle.js",
  output: [
    {
      format: "cjs",
      name: "traject-form-handler",
      file: "./dist/traject-form-handler.js",
      external: ["@vue/composition-api", "vue"]
      // sourceMap: true
      // dest: pkg.module,
    },
    {
      name: "traject-form-handler",
      file: "./dist/traject-form-handler.esm.js",
      format: "es",
      external: ["@vue/composition-api", "vue"]
    }
  ],
  external: ["@vue/composition-api", "vue"],
  plugins: plugins
};

export default config;
