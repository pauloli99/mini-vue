import typescript from "@rollup/plugin-typescript";
import * as pkg from "./package.json" assert { type: "json" };

export default {
  input: "./src/index.ts",
  output: [
    // 1. cjs => commonjs
    {
      format: "cjs",
      file: "lib/guide-mini-vue.cjs.js",
    },

    // 2. esm => es module
    {
      format: "es",
      file: "lib/guide-mini-vue.esm.js",
    },
  ],

  plugins: [typescript()],
};
