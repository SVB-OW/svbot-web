import {} from '.'

export class Boon {
	points = 0
	img = ''
	text = ''
	maxStack = 1
	stack = 0;

	[key: string]: any // makes object properties indexable

	constructor(obj?: Partial<Boon>) {
		Object.assign(this, obj)
	}

	toJSON() {
		return { ...this } // here I make a POJO's copy of the class instance
	}
}
