const MainTitle = {
	render: () => {
		return `
    <h1 class="main-title">Помощь бездомным животным Солигорска</h1>
    `;
	},
};

const AddBlock = {
	render: () => {
		return `
    <form class="add-block">
        <label class="label" for="add-input-name">Имя</label>
        <input type="text" class="add-input-name" id="add-input-name" required>
        <label class="label" for="add-input-sum">Сумма</label>
        <input type="number" class="add-input-sum" id="add-input-sum" required>
        <button type="button" class="add-button">Добавить</button>
    </form>
	`;
	},
};

const ListBlock = {
	render: () => {
		return `
    <section class="list-block">
        <ul class="list">
        </ul>
    </section>
	`;
	},
};

const TotalBlock = {
	render: () => {
		return `
    <div class="total">Итого: <span class="total-sum">0</span> руб.</div>
      <button class="copy-btn">Скопировать все данные</button>
      <button class="clear-btn">Очистить список</button>
	`;
	},
};

export { MainTitle, AddBlock, ListBlock, TotalBlock };
