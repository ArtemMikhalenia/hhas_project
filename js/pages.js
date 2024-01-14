import { MainTitle, AddBlock, ListBlock, TotalBlock } from "./components.js";

const Page = {
	render: () => {
		return `<main class="main-container">
              ${MainTitle.render()}
              ${AddBlock.render()}
              ${ListBlock.render()}
              ${TotalBlock.render()}
            </main>
    `;
	},
};

export { Page };
