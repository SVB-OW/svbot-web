<template>
	<div class="handicaps">
		<img
			v-for="(handicap, i) in currentGame.handicaps"
			:key="i"
			:src="`handicaps/orange/${handicap.img}`"
			class="handicap"
		/>
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
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 52px;
}

.handicap {
	width: 40px;
	height: 40px;
	margin-right: 5px;
}
</style>
