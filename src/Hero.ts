import Person from "./Person";
import Position from "./Position"

export default class Hero extends Person {
	constructor(pos: Position, step: number) {
		super(pos, step);
		this.element.classList.add('hero')
	}
}