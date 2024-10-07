<template>
	<div class="layout-default">
		<nav>
			<NuxtLink to="/">Leaderboard</NuxtLink>
			<NuxtLink to="/chooseRank">Choose Rank</NuxtLink>
			<NuxtLink to="/chooseHandicaps">Choose Handicaps</NuxtLink>
			<a href="/old/template.htm">Old Template</a>
			<a href="/template">Stream Overlay</a>
			<a href="/stream-elements">Stream Elements</a>
		</nav>

		<slot />
	</div>
</template>

<script setup lang="ts">
onMounted(async () => {
	await useContestantsStore().load()
	useCurrentGameStore().load()
	useNuxtApp().$subscribeSSE()
})
</script>

<style>
:root {
	/* Vars */
	--main-bg: #081719;
	--main-color: #ff9d16;
}

html:has(.layout-default) {
	background: var(--main-bg);
	color: var(--main-color);
	margin: 0;
	padding: 0;
}

.layout-default * {
	box-sizing: border-box;
	font-family: Roboto, 'Helvetica Neue', sans-serif;
}

.layout-default nav {
	/* display: none; */
}

.layout-default h1,
.layout-default h2,
.layout-default h3 {
	margin: 0;
	margin-bottom: 1rem;
}

.layout-default main {
	position: relative;
	padding: 1rem;
}

.layout-default main header {
	height: 75px;
	display: flex;
	contain: content;
}

.layout-default main header h1 {
	flex-grow: 1;
}

.layout-default input {
	height: 28px;
	background: none;
	border: none;
	color: silver;
	border-bottom: 1px solid silver;
}

.layout-default input:focus {
	outline: none;
	color: white;
	border-color: white;
}

.layout-default button {
	margin: 5px;
	padding: 5px 10px;
	height: 28px;
	background: none;
	color: white;
	border: 1px solid silver;
	cursor: pointer;
}

.layout-default a {
	color: silver;
	padding: 0.5rem;
}
</style>
