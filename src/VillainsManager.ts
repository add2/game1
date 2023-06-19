import Field from "./Field"
import Villain from "./Villain";
import Diamond from "./Diamond";
import Pathfinder from "./Pathfinder/Pathfinder";

export default class VillainsManager {
	field: Field
	pathfinder: Pathfinder

	constructor(field: Field) {
		this.field = field
		this.pathfinder = new Pathfinder(field)
	}

	nextPosition(v: Villain) {
		const d = this.closestDiamond(v)

		if (d === undefined) {
			return undefined
		}
		const path = this.pathfinder.path(v.pos, d.pos)

		return path.firstStep()
	}

	closestDiamond(v: Villain): Diamond | undefined {
		const distances = new Map<Diamond, number>()
		for (const d of this.field.diamonds) {
			distances.set(d, d.pos.distance(v.pos))
		}

		let closest: Diamond | undefined = undefined

		distances.forEach((n, d) => {
			if (closest === undefined) {
				closest = d
			}
			const dd = distances.get(closest)
			if (dd !== undefined && n < dd) {
				closest = d
			}
		});

		return closest
	}
}
