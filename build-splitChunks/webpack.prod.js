const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpackCommonConf = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {merge} = require('webpack-merge');
const {distPath} = require('./paths');

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash:8].js',
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
                        outputPath: '/images/'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor',
                    priority: 1,
                    test: /node_modules/,
                    minSize: 0,
                    minChunks: 1
                },
                // 公共模块
                common: {
                    name: 'common',
                    priority: 0,
                    minSize: 0,
                    minChunks: 2 // 最少复用过2次
                }
            }
        }
    }
})