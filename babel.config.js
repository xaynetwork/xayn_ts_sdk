// We use bable+rollup to transpile and potentially bundle our typescript
const basePresets = ['@babel/typescript'];
const baseEnv = {
    presets: basePresets
};

export default {
  env: {
    // build for projects which do the bundling and transpiling them self
    esm: baseEnv,
    bundled: {
      ...baseEnv,
      presets: [
        ["@babel/env", {
          // build for somewhat modern targets
          targets: "> 0.25%, not dead"
        }],
        ...basePresets
      ]
    },
    cjs: {
      ...baseEnv,
      presets: [
        ["@babel/env", {
          //not setting targets implies oldest targets possible
          modules: "cjs"
        }],
        ...basePresets
      ]
    }
  }
};
