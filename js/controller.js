function Controller() {
	let myContainer = null;
	let myModel = null;

	function updateState() {
		const hashPageName = location.hash.slice(1).toLowerCase();
		myModel.updateState(hashPageName);
		myModel.loadListItems();
		myModel.countTotalSum();
		// myModel.loadProducts();
		// myModel.loadOptions();
		// myModel.loadExercise();

		const list = document.querySelector(".list");
		const addButton = document.querySelector(".add-button");
		const clearListBtn = document.querySelector(".clear-btn");

		addButton.addEventListener("click", addListItem);
		clearListBtn.addEventListener("click", clearList);
	}

	function addListItem() {
		const nameInput = document.querySelector(".add-input-name");
		const sumInput = document.querySelector(".add-input-sum");
		myModel.addListItem(nameInput.value, sumInput.value);
	}

	function clearList() {
		myModel.clearList();
	}

	return {
		init: function (container, model) {
			myContainer = container;
			myModel = model;

			window.addEventListener("hashchange", updateState);
			updateState();
		},
	};
}

export default Controller;
