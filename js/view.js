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

	this.addListItem = function (name, sum) {
		if (listBlock) listBlock.innerHTML += ListItem.render(name, sum);
	};

	this.clearList = function () {
		listBlock.innerHTML = "";
		document.querySelector(".total-sum").textContent = 0;
	};
}

export default View;
