const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const dotenv = require('dotenv');
const webpack = require('webpack');

const env = dotenv.config({ path: './config.env' }).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public/scripts"),
        publicPath: "/scripts/",
        filename: "bundle.js",
    },
    plugins: [
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin(envKeys)
    ],
    cache: false,
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js|\.jsx$/,
            exclude: /node_modules/
        },
        {
            test: /\.scss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
        }]
    },
    mode: "production",
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        allowedHosts: "all",
        static: {
            directory: path.join(__dirname, 'public'),
        },
        devMiddleware: {
            //            writeToDisk: true,
        },
        //        hot: true,
        //        liveReload: true,
        watchFiles: ['src/**/*.js'],
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
