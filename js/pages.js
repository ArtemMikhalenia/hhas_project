import { MainTitle, AddBlock, ListBlock, TotalBlock } from "./components.js";

const Page = {
	id: "page",
	title: "Помощь бездомным животным Солигорска",
	render: () => {
		return `
    <main class="main-container">
      ${MainTitle.render()}
      ${AddBlock.render()}
      ${ListBlock.render()}
      ${TotalBlock.render()}
    </main>`;
	},
};

export { Page };
