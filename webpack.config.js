const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "development" }) => ({
  mode,
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          //   options: {
          //     presets: ["@babel/preset-env"],
          //   },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
});
