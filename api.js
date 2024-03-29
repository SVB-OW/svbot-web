// #region Setup
const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()
const corsOptions = { origin: process.env.HOME_URI }

let db
;(async () => {
	const client = await new MongoClient(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}).connect()
	db = client.db(process.env.DB_NAME || 'svbot')
})()

const app = express()
const server = http.createServer(app)
const io = new socketIo.Server(server, { cors: corsOptions })

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// #endregion

const cache = {
	contestantId: '',
	contestantName: '',
	teamName: '',
	rank: 'bronze',
	rank2: 'bronze',
	handicaps: [
		// {
		//   points: 40,
		//   img: 'no_sound.png',
		//   text: 'NO IN GAME AUDIO',
		//   selected: true,
		// },
		// {
		//   points: 40,
		//   img: 'no_ult.png',
		//   text: "CAN'T USE ULTIMATE",
		//   selected: true,
		// },
	],
	bounty: {
		points: 2,
		img: 'emote_on_dead_body.png',
		text: 'Emote on Dead Body',
	},
}

// Default route as info
app.get('/', (_req, res) => {
	let s = ''
	app._router.stack.forEach(function (r) {
		if (r.route && r.route.path) s += Object.keys(r.route.methods) + '&emsp;' + r.route.path + '<br>'
	})
	res.send(`API running <br><br>${s}`)
})

// Read all contestants
app.get('/api/contestants', async (_req, res) => {
	try {
		const contestants = await db.collection('contestants').find().toArray()
		res.json(contestants)
	} catch (e) {
		console.error('e', e)
		res.status(500).send({ error: e.message })
	}
})

// Create contestant
app.post('/api/contestants', async (req, res) => {
	try {
		const collection = await db.collection('contestants')

		const result = await collection.insertOne(req.body)
		res.json(result)
	} catch (e) {
		console.error('e', e)
		res.status(500).send({ error: e.message })
	}
})

// Update contestant
app.put('/api/contestants', async (req, res) => {
	try {
		const collection = await db.collection('contestants')

		const id = ObjectId(req.body._id)
		delete req.body._id
		const result = await collection.updateOne({ _id: id }, { $set: req.body })

		res.json({ modifiedCount: result.modifiedCount })
	} catch (e) {
		console.error('e', e)
		res.status(500).send({ error: e.message })
	}
})

// Delete contestant
app.delete('/api/contestants', async (req, res) => {
	try {
		const collection = await db.collection('contestants')

		const result = await collection.deleteOne(req.body)

		res.json(result)
	} catch (e) {
		console.error('e', e)
		res.status(500).send({ error: e.message })
	}
})

// Returns current cached game
app.get('/api/currentGame', (_req, res) => {
	res.json(cache)
})

// Store current game
app.post('/api/currentGame', (req, res) => {
	Object.assign(cache, req.body)
	// console.log('post post', JSON.stringify(cache));
	io.emit('game updated', cache) // TODO: this can just send back req.body
	res.json(cache)
})

// WS
io.on('connection', socket => {
	socket.on('game updated', game => {
		socket.emit('game updated', game)
	})
})

server.listen(process.env.API_PORT, () => console.log(`API running on port ${process.env.API_PORT}`))
