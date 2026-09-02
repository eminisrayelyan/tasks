const input = document.querySelector('.input');

function handleClcik(e) {
    if (e.target.matches('.button')) {
        if (input.textContent.length <= 10) {
            if (e.target.matches('.plus, .minus, .mul, .division')) {
                const last = input.textContent.at(-1);

                if ('+-*/'.includes(last) || input.textContent === '') {
                    return;
                }
            }

            if (e.target.matches('.clear')) {
                input.textContent = '';
            }

            else if (e.target.matches('.equal')) {
                input.textContent = eval(input.textContent);
            } else {
                input.textContent += e.target.innerText
            }
        } else {
            if (e.target.matches('.equal')) {
                input.textContent = eval(input.textContent);
            } else if (e.target.matches('.clear')) {
                input.textContent = '';
            }

            return;
        }
    }
}

document.addEventListener('click', handleClcik);