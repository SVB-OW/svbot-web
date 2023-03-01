<template>
	<div class="handicaps">
		<div v-for="(handicap, i) in currentGame.handicaps" :key="i" class="handicap">
			<img :src="`handicaps/orange/${handicap.img}`" />
			<span>{{ handicap.text }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
	layout: 'empty',
	async fetch(): Promise<void> {
		// await this.loadContestants()
		// await this.loadCurrentGame()
	},
	computed: {
		...mapGetters({
			currentGame: 'currentGame/read',
		}),
	},
	mounted() {
		this.$startWS()
	},
})
</script>

<style scoped>
.handicaps {
	padding-top: 1px;
	padding-left: 20px;
}

.handicap {
	display: flex;
	align-items: center;
}

.handicap img {
	width: 40px;
	height: 40px;
	margin-right: 5px;
}
</style>
