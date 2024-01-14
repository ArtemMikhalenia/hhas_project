
// function countTotalSum() {
// 	const array = [];
// 	const sumsArray = document.querySelectorAll(".list-item-sum");
// 	sumsArray.forEach((el) => {
// 		array.push(Number(el.textContent));
// 	});
// 	return array.reduce((sum, el) => (sum += el), 0);
// }

import View from "./view.js";
import Model from "./model.js";
import Controller from "./controller.js";

import { MainTitle, AddBlock, ListBlock, TotalBlock, ListItem } from "./components.js";
import { Page } from "./pages.js";

const components = {
	mainTitle: MainTitle,
	addBlock: AddBlock,
	listBlock: ListBlock,
	totalBlock: TotalBlock,
  listItem: ListItem,
};

const routes = {
	page: Page,
	default: Page,
};

const myHHASapp = (function () {
	return {
		init: function ({ container, routes, components }) {
			this.renderComponents(container, components);

			const myView = new View();
			const myModel = new Model();
			const myController = new Controller();

			myView.init(document.getElementById(container), routes);
			myModel.init(myView);
			myController.init(document.getElementById(container), myModel);
		},

		renderComponents: function (container, components) {
			const root = document.getElementById(container);
			const componentsList = Object.keys(components);
			for (let item of componentsList) {
				root.innerHTML += components[item].render("component");
			}
		},
	};
})();

document.addEventListener(
	"DOMContentLoaded",
	myHHASapp.init({
		container: "wrapper",
		routes: routes,
		components: components,
	})
);
