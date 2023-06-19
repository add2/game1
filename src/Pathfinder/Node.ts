import Position from "../Position";

export default class Node {
	pos: Position
	cost: number
	adjacent: Set<Node>
	previous: Node | undefined

	constructor(pos: Position) {
		this.pos = pos
		this.cost = Number.MAX_VALUE
		this.adjacent = new Set<Node>()
	}

	eq(n: Node) {
		return this.pos.eq(n.pos)
	}
}