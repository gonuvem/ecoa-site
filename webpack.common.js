const path = require('path');
const clean = require('clean-webpack-plugin');
const env = process.env.NODE_ENV;
const extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        navigation: './src/js/navigation.js',
        canvas: './src/js/canvas.js',
        zero: './src/js/zero.js',
    },
    output: {
        filename: './js/[name].zero.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: env === 'production'
                  ? extract.extract({
                      fallback: 'style-loader',
                      use: [ {
                          loader: 'css-loader' ,
                          options:{
                              minimize: true
                          }
                        }]
                  })
                  : [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.ttf$/,
                use:{ 
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader?limit=10000',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}
