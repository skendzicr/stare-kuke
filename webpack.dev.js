const baseConfig = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const reStyle = /\.(css|scss|sass)$/;

module.exports = merge(baseConfig, {
    output: {
        filename: '[name].bundle.js'
    },
    devtool: 'cheap-module-source-map',
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
                test: reStyle,
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	]
});