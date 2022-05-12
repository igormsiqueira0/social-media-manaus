const nav = document.querySelectorAll('.programacao nav li');
const ulToInsertData = document.querySelector('.programacao--list');

let data,
	cronograma = [];

async function fetchData() {
	const json = await (await fetch('./palestrantes.json')).json();

	data = json;
	arrangeData();
}
fetchData();

function arrangeData() {
	data.forEach(({ dia, horario, nome, descricao }) => {
		let palestranteInfo = { horario, nome, descricao };

		if (!cronograma[dia]) {
			cronograma[dia] = [];
		}

		cronograma[dia].push(palestranteInfo);
	});
}

// eventos -----------------------------------------

const updateVisualContent = ({ currentTarget }) => {
	const dia = currentTarget.dataset.dia;
	nav.forEach((item) => {
		item.classList.remove('active');
	});
	currentTarget.classList.add('active');
	ulToInsertData.innerHTML = '';

	if (Array.isArray(cronograma[dia]))
		cronograma[dia].forEach((info) => {
			const newLi = document.createElement('li');

			newLi.classList.add('programacao--item');

			newLi.innerHTML = `
			<span>${info.horario}</span>
			<div class='programacao--item--content'>
				<h2>${info.nome}</h2>
				<p>${info.descricao}</p>
			</div>
			`;

			ulToInsertData.appendChild(newLi);
		});
};

nav.forEach((item) => {
	item.addEventListener('click', updateVisualContent);
});

setTimeout(() => {
	nav[0].click();
}, 500);

// labels inscrição ------------------------------------

const contatoLabel = () => {
	const labels = document.querySelectorAll('label'),
		inputs = document.querySelectorAll('input');

	function handleFocus(i) {
		labels[i].classList.add('active');
	}

	function handleBlur(field, i) {
		if (field.value.length === 0) {
			labels[i].classList.remove('active');
		}
	}

	inputs.forEach((field, index) => {
		field.addEventListener('focus', () => {
			handleFocus(index);
		});
		field.addEventListener('blur', () => {
			handleBlur(field, index);
		});
	});
};

contatoLabel();

// prevent programação link to go up

const aListProgramacao = document.querySelectorAll('.programacao li a');

aListProgramacao.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
	});
});
