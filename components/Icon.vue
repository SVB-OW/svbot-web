<template>
	<div class="icon"><img :src="`ranks/orange/${currentGame.rank}.png`" /></div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
	layout: 'empty',
	computed: {
		...mapGetters({
			currentGame: 'currentGame/read',
		}),
	},
})
</script>

<style scoped>
.icon {
	object-fit: contain;
}
</style>
