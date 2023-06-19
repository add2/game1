import Person from "./Person";
import Position from "./Position"

export enum VillainClass {
	Villain1 = "villain1",
	Villain2 = "villain2",
	Villain3 = "villain3",
}

export default class Villain extends Person {
	constructor(pos: Position, step: number, className: VillainClass) {
		super(pos, step);
		this.element.classList.add(className)
	}
}