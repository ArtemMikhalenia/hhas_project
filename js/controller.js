function Controller() {
	let myContainer = null;
	let myModel = null;

	function updateState() {
		const hashPageName = location.hash.slice(1).toLowerCase();
		myModel.updateState(hashPageName);
		myModel.loadListItems();
		myModel.countTotalSum();

		const addButton = document.querySelector(".add-button");
		const copyList = document.querySelector(".copy-btn");
		const clearListBtn = document.querySelector(".clear-btn");

		addButton.addEventListener("click", addListItem);
		copyList.addEventListener("click", copyListItem);
		clearListBtn.addEventListener("click", clearList);

		const listBlock = document.querySelector(".list");
		listBlock.addEventListener("click", (event) => {
			if (event.target.className === "delete-btn") {
				removeListItem(event);
			}
		});
	}

	function addListItem() {
		const nameInput = document.querySelector(".add-input-name");
		const sumInput = document.querySelector(".add-input-sum");
		myModel.addListItem(nameInput.value, sumInput.value);
	}

	function copyListItem() {
		myModel.copyListItem();
	}

	function removeListItem(event) {
		myModel.removeListItem(event);
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
