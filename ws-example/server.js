const http = require('http')
const express = require('express')
const websocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new websocket.Server({ server })

wss.on('connection', ws => {
	ws.on('message', msg => {
		// log the received message and send it back to the client
		console.log('received: %s', msg)
		ws.send(`Hello, you sent -> ${msg}`)
	})

	// send immediatly a feedback to the incoming connection
	ws.send('Hi there, I am a WebSocket server')
})

// start our server
server.listen(9000, () => {
	console.log(`Server started on port 9000 :)`)
})
