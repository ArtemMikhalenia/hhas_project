const MainTitle = {
	render: () => {
		return `
    <img class="logo animate__animated animate__zoomIn" src="../images/Logo.png" alt="Logo">
    <h1 class="main-title animate__animated animate__slideInDown">Помощь бездомным животным Солигорска</h1>
    `;
	},
};

const AddBlock = {
	render: () => {
		return `
    <form class="add-block">
        <label class="label animate__animated animate__slideInLeft" for="add-input-name">Имя</label>
        <input type="text" class="add-input-name animate__animated animate__slideInLeft" id="add-input-name" required>
        <label class="label animate__animated animate__slideInRight" for="add-input-sum">Сумма</label>
        <input type="number" class="add-input-sum animate__animated animate__slideInRight" id="add-input-sum" required>
        <button type="button" class="add-button animate__animated animate__slideInLeft" disabled>Добавить</button>
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
      <button class="copy-btn animate__animated animate__slideInUp">Скопировать все данные</button>
      <button class="clear-btn animate__animated animate__slideInUp">Очистить список</button>
	`;
	},
};

const ListItem = {
	render: (name, sum, key) => {
		return `<li class="list-item" data-key="${key}">
    <span class="list-item-value">+<span class="list-item-sum">${sum}</span> руб. - ${name}</span>
    <span class="buttons-block">
      <button class="delete-btn">Удалить</button>
    </span>
  </li>`;
	},
};

export { MainTitle, AddBlock, ListBlock, TotalBlock, ListItem };
