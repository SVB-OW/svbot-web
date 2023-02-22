import {} from '.'

export class Bounty {
	points = 0
	img = ''
	text = '';

	[key: string]: any // makes object properties indexable

	constructor(obj?: Partial<Bounty>) {
		Object.assign(this, obj)
	}

	toJSON() {
		return { ...this } // here I make a POJO's copy of the class instance
	}
}
