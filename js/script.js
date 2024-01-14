const list = document.querySelector(".list");
const addButton = document.querySelector(".add-button");
const nameInput = document.querySelector(".add-input-name");
const sumInput = document.querySelector(".add-input-sum");
const clearListBtn = document.querySelector(".clear-btn");

addButton.addEventListener("click", addListItem);
clearListBtn.addEventListener("click", clearList);

function addListItem() {
	const listItem = document.createElement("li");
	const buttonsBlock = document.createElement("span");
	const editBtnItem = document.createElement("button");
	const deleteBtnItem = document.createElement("button");
	listItem.className = "list-item";
	buttonsBlock.className = "buttons-block";
	editBtnItem.className = "edit-btn";
	editBtnItem.innerHTML = "&#128397";
	deleteBtnItem.className = "delete-btn";
	deleteBtnItem.innerHTML = "&#10060;";
	listItem.innerHTML = `<span class="list-item-value">+<span class="list-item-sum">${sumInput.value}</span> руб. - ${nameInput.value}</span>`;

	buttonsBlock.append(editBtnItem);
	buttonsBlock.append(deleteBtnItem);
	listItem.append(buttonsBlock);
	list.append(listItem);

	document.querySelector(".total-sum").textContent = countTotalSum();
	sumInput.value = "";
	nameInput.value = "";
}

function clearList() {
	list.innerHTML = "";
	document.querySelector(".total-sum").textContent = 0;
}

function countTotalSum() {
	const array = [];
	const sumsArray = document.querySelectorAll(".list-item-sum");
	sumsArray.forEach((el) => {
		array.push(Number(el.textContent));
	});
	return array.reduce((sum, el) => (sum += el), 0);
}

// function getNameValue(){
//   console.log(nameInput.value);
// }

// import { Page } from "./pages.js";
// import { createKeyboard, pressKeyOnKeyboard } from "./keyboard.js";
// import { createWords, getRandomIndex } from "./words.js";

// const myHangman = (function () {
// 	return {
// 		init: function () {
// 			document.body.innerHTML = Page.render();
// 		},
// 	};
// })();

// document.addEventListener("DOMContentLoaded", myHangman.init());
// createKeyboard();
// getRandomIndex();
// createWords();

// const modal = document.querySelector(".modal");
// const restartBtn = document.querySelector(".restart-btn");
// const virtualKeyboard = document.querySelector(".keyboard");

// const manHead = document.querySelector(".man-head");
// const manBody = document.querySelector(".man-body");
// const manLeftHand = document.querySelector(".man-left-hand");
// const manRightHand = document.querySelector(".man-right-hand");
// const manLeftFoot = document.querySelector(".man-left-foot");
// const manRightFoot = document.querySelector(".man-right-foot");

// restartBtn.addEventListener("click", restartGame);
// document.addEventListener("keydown", pressKeyOnKeyboard);
// virtualKeyboard.addEventListener("click", pressKey);

// function pressKey(event) {
// 	const letters = document.querySelectorAll(".letter");
// 	let flag = true;
// 	let button = event.target.closest(".btn");

// 	letters.forEach((element) => {
// 		if (event.target.textContent === element.getAttribute("data-letter")) {
// 			element.classList.add("active");
// 			counter(false);
// 			flag = false;
// 		}
// 	});

// 	if (button !== virtualKeyboard && virtualKeyboard.contains(button)) {
// 		button && button.classList.add("active");
// 		button && button.setAttribute("disabled", "disabled");

// 		flag ? counter(true) : (flag = true);

// 		checkIfActive();
// 	}
// }

// function counter(value) {
// 	if (value === false) {
// 		return;
// 	} else {
// 		const triesBlock = document.querySelector(".tries");
// 		triesBlock.textContent++;

// 		switch (triesBlock.textContent) {
// 			case "1":
// 				manHead.classList.add("active");
// 				break;
// 			case "2":
// 				manBody.classList.add("active");
// 				break;
// 			case "3":
// 				manLeftHand.classList.add("active");
// 				break;
// 			case "4":
// 				manRightHand.classList.add("active");
// 				break;
// 			case "5":
// 				manLeftFoot.classList.add("active");
// 				break;
// 			case "6":
// 				manRightFoot.classList.add("active");
// 				break;
// 			default:
// 				break;
// 		}

// 		if (triesBlock.textContent === "6") {
// 			document.querySelector(".result-message").innerHTML =
// 				"You are dead <br> &#128546;";
// 			modal.classList.remove("hidden");
// 			document.removeEventListener("keydown", pressKeyOnKeyboard);
// 		}
// 	}
// }

// function restartGame() {
// 	manHead.classList.remove("active");
// 	manBody.classList.remove("active");
// 	manLeftHand.classList.remove("active");
// 	manRightHand.classList.remove("active");
// 	manLeftFoot.classList.remove("active");
// 	manRightFoot.classList.remove("active");

// 	modal.classList.add("hidden");

// 	document.querySelector(".word-block").innerHTML = "";
// 	document.querySelector(".tries").innerHTML = "0";
// 	document.querySelector(".keyboard").innerHTML = "";
// 	createKeyboard();
// 	createWords();
// 	document.addEventListener("keydown", pressKeyOnKeyboard);
// }

// function checkIfActive() {
// 	const wordBlock = document.querySelector(".word-block");
// 	const length = wordBlock.children.length;
// 	const letters = wordBlock.querySelectorAll(".active");

// 	if (letters.length === length) {
// 		modal.classList.remove("hidden");
// 		document.querySelector(".result-message").innerHTML =
// 			"You are alive <br> &#129395;";
// 		document.removeEventListener("keydown", pressKeyOnKeyboard);
// 	}
// }

// export { counter, checkIfActive, restartGame };
