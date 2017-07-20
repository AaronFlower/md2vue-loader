const marked = require('marked')
/**
 * Generate a vue template format.
 */
function generateVueTemplate({styles, html, js})
{
	let result = ''
	result += html ? 
`<template>
${html}
</template>
` : ''
	result += js ? 
`
<script>
${js}
</script>
` : ''

	result += styles.length ? 
`
<style>
${styles.join('\n')}
</style>
` : ''
	return result
}

function parseMdSource (source) 
{
	let lexer = new marked.Lexer()
	let tokens = lexer.lex(source)

	let styles = []
	let html = ''
	let js = ''
	tokens.forEach((token, index) => {
		if (token.type === 'code') {
			switch(token.lang) {
				case 'html': 
					html = token.text
					break
				case 'javascript':
					js = token.text
					break
				case 'css': 
					styles.push(token.text)
					break
			}
		}
	})

	return {
		js,
		styles,
		html
	}
}

module.exports = {
	parseMdSource,
	generateVueTemplate
}