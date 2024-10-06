export default defineEventHandler(async () => {
	try {
		return cache
	} catch (e: any) {
		throw createError({
			statusCode: 500,
			statusMessage: e.message,
		})
	}
})
