<template>
	<div>
		<nav>
			<NuxtLink to="/">Leaderboard</NuxtLink>
			<NuxtLink to="/chooseRank">Choose Rank</NuxtLink>
			<NuxtLink to="/chooseHandicaps">Choose Handicaps</NuxtLink>
			<a href="/template.htm">Original Template</a>
			<a href="/template">Stream Overlay</a>
		</nav>

		<slot />
	</div>
</template>

<script setup lang="ts">
onMounted(async () => {
	await useContestantsStore().load()
	useCurrentGameStore().load()
	useNuxtApp().$startWS()
})
</script>

<style>
:root {
	/* Vars */
	--main-bg: #081719;
	--main-color: #ff9d16;
}

* {
	box-sizing: border-box;
	font-family: Roboto, 'Helvetica Neue', sans-serif;
}

html {
	background: var(--main-bg);
	color: var(--main-color);
	margin: 0;
	padding: 0;
}

nav {
	display: none;
}

h1,
h2,
h3 {
	margin: 0;
	margin-bottom: 1rem;
}

main {
	position: relative;
	padding: 1rem;
}

main header {
	height: 75px;
	display: flex;
	contain: content;
}

main header h1 {
	flex-grow: 1;
}

input {
	height: 28px;
	background: none;
	border: none;
	color: silver;
	border-bottom: 1px solid silver;
}

input:focus {
	outline: none;
	color: white;
	border-color: white;
}

button {
	margin: 5px;
	padding: 5px 10px;
	height: 28px;
	background: none;
	color: white;
	border: 1px solid silver;
	cursor: pointer;
}

a {
	color: silver;
	padding: 0.5rem;
}
</style>
~/stores/contestants~/stores/currentGame
