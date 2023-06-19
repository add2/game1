export default class Position {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	up() {
		this.y--
	}

	down() {
		this.y++
	}

	left() {
		this.x--
	}

	right() {
		this.x++
	}

	copy(): Position {
		return new Position(this.x, this.y)
	}

	eq(p: Position) {
		return this.x === p.x && this.y === p.y
	}

	distance(p: Position) {
		return Math.sqrt(Math.pow(Math.abs(this.x - p.x), 2) + Math.pow(Math.abs(this.y - p.y), 2));
	}

	toString() {
		return this.x + ":" + this.y
	}
}
