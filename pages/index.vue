<template>
	<main>
		<header>
			<h1>Leaderboard</h1>
			<img src="/gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<input id="contestant" type="text" placeholder="New contestant" required autocomplete="off" />

		<button @click="start()">Start</button>

		<br /><br />

		<div class="split-view">
			<table>
				<tbody>
					<tr
						v-for="(contestant, i) in sortedContestants().slice((startLeaderboardAt - 1) * 10, startLeaderboardAt * 10)"
						:key="i"
						@click="continueRun(contestant)"
					>
						<td>{{ contestant.name }}</td>
						<td>{{ contestant.personalBest }}</td>
					</tr>
				</tbody>
			</table>

			<br />

			<div v-if="sortedContestants().length > 10">
				<button
					v-for="i in ceil(sortedContestants().length / 10)"
					:key="i"
					class="page"
					@click="startLeaderboardAt = i"
				>
					{{ `${(i - 1) * 10 + 1} - ${i * 10}` }}
				</button>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { Contestant } from '@/types'

const { ceil } = Math
const startLeaderboardAt = ref(1)

function sortedContestants(): Contestant[] {
	const { list: allContestants } = useContestantsStore()
	return [...allContestants].sort((c1: Contestant, c2: Contestant) => (c1.personalBest > c2.personalBest ? -1 : 1))
}

async function start(): Promise<void> {
	const { update } = useCurrentGameStore()
	const { list: allContestants, create: createContestant } = useContestantsStore()
	const input = document.querySelector('#contestant') as HTMLInputElement
	if (input.reportValidity()) {
		const findContestant = allContestants.find((c: Contestant) => c.name === input.value)
		if (findContestant) {
			continueRun(findContestant)
			return
		}

		const obj = new Contestant({
			name: input.value,
		})

		const res = await createContestant(obj)
		obj._id = res

		input.value = ''
		update({ contestantId: obj._id, contestantName: obj.name })
		navigateTo('/chooseRank')
	}
}

function continueRun(c: Contestant): void {
	const { update } = useCurrentGameStore()
	update({ contestantId: c._id, contestantName: c.name })
	navigateTo('/chooseRank')
}
</script>

<style scoped>
.split-view {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

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
