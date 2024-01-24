const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public/scripts"),
        publicPath: "/scripts/",
        filename: "bundle.js",
    },
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
    mode: "development",
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        allowedHosts: "all",
        static: {
          directory: path.join(__dirname, 'public'),
        },
        devMiddleware: {
//            writeToDisk: true,
        },
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*.js'],
        compress: true,
        port: 8080,
        historyApiFallback : true
    }
};
