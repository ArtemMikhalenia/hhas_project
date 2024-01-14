import { Page } from "./pages.js";
import {
	getDatabase,
	ref,
	set,
	update,
	get,
	child,
	push,
	remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
	apiKey: "AIzaSyDyv6oM0hJWbQ82ofxEqEd0Tta5VMUy8wE",
	authDomain: "hhasproject.firebaseapp.com",
	databaseURL:
		"https://hhasproject-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "hhasproject",
	storageBucket: "hhasproject.appspot.com",
	messagingSenderId: "693171081016",
	appId: "1:693171081016:web:b91b463d5491c540463bcd",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const wrapper = document.querySelector(".wrapper");

const myHHASapp = (function () {
	return {
		init: function () {
			wrapper.innerHTML = Page.render();
		},
	};
})();

document.addEventListener("DOMContentLoaded", myHHASapp.init());

const list = document.querySelector(".list");
const addButton = document.querySelector(".add-button");
const nameInput = document.querySelector(".add-input-name");
const sumInput = document.querySelector(".add-input-sum");
const clearListBtn = document.querySelector(".clear-btn");

addButton.addEventListener("click", addData);
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

// function getInfo() {
// 	return nameInput.value, sumInput.value;
// }

function addData() {
	set(ref(database, "List/" + nameInput.value), {
		name: nameInput.value,
		sum: sumInput.value,
	});
}

function clearList() {
	list.innerHTML = "";
	document.querySelector(".total-sum").textContent = 0;
	set(child(ref(database), "List/"), "");
}

function countTotalSum() {
	const array = [];
	const sumsArray = document.querySelectorAll(".list-item-sum");
	sumsArray.forEach((el) => {
		array.push(Number(el.textContent));
	});
	return array.reduce((sum, el) => (sum += el), 0);
}
