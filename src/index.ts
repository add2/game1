import Game from "./Game";
import "./styles.css"

document.addEventListener("DOMContentLoaded", function() {
	try {
		new Game(5, 5, 4)
	} catch (err) {
		console.log(err)
		alert(err)
	}
})
