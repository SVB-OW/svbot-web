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
			const apiEndpoint = useRuntimeConfig().public.API_URI + '/api/contestants'
			const res = await (await fetch(apiEndpoint)).json()
			this.list = res
		},
		async create(payload: Partial<Contestant>) {
			const apiEndpoint = useRuntimeConfig().public.API_URI + '/api/contestants'
			const res = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(new Contestant(payload)),
			}).then(response => response.json() as Promise<InsertOneResult<Document>>)

			payload._id = res.insertedId.toString()
			this.list.push(new Contestant(payload))
			return res.insertedId.toString()
		},
		async update(payload: Contestant) {
			const apiEndpoint = useRuntimeConfig().public.API_URI + '/api/contestants'
			const res = await fetch(apiEndpoint, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(new Contestant(payload)),
			}).then(response => response.json() as Promise<UpdateResult<Document>>)

			const foundIndex = this.list.findIndex((e: Contestant) => e._id === payload._id)
			if (foundIndex >= 0) this.list.splice(foundIndex, 1, new Contestant(payload))
			return res
		},
		async delete(payload: string) {
			const apiEndpoint = useRuntimeConfig().public.API_URI + '/api/contestants'
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
