const marked = require('marked')
/**
 * Generate a vue template format.
 */
function generateVueTemplate({styles, html, js})
{
	return `
<template>
  ${html}
</template>

<script>
  ${js}
</script>

<style>
  ${styles.join('\n')}
</style>
`
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