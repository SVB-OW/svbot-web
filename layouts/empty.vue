<template>
	<div class="layout-empty">
		<Nuxt />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
	async fetch(): Promise<void> {
		await this.loadContestants()
		await this.loadCurrentGame()
	},
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
	mounted() {
		this.$subscribeContestants()
		this.$subscribeGame()
	},
	methods: {
		...mapActions({
			loadContestants: 'contestants/load',
			loadCurrentGame: 'currentGame/load',
		}),
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
