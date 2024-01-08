function Controller() {
	let myContainer = null;
	let myModel = null;
	let inputEmail = null;
	let inputPassword = null;
	let exerciseSearchInput = null;
	let productsSearchInput = null;

	function updateState() {
		const hashPageName = location.hash.slice(1).toLowerCase();
		myModel.updateState(hashPageName);
		myModel.manageUser();
		myModel.loadExercises();
		myModel.loadProducts();
		myModel.loadOptions();
		myModel.loadExercise();

		//кнопки начальной страницы и модального окна
		const buttonStart = myContainer.querySelector(".btn-start");

		if (hashPageName === "startpage" || hashPageName === "") {
			buttonStart.addEventListener("click", startEditing);
		}

		if (hashPageName === "trainingpage") {
			let trainingBlock = document.querySelector(".training-block");
			trainingBlock &&
				trainingBlock.addEventListener("click", (event) => {
					if (event.target.className === "exercise__ready-btn") {
						readyExercise(event);
					} else if (event.target.className === "exercise__delete-btn") {
						removeExercise(event);
					}
				});
		}
	}

	function startEditing() {
		myModel.startEditing();
	}

	//<ФУНКЦИИ СТРАНИЦЫ "АККАУНТ">===================================================================================================

	function openUserInfoModal() {
		const buttonCloseInfoModal = document.querySelector(".user-modal__close");
		buttonCloseInfoModal.addEventListener("click", closeUserInfoModal);
		const buttonSaveUserInfo = document.querySelector(".user-modal__save");
		buttonSaveUserInfo.addEventListener("click", changeUserInfo);
		myModel.openUserInfoModal();
	}

	function changeUserInfo() {
		const nameInput = document.querySelector(".user-modal__name");
		const birthdayInput = document.querySelector(".user-modal__birthday");
		const genderInput = document.querySelector(".user-modal__gender");
		const weightInput = document.querySelector(".user-modal__weight");
		const heightInput = document.querySelector(".user-modal__height");
		const medicalInfoInput = document.querySelector(".user-modal__medicalInfo");
		const goalInput = document.querySelector(".user-modal__goal");
		const phoneInput = document.querySelector(".user-modal__phone");
		const emailInput = document.querySelector(".user-modal__email");
		const achievementsInput = document.querySelector(
			".user-modal__achievements"
		);

		myModel.changeUserInfo(
			nameInput.value,
			birthdayInput.value,
			genderInput.value,
			weightInput.value,
			heightInput.value,
			medicalInfoInput.value,
			goalInput.value,
			phoneInput.value,
			emailInput.value,
			achievementsInput.value
		);
	}

	function closeUserInfoModal() {
		myModel.closeUserInfoModal();
	}

	//<ФУНКЦИИ СТРАНИЦЫ "ТРЕНИРОВКА">===================================================================================================

	function openExerciseModal() {
		myModel.openExerciseModal();

		const buttonCloseExerciseModal = document.querySelector(
			".training-modal__close"
		);
		buttonCloseExerciseModal.addEventListener("click", closeExerciseModal);

		const buttonAddExercise = document.querySelector(".training-modal__add");
		buttonAddExercise.addEventListener("click", addExercise);
	}

	function closeExerciseModal() {
		myModel.closeExerciseModal();
	}

	function addExercise() {
		const inputTrainingExerciseName = document.querySelector("#exercisename");
		const inputTrainingExerciseSet = document.querySelector("#exerciseset");
		const inputTrainingExerciseWeight =
			document.querySelector("#exerciseweight");
		const inputTrainingExerciseTime = document.querySelector("#exercisetime");

		myModel.addExercise(
			inputTrainingExerciseName.value,
			inputTrainingExerciseSet.value,
			inputTrainingExerciseWeight.value,
			inputTrainingExerciseTime.value
		);
	}

	function clearTrainingBlock() {
		myModel.clearTrainingBlock();
	}

	function readyExercise(event) {
		myModel.readyExercise(event);
	}

	function removeExercise(event) {
		myModel.removeExercise(event);
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
