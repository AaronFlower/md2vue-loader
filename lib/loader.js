const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const {getSingleVue, getBundleVue, getDirectOutput} = require('./md2vue.js')

module.exports = function (source) {

	let options = Object.assign({
		subDirectory: null,
		template: path.resolve(__dirname, 'template/single-demo.tpl'),
		bundleTemplate: path.resolve(__dirname, 'template/index-demo.tpl'),
		headingId: false,
		directOutput: false
	}, loaderUtils.getOptions(this))

	if (options.directOutput) {
		return getDirectOutput(source)
	}

	let singleTpl = options.template
	let bundleTpl =  options.bundleTemplate
	// @todo implement getBundleVue
	if (options.subDirectory && fs.existsSync(path.resolve(this.context, options.subDirectory))) {
		return getBundleVue(source, path.resolve(this.context, options.subDirectory), bundleTpl, singleTpl )
	} else {
		return getSingleVue(source, singleTpl, options)
	}
}