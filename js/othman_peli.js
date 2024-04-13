let rand_num1 = 0;
let rand_num2 = 0;
let correctCount = 0;
let incorrectCount = 0;
let attempts = 0;
const maxAttempts = 11;

const updateScore = () => {
    document.querySelector('#correctCount').textContent = `Oikeat vastaukset: ${correctCount}`;
    document.querySelector('#incorrectCount').textContent = `Väärät vastaukset: ${incorrectCount}`;
}

const getRandomIntNumberInRange = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

const randomizeNumbers = () => {
    rand_num1 = getRandomIntNumberInRange(1 , 10);
    rand_num2 = getRandomIntNumberInRange(1 , 10);
    const operator = getRandomIntNumberInRange(1, 2);
    if (operator === 1) {
        document.querySelector('#num1').textContent = rand_num1;
        document.querySelector('#num2').textContent = rand_num2;
        document.querySelector('#operator').textContent = '+';
    } else {
        document.querySelector('#num1').textContent = rand_num1 + rand_num2;
        document.querySelector('#num2').textContent = rand_num2;
        document.querySelector('#operator').textContent = '-';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    randomizeNumbers();
    updateScore();

    document.querySelector('#calculate').addEventListener('click', () => {
        if (attempts >= maxAttempts) {
            return; // Estetään toiminto, jos peli on päättynyt
        }

        const answer = Number(document.querySelector('input').value);
        const correctAnswer = eval(document.querySelector('#num1').textContent + document.querySelector('#operator').textContent + document.querySelector('#num2').textContent);
        const messageElement = document.querySelector('#message');
        
        attempts++;

        if (answer === correctAnswer) {
            messageElement.textContent = 'Oikein!';
            correctCount++;
        } else {
            messageElement.textContent = 'Väärin!';
            incorrectCount++;
        }

        if (attempts === maxAttempts) {
            endGame();
        }
        
        randomizeNumbers();
        document.querySelector('input').value = '';
        updateScore();
    });

    const endGame = () => {
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Pelaa uudelleen';
        playAgainButton.addEventListener('click', () => {
            attempts = 0;
            correctCount = 0;
            incorrectCount = 0;
            updateScore();
            randomizeNumbers();
            playAgainButton.remove();
            nextLevelButton.remove();
        });
        document.querySelector('#container').appendChild(playAgainButton);

        const nextLevelButton = document.createElement('a');
        nextLevelButton.textContent = 'Palaa pelit-sivulle';
        nextLevelButton.href = '';
        document.querySelector('#container').appendChild(nextLevelButton);

        document.querySelector('#calculate').removeEventListener('click');
    }
});
