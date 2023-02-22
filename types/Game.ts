import type { Boon, Handicap } from '.'
import { Bounty, Rank } from '.'

export class Game {
	contestantId = ''
	contestantName = ''
	rank = Rank.bronze
	rank2 = Rank.bronze
	wager = 0
	handicaps = <Handicap[]>[]
	boons = <Boon[]>[]
	bounty = new Bounty({
		points: 2,
		img: 'emote_on_dead_body.png',
		text: 'Emote on a Dead Body',
	});

	[key: string]: any

	constructor(obj?: Partial<Game>) {
		Object.assign(this, obj)
	}

	toJSON() {
		return { ...this } // here I make a POJO's copy of the class instance
	}
}
