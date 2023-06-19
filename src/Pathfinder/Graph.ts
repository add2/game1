import Position from "../Position";
import Node from "./Node";
import Field from "../Field";

export default class Graph {
	map: Map<string, Node>

	constructor(field: Field) {
		this.map = new Map<string, Node>()

		for (let x = 0; x < field.width; x++) {
			for (let y = 0; y < field.height; y++) {
				const p = new Position(x, y)
				const n = new Node(p)
				this.map.set(p.toString(), n)
			}
		}

		for (let x = 0; x < field.width; x++) {
			for (let y = 0; y < field.height; y++) {
				const node = this.node(new Position(x, y))

				const adjacent = [
					new Position(x - 1, y),
					new Position(x + 1, y),
					new Position(x, y - 1),
					new Position(x, y + 1),
				]

				for (let i = 0; i < adjacent.length; i++) {
					if (field.isInsideField(adjacent[i])) {
						node.adjacent.add(this.node(adjacent[i]))
					}
				}
			}
		}
	}

	node(p: Position): Node {
		const node = this.map.get(p.toString())
		if (undefined === node) {
			throw new Error('Node not found ' + p.toString())
		}
		return node
	}

	clean() {
		for (let node of this.map.values()) {
			node.cost = Number.MAX_VALUE
			node.previous = undefined
		}
	}
}