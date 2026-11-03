const form = document.querySelector('.form');
const container = document.querySelector('.container');

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

document.querySelector('.change-color').addEventListener('click', () => {
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * 4)];
});

function handleSubmit(event) {
    event.preventDefault();

    const inputName = document.querySelector('.input-name');
    const inputSurname = document.querySelector('.input-surname');
    const age = document.querySelector('.age');

    const h1 = document.createElement('h1');

    h1.style.textAlign = 'center';

    h1.innerHTML += `Welcome ${inputName.value} ${inputSurname.value} <br>`;

    h1.innerHTML += `Your age is ${age.value}`;

    container.prepend(h1);
}


form.addEventListener('submit', handleSubmit, {once: true});