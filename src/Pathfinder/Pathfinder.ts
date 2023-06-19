import Field from "./../Field";
import Position from "./../Position";
import Node from "./Node";
import Graph from "./Graph";
import Path from "./Path";
import Hero from "../Hero";

export default class Pathfinder {
	graph: Graph
	hero: Hero

	constructor(field: Field) {
		this.graph = new Graph(field)
		this.hero = field.hero
	}

	path(start: Position, end: Position): Path {
		this.graph.clean()
		return this.findPath(
			this.graph.node(start),
			this.graph.node(end),
		)
	}

	findPath(start: Node, end: Node): Path {
		const reachable = new Set<Node>();
		const explored = new Set<Node>();

		start.cost = 0
		reachable.add(start)

		while (reachable.size) {
			// Choose some node we know how to reach.
			const node = this.chooseNode(reachable, end)

			// If we just got to the goal node, build and return the path.
			if (node.eq(end)) {
				return this.buildPath(end)
			}

			// Don't repeat ourselves.
			reachable.delete(node)
			explored.add(node)

			// Where can we get from here?
			const newReachable = this.getAdjacentNodes(node, explored)
			for (let adjacent of newReachable) {
				if (!reachable.has(adjacent)) {
					reachable.add(adjacent)
				}

				// If this is a new path, or a shorter path than what we have, keep it.
				if (node.cost + 1 < adjacent.cost) {
					adjacent.previous = node
					adjacent.cost = node.cost + 1
				}
			}
		}

		// If we get here, no path was found
		return new Path()
	}

	chooseNode(reachable: Set<Node>, end: Node): Node {
		let min_cost = Number.MAX_VALUE
		let best_node: Node | null = null

		for (let node of reachable) {
			const cost = node.cost + this.estimateDistance(node, end)

			if (min_cost > cost) {
				min_cost = cost
				best_node = node
			}
		}

		if (null === best_node) {
			throw new Error("Reachable node not found")
		}

		return best_node
	}

	estimateDistance(a: Node, b: Node): number {
		return Math.sqrt( Math.pow(a.pos.x - b.pos.x, 2) + Math.pow(a.pos.y - b.pos.y, 2))
	}

	buildPath(to: Node) {
		const path = new Path()
		path.append(to)
		while (to.previous) {
			path.append(to.previous)
			to = to.previous
		}
		return path
	}

	getAdjacentNodes(node: Node, explored: Set<Node>) {
		const copyAdjacentNodes = new Set(node.adjacent);
		copyAdjacentNodes.delete(this.graph.node(this.hero.pos))
		for (const n of explored) {
			copyAdjacentNodes.delete(n)
		}
		return copyAdjacentNodes
	}
}
