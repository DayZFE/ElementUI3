const DeclarationBundlerPlugin = require("declaration-bundler-webpack-plugin");
module.exports = {
  configureWebpack: {
    entry: {
      app: "./lib/index.ts",
    },
    plugins: [
      new DeclarationBundlerPlugin({
        moduleName: "elementui3",
        out: "./element.d.ts",
      }),
    ],
  },
};
