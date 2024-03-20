<template>
	<main>
		<header>
			<h1>Leaderboard</h1>
			<img src="gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<input id="contestant" type="text" placeholder="New contestant" required autocomplete="off" />

		<button @click="start()">Start</button>

		<br /><br />

		<div class="split-view">
			<table>
				<tbody>
					<tr
						v-for="(contestant, i) in sortedContestants.slice((startLeaderboardAt - 1) * 10, startLeaderboardAt * 10)"
						:key="i"
						@click="continueRun(contestant)"
					>
						<td>{{ contestant.name }}</td>
						<td>{{ contestant.personalBest }}</td>
					</tr>
				</tbody>
			</table>

			<br />

			<div v-if="sortedContestants.length > 10">
				<button
					v-for="i in Math.ceil(sortedContestants.length / 10)"
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

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import { Contestant } from '@/types'

export default Vue.extend({
	data: () => ({
		Math,
		startLeaderboardAt: 1,
	}),
	computed: {
		...mapGetters({
			allContestants: 'contestants/read',
		}),
		sortedContestants(): Contestant[] {
			return [...this.allContestants].sort((c1: Contestant, c2: Contestant) =>
				c1.personalBest > c2.personalBest ? -1 : 1,
			)
		},
	},
	methods: {
		...mapActions({
			createContestant: 'contestants/create',
			updateCurrentGame: 'currentGame/update',
		}),
		async start(): Promise<void> {
			const input = document.querySelector('#contestant') as HTMLInputElement
			if (input.reportValidity()) {
				const findContestant = this.allContestants.find((c: Contestant) => c.name === input.value)
				if (findContestant) {
					this.continueRun(findContestant)
					return
				}

				const obj = new Contestant({
					name: input.value,
				})

				const res = await this.createContestant(obj)
				obj._id = res

				input.value = ''
				this.updateCurrentGame({
					contestantId: obj._id,
					contestantName: obj.name,
				}).then(() => {
					this.$router.push('/chooseRank')
				})
			}
		},
		continueRun(c: Contestant): void {
			this.updateCurrentGame({
				contestantId: c._id,
				contestantName: c.name,
			}).then(() => {
				this.$router.push('/chooseRank')
			})
		},
	},
})
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
