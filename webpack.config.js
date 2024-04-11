const path = require("path");
const webpack = require("webpack");

module.exports = {
    plugins: [
      new webpack.ProvidePlugin({
          "jQuery": "jquery",
          "window.jQuery": "jquery",
          "jquery": "jquery",
          "window.jquery": "jquery",
          "$": "jquery",
          "window.$": "jquery"
      })
    ],

    entry: {
      main: "./src/js/index.js",
      "main-page": "./src/js/main-page.js",
      service: "./src/js/service.js",
      cases: "./src/js/cases.js",
      reviews: "./src/js/reviews.js",
      geography: "./src/js/geography.js",
    },

    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/"
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve("babel-loader"),
                    options: {
                        presets: [
                            ["@babel/preset-env", { modules: false }]
                        ]
                    }
                }
            }
        ]
    },

    resolve: {
        alias: {
            "%modules%": path.resolve(__dirname, "src/blocks/modules"),
            "%components%": path.resolve(__dirname, "src/blocks/components")
        }
    }
};
