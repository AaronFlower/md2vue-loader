const marked = require('marked')
const mustache = require('mustache')
const fs = require('fs')
const path = require('path')
const Prism = require('prismjs')
const Utils = require('./utils.js')

/**
 * 将单 md 文件生成 Vue template 文件。
 */
function getSingleVue (source, templateFile, options) 
{
	let parsedSource = Utils.parseMdSource(source)
	let code = Utils.generateVueTemplate(parsedSource)
	let template = fs.readFileSync(templateFile).toString()

	let renderer = new marked.Renderer()

	if (!options.headingId) {
		renderer.heading = (text, level, raw) => `<h${level}>${text}</h${level}>`
	}

	renderer.code = () => ''

	let result = mustache.render(template, {
		template: parsedSource.html,
		md: marked(source, {renderer}),
		code: Prism.highlight(code, Prism.languages.markup),
		script: parsedSource.js,
		style: parsedSource.styles.join('\n'),
		scopedStyle: parsedSource.scopedStyles.join('\n')
	})
	return result
}

// @todo implement getBundleVue
function getBundleVue (source, demosDir, bundleTpl, singleTpl)
{
	let demoFiles = fs.readdirSync(demosDir)
	let demos = demoFiles.map(demo => {
		return getSingleVue(fs.readFileSync(path.resolve(demosDir, demo)).toString(), singleTpl)
	})
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


function getDirectOutput (source) {
	let renderer = new marked.Renderer()
	renderer.code = (code, language) => {
		let syntax
		switch (language) {
			case 'css':
			case 'css@scoped':
				syntax = Prism.languages.css
				break
			case 'js':
			case 'javascript':
				syntax = Prism.languages.javascript
				break
			default:
				syntax = Prism.languages.markup
		}
		return '' +
`<pre>
<code>
${Prism.highlight(code, syntax)}
</code>
</pre>`
	}

	let result = marked(source, {renderer})
	return `<template><div class='md2vue-loader-code-snippet'>
			${result}
		</div>
	</template>`
}

module.exports = {
	getSingleVue,
	getBundleVue,
	getDirectOutput
}