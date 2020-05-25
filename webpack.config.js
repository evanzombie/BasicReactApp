// const path = require("path");
// const HtmlWebPackPlugin = require("html-webpack-plugin");

// module.exports = ({ mode } = { mode: "development" }) => ({
//   mode,
//   entry: { app: "./src/index.js" },
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist"),
//     publicPath: "dist/",
//   },
//   module: {
//     rules: [
//       {
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.(js|mjs|jsx|ts|tsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           //   options: {
//           //     presets: ["@babel/preset-env"],
//           //   },
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./src/index.html",
//       filename: "./index.html",
//     }),
//   ],
// });

// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: "Webpack demo",
//     }),
//   ],
// };

const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");
const path = require("path");
const glob = require("glob");

const PATHS = {
  app: path.join(__dirname, "src"),
};

const commonConfig = merge([
  {
    output: {
      chunkFilename: "chunk.[id].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],

    module: {
      rules: [
        {
          // **Conditions** to match files using RegExp, function.
          test: /\.js$/,

          // **Restrictions**
          // Restrict matching to a directory. This
          // also accepts an array of paths or a function.
          // The same applies to `exclude`.
          include: path.join(__dirname, "app"),
          exclude(path) {
            // You can perform more complicated checks  as well.
            return path.match(/node_modules/);
          },

          // **Actions** to apply loaders to the matched files.
          use: "babel-loader",
        },
      ],
    },
  },
  parts.loadSASS(),
  parts.loadJavaScript({ include: PATHS.app }),
]);
const productionConfig = merge([
  parts.generateSourceMaps({ type: "source-map" }),

  parts.extractCSS({
    use: ["css-loader", parts.autoprefix(), "sass-loader"],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 10,
      name: "[name].[ext]",
    },
  }),
  {
    // optimization: {
    //   splitChunks: {
    //     chunks: "initial",
    //   },
    // },

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
  },

  parts.clean(),
  parts.attachRevision(),
]);
const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = (mode) => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
