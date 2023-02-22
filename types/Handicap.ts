import {} from '.'

export class Handicap {
	points = 0
	img = ''
	text = '';

	[key: string]: any // makes object properties indexable

	constructor(obj?: Partial<Handicap>) {
		Object.assign(this, obj)
	}

	toJSON() {
		return { ...this } // here I make a POJO's copy of the class instance
	}
}
