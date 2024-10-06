import { ObjectId } from 'mongodb'
import type { Contestant } from '~/types'

export default defineEventHandler(async event => {
	try {
		const collection = getDB().collection('contestants')

		const payload: Contestant = await readBody(event)
		const id = new ObjectId(payload._id)
		delete payload._id
		const result = await collection.updateOne({ _id: id }, { $set: payload })
		sendSSE('contestants updated', await collection.find().toArray())

		return { modifiedCount: result.modifiedCount }
	} catch (e: any) {
		throw createError({
			statusCode: 500,
			statusMessage: e.message,
		})
	}
})
