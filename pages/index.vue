<template>
	<main>
		<header>
			<h1>Leaderboard</h1>
			<img src="/gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<input id="contestant-name" type="text" placeholder="New contestant" required autocomplete="off" />
		<input id="team-name" type="text" placeholder="Team Name" required autocomplete="off" />

		<button @click="start()">Start</button>

		<br /><br />

		<TheLeaderboard :contestants="allContestants" @click-row="continueRun" />
	</main>
</template>

<script setup lang="ts">
import { Contestant } from '@/types'

const { update: updateCurrentGame } = useCurrentGameStore()
const { create: createContestant } = useContestantsStore()
const { list: allContestants } = storeToRefs(useContestantsStore())

useHead({
	title: 'Leaderboard',
})

async function start(): Promise<void> {
	const contestantName = document.querySelector('#contestant-name') as HTMLInputElement
	const teamName = document.querySelector('#team-name') as HTMLInputElement

	// Check if the input fields are valid
	if (contestantName.reportValidity() && teamName.reportValidity()) {
		// Check if contestant already exists and continue run if so
		const findContestant = allContestants.value.find((c: Contestant) => c.name === contestantName.value)
		if (findContestant) {
			continueRun(findContestant)
			return
		}

		// Create new contestant
		const obj = new Contestant({
			name: contestantName.value,
			teamName: teamName.value,
		})
		const res = await createContestant(obj)
		obj._id = res

		// Reset input fields, update current game and navigate to chooseRank
		contestantName.value = ''
		teamName.value = ''
		await updateCurrentGame({ contestantId: obj._id, contestantName: obj.name, teamName: obj.teamName })
		navigateTo('/chooseRank')
	}
}

function continueRun(c: Contestant): void {
	const { update } = useCurrentGameStore()
	update({ contestantId: c._id, contestantName: c.name, teamName: c.teamName })
	navigateTo('/chooseRank')
}
</script>

<style scoped>
table {
	width: 500px;
}

table,
table th,
table td {
	border: none;
	border-collapse: collapse;
	padding: 0.5rem 1rem;
	width: fit-content;
}

table th:nth-child(2) {
	width: 150px;
}
</style>
