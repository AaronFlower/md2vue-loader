const marked = require('marked')
const mustache = require('mustache')
const fs = require('fs')
const path = require('path')
const Prism = require('prismjs')
const Utils = require('./utils.js')

/**
 * 将单 md 文件生成 Vue template 文件。
 */
function getSingleVue (source, templateFile) 
{
	let parsedSource = Utils.parseMdSource(source)
	let code = Utils.generateVueTemplate(parsedSource)
	let template = fs.readFileSync(templateFile).toString()

	let renderer = new marked.Renderer()
	renderer.code = () => ''

	let result = mustache.render(template, {
		template: parsedSource.html,
		md: marked(source, {renderer}),
		code: Prism.highlight(code, Prism.languages.markup),
		script: parsedSource.js,
		style: parsedSource.styles.join('\n')
	})
	return result
}

function getBundleVue (source, demosDir, bundleTpl, singleTpl)
{
	console.log(demosDir)
	let demoFiles = fs.readdirSync(demosDir)
	console.log(demoFiles)
	let demos = demoFiles.map(demo => {
		console.log(singleTpl)
		return getSingleVue(fs.readFileSync(path.resolve(demosDir, demo)).toString(), singleTpl)
	})
	console.log(demos)
	return `
		module.exports = {
			<template>
				<div class="demo-container">
					<md-a></md-a>
					<md-b></md-b>
					<md-c></md-c>
				</div>	
			</template>

			<script>
				export default {
					components: {
						'md-a': {
							template: '${demos[0]}',
							mixins: []
						},
						'md-b': {
							template: '<h1>Hello MdB</h1>',
							mixins: []
						},
						'md-c': {
							template: '<h1>Hello MdC</h1>',
							mixins: []
						}
					}
				}
			</script>
		}
	`
}

module.exports = {
	getSingleVue,
	getBundleVue
}