import Position from "./Position"

export default class Item {
	pos: Position
	step: number
	element: HTMLDivElement

	constructor(pos: Position, step: number) {
		this.pos = pos
		this.step = step
		this.element = document.createElement('div')
		this.element.classList.add('item')
	}

	commitPosition() {
		this.commitVerticalPosition()
		this.commitHorizontalPosition()
	}

	commitVerticalPosition() {
		this.element.style.top = (this.pos.y * this.step) + "px";
	}

	commitHorizontalPosition() {
		this.element.style.left = (this.pos.x * this.step) + "px";
	}
}