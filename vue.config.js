const DeclarationBundlerPlugin = require("declaration-bundler-webpack-plugin");
module.exports = {
  configureWebpack: {
    plugins: [
      new DeclarationBundlerPlugin({
        moduleName: "elementui3",
        out: "./list/elementui3.d.ts",
      }),
    ],
  },
};
