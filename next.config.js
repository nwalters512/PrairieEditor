const withTypescript = require("@zeit/next-typescript");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withTM = require("next-transpile-modules");

const config = withTypescript(
  withTM({
    transpileModules: ["monaco-editorrrr"],
    webpack(config, options) {
      config.module.rules.push({
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      });
      config.plugins.push(new MonacoWebpackPlugin());
      return config;
    }
  })
);

module.exports = config;
