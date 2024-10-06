import type { Db } from 'mongodb'
import { MongoClient } from 'mongodb'

let _db: Db | undefined

export function getDB() {
	if (!_db) {
		const client = new MongoClient(import.meta.env.MONGO_URI as string, {})
		_db = client.db(import.meta.env.DB_NAME || 'svbot')
	}

	return _db
}
