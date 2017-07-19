<template>
	<div class="component-container">
		<div class="summary-box">
			{{{summary}}}
		</div>
		<div class="demos-container">
			{{#demos}}
				{{.}}
			{{/demos}}
		</div>
		<div class="api-box">
			{{api}}
		</div>
	</div>
</template>