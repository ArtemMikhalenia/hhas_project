const MainTitle = {
	render: () => {
		return `
    <h1 class="main-title"><span class="title-blue">The</span> Hangman</h1>
    `;
	},
};

const GallowsBlock = {
	render: () => {
		return `
    <div class="gallows-block">
      <img class="gallows" src="./images/gallows/gallows.svg" alt="gallows">
      <img class="man-head" src="./images/man/head.svg" alt="head">
      <img class="man-right-hand" src="./images/man/right-hand.svg" alt="right-hand">
      <img class="man-body" src="./images/man/body.svg" alt="body">
      <img class="man-left-hand" src="./images/man/left-hand.svg" alt="left-hand">
      <img class="man-right-foot" src="./images/man/right-foot.svg" alt="right-foot">
      <img class="man-left-foot" src="./images/man/left-foot.svg" alt="left-foot">
    </div>
	`;
	},
};

const WordBlock = {
	render: () => {
		return `
    <div class="word-block">
    </div>
	`;
	},
};

const HintBlock = {
	render: () => {
		return `
    <div class="hint-block"></div>
	`;
	},
};

const GuessesBlock = {
	render: () => {
		return `
    <div class="guesses-block">Incorrect guesses: <span class="tries">0</span> / 6</div>
	`;
	},
};

const Keyboard = {
	render: () => {
		return `
  <div class="keyboard"></div>
	`;
	},
};

const Modal = {
	render: () => {
		return `
      <div class="modal hidden">
        <div class="modal-body">
          <p class="result-message"></p>
          <p class="secret-word"></p>
          <button class="restart-btn">Play again</button>
        </div>
      </div>
	`;
	},
};

export {
	MainTitle,
	GallowsBlock,
	WordBlock,
	HintBlock,
	GuessesBlock,
	Keyboard,
	Modal,
};
