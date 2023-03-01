<template>
	<main>
		<header>
			<h1>Leaderboard</h1>
			<img src="gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<input id="contestant" type="text" placeholder="New contestant" required autocomplete="off" />

		<button @click="start()">Start</button>

		<br /><br />

		<TheLeaderboard />
	</main>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import { Contestant } from '@/types'

export default Vue.extend({
	computed: {
		...mapGetters({
			allContestants: 'contestants/read',
		}),
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

<style scoped></style>
