import Item from "./Item";
import Hero from "./Hero";
import Villain from "./Villain";
import Diamond from "./Diamond";
import Position from "./Position";
import VillainsManager from "./VillainsManager";

interface Score {
	hero: number
	villain: number
}

export default class Field {
	step = 20 // px
	width: number
	height: number

	container: HTMLDivElement
	domField: HTMLDivElement
	scoreboard: HTMLDivElement

	score: Score = {
		hero: 0,
		villain: 0,
	}

	hero: Hero
	villains: Set<Villain>
	diamonds: Set<Diamond>

	villainsManager: VillainsManager

	constructor(width: number, height: number) {
		if (width < 1 || height < 1) {
			throw new Error('Incorrect WIDTH or HEIGHT')
		}

		this.width = width
		this.height = height

		this.villains = new Set<Villain>()
		this.diamonds = new Set<Diamond>()

		this.container = this.newContainer()
		this.domField = this.newDomFiled()
		this.scoreboard = this.newScoreboard()
		this.updateScoreView()

		this.hero = new Hero(this.centerPosition(), this.step)
		this.appendHero(this.hero)

		this.villainsManager = new VillainsManager(this)

		document.onkeydown = (e) => this.onKeyPress(e)
	}

	newContainer() {
		const div = document.createElement("div")
		div.className = "container"
		document.body.appendChild(div)
		return div
	}

	newDomFiled() {
		const div = document.createElement("div")
		div.className = "field"
		div.style.width = (this.width * this.step) + "px"
		div.style.height = (this.height * this.step) + "px"
		this.container.appendChild(div)
		return div
	}

	newScoreboard() {
		const div = document.createElement("div")
		div.className = "scoreboard"
		this.container.appendChild(div)
		return div
	}

	heroBonus() {
		this.score.hero++
		this.updateScoreView()
	}

	villainBonus() {
		this.score.villain++
		this.updateScoreView()
	}

	updateScoreView() {
		this.scoreboard.innerText = this.score.hero + " / " + this.score.villain
	}

	appendHero(item: Item) {
		item.commitPosition()
		this.domField.appendChild(item.element)
	}

	appendItem(item: Item): boolean {
		if (!this.isEmptyCell(item.pos)) {
			return false
		}
		item.commitPosition()
		this.domField.appendChild(item.element)
		return true
	}

	appendVillain(villain: Villain): boolean {
		if (this.appendItem(villain)) {
			this.villains.add(villain)
			return true
		}
		return false
	}

	appendDiamond(diamond: Diamond): boolean {
		if (this.appendItem(diamond)) {
			this.diamonds.add(diamond)
			return true
		}
		return false
	}

	appendRandomDiamond() {
		this.appendDiamond(
			new Diamond(this.randomEmptyPosition(), this.step)
		)
	}

	isEmptyCell(pos: Position): boolean {
		return this.isInsideField(pos)
			&& !this.isHeroCell(pos)
			&& !this.isVillainCell(pos)
			&& !this.isDiamondCell(pos)
	}

	isInsideField(pos: Position): boolean {
		return pos.x >= 0 && pos.y >= 0 && pos.x < this.height && pos.y < this.height
	}

	isHeroCell(pos: Position): boolean {
		return pos.eq(this.hero.pos)
	}

	isVillainCell(pos: Position): boolean {
		for (let villain of this.villains) {
			if (pos.eq(villain.pos)) {
				return true
			}
		}
		return false
	}

	isDiamondCell(pos: Position): boolean {
		return null !== this.getDiamondFromCell(pos)
	}

	getDiamondFromCell(pos: Position): Diamond | null {
		for (let diamond of this.diamonds) {
			if (pos.eq(diamond.pos)) {
				return diamond
			}
		}
		return null
	}

	centerPosition(): Position {
		return new Position(
			Math.round((this.width-1)/2),
			Math.round((this.height-1)/2)
		)
	}

	randomEmptyPosition(): Position {
		const pos = new Position(0, 0)
		do {
			pos.x = Math.floor(Math.random() * this.width)
			pos.y = Math.floor(Math.random() * this.height)
		} while (!this.isEmptyCell(pos))
		return pos
	}


	removeDiamond(d: Diamond) {
		if (this.diamonds.has(d)) {
			d.element.remove()
			this.diamonds.delete(d)
		}
	}

	heroCellProcessing(p: Position) {
		if (!this.isInsideField(p) || this.isVillainCell(p)) {
			return
		}

		this.hero.moveTo(p)

		const d = this.getDiamondFromCell(p)
		if (null !== d) {
			this.removeDiamond(d)
			this.heroBonus()
			this.appendRandomDiamond()
		}
	}

	villainCellProcessing(villain: Villain) {
		const p = this.villainsManager.nextPosition(villain)
		if (undefined === p) {
			return
		}

		villain.moveTo(p)

		const d = this.getDiamondFromCell(p)
		if (null !== d) {
			this.removeDiamond(d)
			this.villainBonus()
			this.appendRandomDiamond()
		}
	}

	onKeyPress(e: KeyboardEvent) {
		if (e.key === "ArrowUp") {
			e.preventDefault()
			const p = this.hero.pos.copy()
			p.up()
			this.heroCellProcessing(p)
		} else if (e.key === "ArrowDown") {
			e.preventDefault()
			const p = this.hero.pos.copy()
			p.down()
			this.heroCellProcessing(p)
		} else if (e.key === "ArrowLeft") {
			e.preventDefault()
			const p = this.hero.pos.copy()
			p.left()
			this.heroCellProcessing(p)
		} else if (e.key === "ArrowRight") {
			e.preventDefault()
			const p = this.hero.pos.copy()
			p.right()
			this.heroCellProcessing(p)
		}

		for (const v of this.villains) {
			this.villainCellProcessing(v)
		}
	}
}
