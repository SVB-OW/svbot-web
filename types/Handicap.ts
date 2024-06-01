import {} from '.'

export class Handicap {
	points = 0
	img = ''
	text = ''
	maxStack = 1 // if bigger than 1, it can be stacked
	stack = 0; // how many times it has been stacked

	[key: string]: any // makes object properties indexable

	constructor(obj?: Partial<Handicap>) {
		Object.assign(this, obj)
	}

	toJSON() {
		return { ...this } // here I make a POJO's copy of the class instance
	}
}
