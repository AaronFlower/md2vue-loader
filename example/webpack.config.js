const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	context: path.resolve(__dirname),

	entry: './index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	resolve: {
		alias: {
			'components': path.resolve(__dirname, 'components')
		},
		extensions: ['.vue', '.js']
	},

	resolveLoader: {
		alias: {
			'md2vue-loader': path.resolve(__dirname, '../index.js')
		}
	},

	module: {
		rules: [
			{
				test: /\.md$/,
				loader: ['vue-loader', 'md2vue-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},

	plugins: [
		new copyWebpackPlugin([{
			from: 'assets'
		}]),
		new htmlWebpackPlugin({
			template: 'index.html'
		})
	],

	devServer: {
		port: process.env.PORT || 8082
	}
}