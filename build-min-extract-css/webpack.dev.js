const path = require('path');
const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const {distPath} = require('./paths');

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        port: 8888,
        progress: true,
        contentBase: distPath,
        open: true,
        compress: true,
        proxy: {}
    }

})