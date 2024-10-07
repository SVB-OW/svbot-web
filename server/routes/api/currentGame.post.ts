export default defineEventHandler(async event => {
	try {
		const payload = await readBody(event)
		Object.assign(cache, payload)
		sendSSE('game updated', cache)
		return cache
	} catch (e: any) {
		throw createError({
			statusCode: 500,
			statusMessage: e.message,
		})
	}
})
