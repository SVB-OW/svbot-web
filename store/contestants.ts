import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Contestant } from '~/types'
const apiEndpoint = process.env.API_URI + '/api/contestants'

export const state = () => ({
	list: <Contestant[]>[],
})

export type ContestantState = ReturnType<typeof state>

export const getters: GetterTree<ContestantState, any> = {
	read(state) {
		return state.list.map(item => new Contestant(item))
	},
}

export const mutations: MutationTree<ContestantState> = {
	load(state, payload: Array<Contestant>) {
		state.list = payload
	},
	create(state, payload: Contestant) {
		state.list.push(payload)
	},
	update(state, payload: Contestant) {
		const foundIndex = state.list.findIndex((e: Contestant) => e._id === payload._id)
		if (foundIndex >= 0) state.list.splice(foundIndex, 1, payload)
	},
	delete(state, payload: string) {
		const foundIndex = state.list.findIndex((e: Contestant) => e._id === payload)
		if (foundIndex >= 0) state.list.splice(foundIndex, 1)
	},
}

export const actions: ActionTree<ContestantState, any> = {
	async load({ commit }) {
		const res = await (await fetch(apiEndpoint)).json()

		commit('load', res)
		return res
	},
	async create({ state, commit }, payload: Partial<Contestant>) {
		const res = await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new Contestant(payload)),
		}).then(response => response.json())

		payload._id = res.insertedId
		commit('create', new Contestant(payload))
		this.$publishContestants(state.list)
		return res.insertedId
	},
	async update({ state, commit }, payload: Partial<Contestant>) {
		const res = await fetch(apiEndpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new Contestant(payload)),
		}).then(response => response.json())

		commit('update', new Contestant(payload))
		this.$publishContestants(state.list)
		return res
	},
	async delete({ state, commit }, payload: string) {
		await fetch(apiEndpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: payload,
		})
		commit('delete', payload)
		this.$publishContestants(state.list)
	},
	writeStore({ commit }, payload: Contestant[]) {
		commit('load', payload)
	},
}
