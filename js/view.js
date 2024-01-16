import {
	MainTitle,
	AddBlock,
	ListBlock,
	TotalBlock,
	ListItem,
} from "./components.js";

function View() {
	let myContainer = null;
	let routesObj = null;

	let listBlock = null;
	let sumsArray = null;

	this.init = function (container, routes) {
		myContainer = container;
		routesObj = routes;
	};

	this.renderContent = function (hashPageName) {
		let routeName = "default";

		if (hashPageName.length > 0) {
			routeName = hashPageName in routesObj ? hashPageName : "error";
		}

		window.document.title = routesObj[routeName].title;
		myContainer.innerHTML = routesObj[routeName].render(`${routeName}`);

		listBlock = document.querySelector(".list");
	};

	this.addListItem = function (name, sum, key) {
		if (listBlock) listBlock.innerHTML += ListItem.render(name, sum, key);
		this.countTotalSum();
    this.enableAddBtn();

		document.querySelector(".add-input-name").value = "";
		document.querySelector(".add-input-sum").value = "";
	};

	this.copyListItem = function () {
		const array = [];
		const items = document.querySelectorAll(".list-item-value");
		items.forEach((el) => {
			array.push(el.textContent);
		});

		let text = array.join("\n");
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log("Текст успешно скопирован в буфер обмена");
			})
			.catch((error) => {
				console.error("Не удалось скопировать текст: ", error);
			});
	};

	this.removeListItem = function (event) {
		event.target.closest(".list-item").remove();
		this.countTotalSum();
	};

	this.clearList = function () {
		listBlock.innerHTML = "";
		document.querySelector(".total-sum").textContent = 0;
	};

	this.renderListItems = function (listItem) {
		if (listBlock) {
			for (let key in listItem) {
				const item = listItem[key];
				listBlock.innerHTML += ListItem.render(item.name, item.sum, key);
			}
		}
		this.countTotalSum();
		this.copyListItem();
	};

	this.countTotalSum = function () {
		const array = [];
		sumsArray = document.querySelectorAll(".list-item-sum");
		sumsArray.forEach((el) => {
			array.push(Number(el.textContent));
		});

		let result = array.reduce((sum, el) => (sum += el), 0);
		document.querySelector(".total-sum").innerHTML = result;
	};

	this.enableAddBtn = function (state) {
		if (state) {
			document.querySelector(".add-button").removeAttribute("disabled");
		} else {
			document
				.querySelector(".add-button")
				.setAttribute("disabled", "disabled");
		}
	};
}

export default View;
