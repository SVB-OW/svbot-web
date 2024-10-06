export default defineEventHandler(async event => {
	const eventStream = createEventStream(event)
	registerEventStream(eventStream)

	eventStream.onClosed(async () => {
		unregisterEventStream(eventStream)
		await eventStream.close()
	})

	return eventStream.send()
})
