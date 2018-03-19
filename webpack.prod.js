const webpack = require('webpack');
const merge = require('webpack-merge');
const ugly = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const extract = require('extract-text-webpack-plugin');

const config = merge({
    plugins: [
//        new ugly(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new extract({
            filename: '[name].css'
        })
    ]
}, common);

console.log(config.module)

module.exports = config;


