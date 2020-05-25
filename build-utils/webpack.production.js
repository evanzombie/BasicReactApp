const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = () => ({
  entry: { app: path.join(__dirname, "../src/ClientApp.js") },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()],
            },
          },
          "sass-loader",
        ],
      },

      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         plugins: () => [require("autoprefixer")()],
      //       },
      //     },
      //     "sass-loader",
      //   ],
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "styles/[name].css",
      filename: "styles/[name].[hash].css",
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
});
