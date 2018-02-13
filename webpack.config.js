const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

module.exports = {
    entry: './src/app',
    output: {
        filename: '[name].bundle.js'
    },
    devtool: isProduction ? 'cheap-module-source-map' : 'eval',
    stats: 'minimal', // https://webpack.js.org/configuration/stats/#stats
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, 'src'),
        host: '0.0.0.0',
        port: 9000,
        historyApiFallback: true,
        hot: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        }
    },
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
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },

                    // Resolve images in SCSS
                    // https://github.com/webpack-contrib/sass-loader#problems-with-url
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
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
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}