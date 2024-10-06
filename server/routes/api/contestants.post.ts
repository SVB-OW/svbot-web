export default defineEventHandler(async event => {
	try {
		console.log('[contestants.post.ts] received request')
		const collection = getDB().collection('contestants')
		const payload = await readBody(event)
		const result = await collection.insertOne(payload)

		sendSSE('contestants updated', await collection.find().toArray())

		return result
	} catch (e: any) {
		throw createError({
			statusCode: 500,
			statusMessage: e.message,
		})
	}
})
