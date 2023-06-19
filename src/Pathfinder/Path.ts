import Node from "./Node";
import Position from "../Position";

export default class Path {
	path: Node[] = []

	append(node: Node) {
		this.path.push(node)
	}

	firstStep(): Position | undefined {
		if (this.path.length < 2) {
			return undefined
		}
		return this.path[this.path.length - 2].pos
	}
}