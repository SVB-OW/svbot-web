import type { EventStream } from 'h3'

const _sseStreams: EventStream[] = []
let _streamCounter = 0

export function registerEventStream(es: EventStream) {
	_sseStreams.push(es)
	console.log('[server/utils/sse.ts] register event stream', _streamCounter)
	return _streamCounter++
}

export function unregisterEventStream(es: EventStream) {
	const index = _sseStreams.indexOf(es)
	console.log('[server/utils/sse.ts] unregister event stream', index)
	if (index > -1) _sseStreams.splice(index, 1)
}

export function sendSSE(event: 'contestants updated' | 'game updated', payload: any) {
	return _sseStreams.forEach(async eventStream => await eventStream.push(JSON.stringify({ event, payload })))
}
