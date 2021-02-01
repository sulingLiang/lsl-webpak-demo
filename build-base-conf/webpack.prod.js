const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
const {distPath} = require('./paths');

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',
        path: distPath
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: '/images'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        })
    ]
})