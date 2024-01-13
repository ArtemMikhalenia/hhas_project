const words = [
	{ skating: "popular winter sport" },
	{ class: "template for creating objects" },
	{ dragon: "mythical creature" },
	{ bicycle: "vehicle with pedals" },
	{ coffee: "popular drink" },
	{ safari: "browser" },
	{ skyscraper: "tall building" },
	{ palindrome: "reads the same backward as forward" },
	{ infinite: "endless or limitless in space" },
	{ spectrum: "range of colors, wavelengths, or energies" },
	{ safe: "free from harm" },
	{ dolphin: "highly intelligent marine mammal" },
	{ mosquito: "small, biting insect" },
	{ sunflower: "tall flower" },
	{ function: "reusable block of code" },
];

function createWords() {
	let index = getRandomIndex();
	const wordObj = words[index];

	let word = "";
	let hint = "";

	for (let key in wordObj) {
		word = key;
		hint = wordObj[key];
	}

	document.querySelector(
		".secret-word"
	).textContent = `Secret word is "${word}"`;

	for (let i = 0; i < word.length; i++) {
		const letterBlock = document.createElement("p");
		const letter = document.createElement("span");

		letterBlock.className = "letter";
		letterBlock.dataset.letter = word[i].toUpperCase();
		letter.textContent = word[i].toUpperCase();

		document.querySelector(".word-block").append(letterBlock);
		letterBlock.append(letter);

		document.querySelector(".hint-block").textContent = `Hint: ${hint}`;
	}
}

function getRandomIndex() {
	let currentIndex = parseInt(sessionStorage.getItem("currentIndex"));
	let newIndex;

	do {
		newIndex = Math.floor(Math.random() * words.length);
	} while (newIndex === currentIndex);

	sessionStorage.setItem("currentIndex", newIndex);

	return currentIndex;
}

export { createWords, getRandomIndex };
