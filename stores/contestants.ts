import { defineStore } from 'pinia'
import { Contestant } from '@/types'
import type { InsertOneResult, UpdateResult } from 'mongodb'

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
			const apiEndpoint = '/api/contestants'
			const res = (await (await fetch(apiEndpoint)).json()) as Contestant[]
			this.list = res
		},
		async create(payload: Partial<Contestant>) {
			const apiEndpoint = '/api/contestants'
			const res = await fetch(apiEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(new Contestant(payload)),
			}).then(response => response.json() as Promise<InsertOneResult<Document>>)

			payload._id = res.insertedId.toString()
			return res.insertedId.toString()
		},
		async update(payload: Contestant) {
			const apiEndpoint = '/api/contestants'
			const res = await fetch(apiEndpoint, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(new Contestant(payload)),
			}).then(response => response.json() as Promise<UpdateResult<Document>>)

			return res
		},
	},
})
