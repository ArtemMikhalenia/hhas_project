import { counter, checkIfActive, restartGame } from "./script.js";

function createKeyboard() {
	const buttonArray = [
		"Q",
		"W",
		"E",
		"R",
		"T",
		"Y",
		"U",
		"I",
		"O",
		"P",
		"A",
		"S",
		"D",
		"F",
		"G",
		"H",
		"J",
		"K",
		"L",
		"Z",
		"X",
		"C",
		"V",
		"B",
		"N",
		"M",
	];

	for (let i = 0; i < buttonArray.length; i++) {
		const button = document.createElement("button");
		button.className = "btn";
		button.id = `Key${buttonArray[i]}`;
		button.textContent = buttonArray[i];

		document.querySelector(".keyboard").append(button);
	}
}

function pressKeyOnKeyboard(event) {
	let pressedKey = document.querySelector(`#${event.code}`);
	const letters = document.querySelectorAll(".letter");
	let flag = true;

	pressedKey && pressedKey.classList.add("active");

	let key = event.code.slice(3);

	letters.forEach((element) => {
		if (key === element.getAttribute("data-letter")) {
			element.classList.add("active");
			counter(false);
			flag = false;
		}
	});

	if (pressedKey && !pressedKey.hasAttribute("disabled", "disabled")) {
		pressedKey.classList.add("active");
		pressedKey.setAttribute("disabled", "disabled");

		flag ? counter(true) : (flag = true);

		checkIfActive();
	}
}

export { createKeyboard, pressKeyOnKeyboard };
