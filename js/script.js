import { Page } from "./pages.js";
import { createKeyboard, pressKeyOnKeyboard } from "./keyboard.js";
import { createWords, getRandomIndex } from "./words.js";

const myHangman = (function () {
	return {
		init: function () {
			document.body.innerHTML = Page.render();
		},
	};
})();

document.addEventListener("DOMContentLoaded", myHangman.init());
createKeyboard();
getRandomIndex();
createWords();

const modal = document.querySelector(".modal");
const restartBtn = document.querySelector(".restart-btn");
const virtualKeyboard = document.querySelector(".keyboard");

const manHead = document.querySelector(".man-head");
const manBody = document.querySelector(".man-body");
const manLeftHand = document.querySelector(".man-left-hand");
const manRightHand = document.querySelector(".man-right-hand");
const manLeftFoot = document.querySelector(".man-left-foot");
const manRightFoot = document.querySelector(".man-right-foot");

restartBtn.addEventListener("click", restartGame);
document.addEventListener("keydown", pressKeyOnKeyboard);
virtualKeyboard.addEventListener("click", pressKey);

function pressKey(event) {
	const letters = document.querySelectorAll(".letter");
	let flag = true;
	let button = event.target.closest(".btn");

	letters.forEach((element) => {
		if (event.target.textContent === element.getAttribute("data-letter")) {
			element.classList.add("active");
			counter(false);
			flag = false;
		}
	});

	if (button !== virtualKeyboard && virtualKeyboard.contains(button)) {
		button && button.classList.add("active");
		button && button.setAttribute("disabled", "disabled");

		flag ? counter(true) : (flag = true);

		checkIfActive();
	}
}

function counter(value) {
	if (value === false) {
		return;
	} else {
		const triesBlock = document.querySelector(".tries");
		triesBlock.textContent++;

		switch (triesBlock.textContent) {
			case "1":
				manHead.classList.add("active");
				break;
			case "2":
				manBody.classList.add("active");
				break;
			case "3":
				manLeftHand.classList.add("active");
				break;
			case "4":
				manRightHand.classList.add("active");
				break;
			case "5":
				manLeftFoot.classList.add("active");
				break;
			case "6":
				manRightFoot.classList.add("active");
				break;
			default:
				break;
		}

		if (triesBlock.textContent === "6") {
			document.querySelector(".result-message").innerHTML =
				"You are dead <br> &#128546;";
			modal.classList.remove("hidden");
			document.removeEventListener("keydown", pressKeyOnKeyboard);
		}
	}
}

function restartGame() {
	manHead.classList.remove("active");
	manBody.classList.remove("active");
	manLeftHand.classList.remove("active");
	manRightHand.classList.remove("active");
	manLeftFoot.classList.remove("active");
	manRightFoot.classList.remove("active");

	modal.classList.add("hidden");

	document.querySelector(".word-block").innerHTML = "";
	document.querySelector(".tries").innerHTML = "0";
	document.querySelector(".keyboard").innerHTML = "";
	createKeyboard();
	createWords();
	document.addEventListener("keydown", pressKeyOnKeyboard);
}

function checkIfActive() {
	const wordBlock = document.querySelector(".word-block");
	const length = wordBlock.children.length;
	const letters = wordBlock.querySelectorAll(".active");

	if (letters.length === length) {
		modal.classList.remove("hidden");
		document.querySelector(".result-message").innerHTML =
			"You are alive <br> &#129395;";
		document.removeEventListener("keydown", pressKeyOnKeyboard);
	}
}

export { counter, checkIfActive, restartGame };
