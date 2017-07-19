## Md2Vue-loader

A loader to parse markdown file to a vue template file. The loader will parse the marked file to a template for  [vue-loader](https://vue-loader.vuejs.org/) to parse.

## Usage

Config the webpack config file.

```jsx
module: {
  rules: [
    test: /\.md$/,
    loader: ['vue-loader', 'md2vue-loader']
  ]
}
```
## API

- Loader options

```javascript
{
  template: 'path/to/vue-template-file.vue'
}
```



## Example

Let's look at a example.

### input file source 

```markdown

## Usage

Use the button component

​```html
<h2>This is the Vue Component!</h2>
<t-button></t-button>
​```

​````javascript
import TButton from 'components/button'

export default {
    components: {
        TButton
    }
}
​````

​```css
button {
    color: red;
}
​```
```

### output source

```html
<template>
	<div class="t-component-demo">
		<div class="demo-box">
			<h2>This is the Vue Component!</h2>
<t-button></t-button>
		</div>
		<div class="md-box">
			<h2 id="usage">Usage</h2>
<p>Use the button component</p>

		</div>
		<div class="code-box">
			<pre>
				<code>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>This is the Vue Component!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>t-button</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>t-button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">
  <span class="token keyword">import</span> TButton <span class="token keyword">from</span> <span class="token string">'components/button'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    components<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        TButton
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style language-css">
  <span class="token selector">button</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

				</code>
			</pre>
		</div>
	</div>
</template>

<script>
import TButton from 'components/button'

export default {
    components: {
        TButton
    }
}
</script>

<style scoped>
	button {
    color: red;
}
</style>
```



## Todos

- [ ] Multiple Markdown files to loader.
- [ ] Code highlight configurable.

