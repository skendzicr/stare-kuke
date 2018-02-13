const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

module.exports = {
    entry: './src/app',
    stats: 'minimal', // https://webpack.js.org/configuration/stats/#stats
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
				test: reImage,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							useRelativePath: true,
							outputPath: '/',
							publicPath: '/'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true
						}
					}
				]
			},
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            minify: {
                collapseWhitespace: isProduction
            },
            removeComments: isProduction
        }),
        new HtmlWebpackPlugin({
            filename: 'galerija.html',
            template: './src/galerija.html',
            inject: true,
            minify: {
                collapseWhitespace: isProduction
            },
            removeComments: isProduction
        }),
        new HtmlWebpackPlugin({
            filename: 'video.html',
            template: './src/video.html',
            inject: true,
            minify: {
                collapseWhitespace: isProduction
            },
            removeComments: isProduction
        }),
        new HtmlWebpackPlugin({
            filename: 'kontakt.html',
            template: './src/kontakt.html',
            inject: true,
            minify: {
                collapseWhitespace: isProduction
            },
            removeComments: isProduction
        }),

        // use 'development' unless process.env.NODE_ENV is defined
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        })
    ]
}