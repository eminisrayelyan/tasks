const form = document.querySelector('.form');


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

    h1.innerHTML += inputName === `Welcome ${inputName.value} ${inputSurname.value} <br>`;

    h1.innerHTML += `your age is ${age.value}`

    document.body.prepend(h1);
}


form.addEventListener('submit', handleSubmit, {once: true})

