const baseConfig = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const reStyle = /\.(css|scss|sass)$/;

module.exports = merge(baseConfig, {
    output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
    },
    module: {
        rules: [
            {
				test: reStyle,
				include: [
					path.resolve(__dirname, '../')
				],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
					},
					// Resolve images in SCSS
					// https://github.com/webpack-contrib/sass-loader#problems-with-url
					{
						loader: 'resolve-url-loader'
                    },
                    
                    // TODO
					// {
					// 	loader: 'postcss-loader',
					// 	options: {
					// 		config: {
					// 			path: './postcss.config.js'
					// 		},
					// 		importLoaders: 1
					// 	}
					// },
					{
						loader: 'sass-loader'
					}]
				})
			}
        ]
    },
    plugins: [
        // Extract imported CSS into own file
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),

		// Minify JS
		new UglifyJsPlugin({
			uglifyOptions: {
				parallel: true,
				ie8: false
			}
		}),

		// Minify CSS
		new webpack.LoaderOptionsPlugin({
			minimize: true
        }),
        
        // Decrease script evaluation time
		// https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
		new webpack.optimize.ModuleConcatenationPlugin()
    ]
})