<template>
	<div class="layout-empty">
		<Nuxt />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	head: {
		link: [
			{
				rel: 'preconnect',
				href: 'https://fonts.bunny.net',
			},
			{
				href: 'https://fonts.bunny.net/css2?family=Rubik&display=swap',
				rel: 'stylesheet',
			},
		],
	},
})
</script>

<style>
body {
	font-family: Rubik, sans-serif;
	margin: 0;
	padding: 0;
}
</style>
