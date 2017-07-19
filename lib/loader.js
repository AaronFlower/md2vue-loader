const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const {getSingleVue, getBundleVue} = require('./md2vue.js')

module.exports = function (source) {
	this.cacheable()
	let options = loaderUtils.getOptions(this) || {subDirectory: null}
	let singleTpl = options.template || path.resolve(__dirname, 'template/single-demo.tpl')
	let bundleTpl =  options.template || path.resolve(__dirname, 'template/index-demo.tpl')
	if (options.subDirectory && fs.existsSync(path.resolve(this.context, options.subDirectory))) {
		return getBundleVue(source, path.resolve(this.context, options.subDirectory), bundleTpl, singleTpl )
	} else {
		return getSingleVue(source, singleTpl)
	}
}