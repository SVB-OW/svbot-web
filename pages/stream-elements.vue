<template>
	<div>
		<a href="/stream-elements/leaderboard">Leaderboard W:340 H:400</a>
		<TheLeaderboard standalone />

		<a href="/stream-elements/handicaps">Handicaps Horizontal Icons</a>
		<TheHandicaps />

		<a href="/stream-elements/handicaps-vertical">Handicaps Vertical List</a>
		<TheHandicapsVertical />

		<a href="/stream-elements/rank-team1">Rank Team 1</a>
		<Icon color="white" img="bronze.png" />

		<a href="/stream-elements/rank-team2">Rank Team 2</a>
		<Icon color="white" img="bronze.png" />

		<a href="/stream-elements/top-bar">Top Bar W:1920 H:54</a>
		<TheTopBar />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	layout: 'empty',
})
</script>

<style>
a {
	margin: 1rem 0;
	display: block;
}
</style>
