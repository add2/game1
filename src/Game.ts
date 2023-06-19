import Field from "./Field";
import Villain, { VillainClass } from "./Villain";

export default class Game {
	constructor(width: number, height: number, numberOrDiamonds: number) {
		const field = new Field(width, height)

		field.appendVillain(
			new Villain(field.randomEmptyPosition(), field.step, VillainClass.Villain1)
		)

		for (let i = 0; i < numberOrDiamonds; i++) {
			field.appendRandomDiamond()
		}
	}
}
