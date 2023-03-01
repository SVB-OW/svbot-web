import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Contestant } from '~/types'
const apiEndpoint = process.env.API_URI + '/api/contestants'

export const state = () => ({
	list: <Contestant[]>[
		{
			_id: '63e9265ea988230ff1b07f1a',
			name: 'Forgiving',
			region: 'NA',
			personalBest: 0,
			currentTotal: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63e93a683d21301753d0911d',
			name: 'Bogur',
			region: 'EU',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63e94b913d21301753d0911e',
			name: 'Arrge',
			region: 'EU',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63e9557e3d21301753d0911f',
			name: 'Dan Fenner',
			region: 'NA',
			personalBest: 298,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 298,
			grandmasterPoints: 0,
		},
		{
			_id: '63e965873d21301753d09120',
			name: 'Custa',
			region: 'NA',
			personalBest: 345,
			bronzePoints: 0,
			silverPoints: 345,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63f26417e48bd3e80e1cff01',
			name: 'Ml7',
			personalBest: 378,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63f27724e48bd3e80e1cff02',
			name: 'Somnus',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63f288fce48bd3e80e1cff03',
			name: 'Bowie',
			personalBest: 405,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 405,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63f2953fe48bd3e80e1cff04',
			name: 'Skiesti',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63f2a129e48bd3e80e1cff05',
			name: 'Emiliath',
			personalBest: 496,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 496,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63fb9cbc030f5c5a054bc0a1',
			name: 'Yeatle',
			personalBest: 485,
			bronzePoints: 485,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63fba723030f5c5a054bc0a2',
			name: 'Yeatle 2',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63fbad1d030f5c5a054bc0a3',
			name: 'Eskay',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63fbb9a7030f5c5a054bc0a4',
			name: 'Hcpeful',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63fbc507030f5c5a054bc0a5',
			name: 'bame1',
			personalBest: 140,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 140,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
		{
			_id: '63fbd2e2030f5c5a054bc0a6',
			name: 'Javion',
			personalBest: 0,
			bronzePoints: 0,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		},
	],
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
	async create({ commit }, payload: any) {
		const res = await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new Contestant(payload)),
		}).then(response => response.json())

		payload._id = res.insertedId
		commit('create', new Contestant(payload))
		return res.insertedId
	},
	async update({ commit }, payload: any) {
		const res = await fetch(apiEndpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new Contestant(payload)),
		}).then(response => response.json())

		commit('update', new Contestant(payload))
		return res
	},
	async delete({ commit }, payload: string) {
		await fetch(apiEndpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: payload,
		})
		commit('delete', payload)
	},
}
