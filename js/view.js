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
	};

	this.clearList = function () {
		listBlock.innerHTML = "";
		document.querySelector(".total-sum").textContent = 0;
	};

	this.renderListItems = function (listItem) {
		if (listBlock) {
			for (let key in listItem) {
				const item = listItem[key];
				listBlock.innerHTML += ListItem.render(item.name, item.sum);
			}
		}
	};

	this.countTotalSum = function () {
		const array = [];
		const sumsArray = document.querySelectorAll(".list-item-sum");
		sumsArray.forEach((el) => {
			array.push(Number(el.textContent));
		});
		let result = array.reduce((sum, el) => (sum += el), 0);

		console.log(result);
		document.querySelector(".total-sum").innerHTML = result;
		console.log(document.querySelector(".total-sum"));
	};
}

export default View;
