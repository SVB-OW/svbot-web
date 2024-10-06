import { getDB } from '~/server/utils/db'

export default defineEventHandler(async () => {
	try {
		const contestants = await getDB().collection('contestants').find().toArray()
		return contestants
	} catch (e: any) {
		throw createError({
			statusCode: 500,
			statusMessage: e.message,
		})
	}
})
