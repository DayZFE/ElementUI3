const DeclarationBundlerPlugin = require("declaration-bundler-webpack-plugin");
module.exports = {
  configureWebpack: {
    entry: {
      app: "./src/main.ts",
    },
    plugins: [
      new DeclarationBundlerPlugin({
        moduleName: "elementui3",
        out: "./element.d.ts",
      }),
    ],
  },
};
