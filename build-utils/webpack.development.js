const path = require("path");

module.exports = () => ({
  // entry: { app: "./src/index.js" },
  entry: { app: path.join(__dirname, "../src/ClientApp.js") },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 0,
            },
          },
          // "sass-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    // compress: true,
    // port: 8080,
    stats: "errors-only",
    open: true,
    overlay: true,
  },
  plugins: [],
});
