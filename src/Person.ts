import Item from "./Item"
import Position from "./Position"

export default class Person extends Item {
	constructor(pos: Position, step: number) {
		super(pos, step);
	}

	moveTo(pos: Position) {
		this.pos = pos
		this.commitPosition()
	}
}