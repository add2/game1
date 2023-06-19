import Item from "./Item";
import Position from "./Position"

export default class Diamond extends Item {
	constructor(pos: Position, step: number) {
		super(pos, step);
		this.element.classList.add('diamond')
	}
}