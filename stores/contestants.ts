import { defineStore } from 'pinia'
import { Contestant } from '~/types'
const apiEndpoint = process.env.API_URI + '/api/contestants'

export type ContestantsState = {
	list: Contestant[]
}

export const useContestantsStore = defineStore('contestants', {
	state: (): ContestantsState => ({
		list: [],
	}),
	getters: {
		read: state => state.list.map(item => new Contestant(item)),
	},
	actions: {
		async load() {
			const res = await (await fetch(apiEndpoint)).json()
			this.list = res
		},
		async create(payload: any) {
			const res = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(new Contestant(payload)),
			}).then(response => response.json())

			payload._id = res.insertedId
			this.list.push(new Contestant(payload))
			return res.insertedId
		},
		async update(payload: any) {
			const res = await fetch(apiEndpoint, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(new Contestant(payload)),
			}).then(response => response.json())

			const foundIndex = this.list.findIndex((e: Contestant) => e._id === payload._id)
			if (foundIndex >= 0) this.list.splice(foundIndex, 1, new Contestant(payload))
			return res
		},
		async delete(payload: string) {
			await fetch(apiEndpoint, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: payload,
			})
			const foundIndex = this.list.findIndex((e: Contestant) => e._id === payload)
			if (foundIndex >= 0) this.list.splice(foundIndex, 1)
		},
	},
})
