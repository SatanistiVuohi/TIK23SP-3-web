let rand_num1 = 0;
let rand_num2 = 0;
let correctCount = 0;
let incorrectCount = 0;
let attempts = 0;
const maxAttempts = 10;
let askedQuestions = new Set();

const updateScore = () => {
    document.querySelector('#correctCount').textContent = `Oikeat vastaukset: ${correctCount}`;
    document.querySelector('#incorrectCount').textContent = `Väärät vastaukset: ${incorrectCount}`;
}

const getRandomIntNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomizeNumbers = () => {
    do {
        const allowedDenominators = [1, 2, 3, 4, 5, 10];
        rand_num2 = allowedDenominators[Math.floor(Math.random() * allowedDenominators.length)];
        const multiplier = getRandomIntNumberInRange(1, 10);
        rand_num1 = rand_num2 * multiplier;
    } while (askedQuestions.has(`${rand_num1}/${rand_num2}`));

    askedQuestions.add(`${rand_num1}/${rand_num2}`);
    document.querySelector('#num1').textContent = rand_num1;
    document.querySelector('#num2').textContent = rand_num2;
}


document.addEventListener("DOMContentLoaded", () => {
    randomizeNumbers();
    updateScore();

    document.querySelector('#calculate').addEventListener('click', () => {
        attempts++;

        const answer = Number(document.querySelector('input').value);
        const correctAnswer = rand_num1 / rand_num2;
        const messageElement = document.querySelector('#message');

        if (answer === correctAnswer) {
            correctCount++;
            messageElement.textContent = 'Oikein!';
        } else {
            incorrectCount++;
            messageElement.textContent = 'Väärin!';
        }

        updateScore();

        if (attempts < maxAttempts) {
            randomizeNumbers();
        } else {
            endGame();
        }

        document.querySelector('input').value = '';
    });
});

const endGame = () => {
    document.querySelector('#calculate').removeEventListener('click', handleCalculateClick);
    const operationDiv = document.querySelector('form div');
    if (operationDiv) {
        operationDiv.style.display = 'none';
    }
    const calculateButton = document.querySelector('#calculate');
    if (calculateButton) {
        calculateButton.style.display = 'none';
    }

    updateScore();
    if (!document.querySelector('#playAgainButton')) {
        const playAgainButton = document.createElement('button');
        playAgainButton.id = 'playAgainButton';
        playAgainButton.textContent = 'Pelaa uudelleen';
        playAgainButton.addEventListener('click', () => {
            window.location.reload();
        });
        document.querySelector('#container').appendChild(playAgainButton);
    }

    if (!document.querySelector('#nextLevelButton')) {
        const nextLevelButton = document.createElement('button');
        nextLevelButton.id = 'nextLevelButton';
        nextLevelButton.textContent = 'Palaa peleihin!';
        nextLevelButton.addEventListener('click', () => {
            window.location.href = 'pelit.html';
        });
        document.querySelector('#container').appendChild(nextLevelButton);
    }
}


const handleCalculateClick = () => {
    // Koodi tähän
};
