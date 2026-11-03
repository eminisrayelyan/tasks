const input = document.querySelector('.input');
const button = document.querySelector('.button')

function handleClcik(e) {
    if (!e.target.matches('.button')) {
        return;
    }

    if (e.target.matches('.clear')) {
        input.textContent = '';
        return;
    }

    if (e.target.matches('.equal')) {
        input.textContent = eval(input.textContent);
        return;
    }

    const isOperator = e.target.matches('.plus, .minus, .mul, .division');
    const last = input.textContent.at(-1);

    if (input.textContent.length >= 10) {
        return;
    }
            
    if (isOperator && (input.textContent === '' || '+-*/'.includes(last))) {
        return;
    } 
     
    input.textContent += e.target.innerText;
    
}

document.addEventListener('click', handleClcik);