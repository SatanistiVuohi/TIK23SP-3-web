let rand_num1 = 0;
let rand_num2 = 0;
let correctCount = 0;
let incorrectCount = 0;
let attempts = 0;
const maxAttempts = 10;
let askedQuestions = new Set(); // Kysyttyjen kysymysten tallennus

const updateScore = () => {
    document.querySelector('#correctCount').textContent = `Oikeat vastaukset: ${correctCount}`;
    document.querySelector('#incorrectCount').textContent = `Väärät vastaukset: ${incorrectCount}`;
}

const getRandomIntNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomizeNumbers = () => {
    do {
        // Vain 1-5 ja 10 ovat sallittuja jakajia
        const allowedDenominators = [1, 2, 3, 4, 5, 10];
        rand_num2 = allowedDenominators[Math.floor(Math.random() * allowedDenominators.length)];
        // Valitaan satunnainen kerroin 1-10, jotta tulos on yhä ymmärrettävässä kokoluokassa
        const multiplier = getRandomIntNumberInRange(1, 10);
        rand_num1 = rand_num2 * multiplier;
    } while (askedQuestions.has(`${rand_num1}/${rand_num2}`)); // Varmistetaan, ettei samaa kysymystä kysytä uudestaan

    askedQuestions.add(`${rand_num1}/${rand_num2}`);
    document.querySelector('#num1').textContent = rand_num1;
    document.querySelector('#num2').textContent = rand_num2;
}


document.addEventListener("DOMContentLoaded", () => {
    randomizeNumbers();
    updateScore();

    document.querySelector('#calculate').addEventListener('click', () => {
        attempts++; // Lisätään yritys heti, jotta voidaan tarkistaa onko peli loppu

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

        updateScore(); // Päivitetään pisteet jokaisen vastauksen jälkeen

        if (attempts < maxAttempts) {
            randomizeNumbers();
        } else {
            endGame(); // Päättää pelin, jos yritykset ovat loppuneet
        }

        document.querySelector('input').value = '';
    });
});

const endGame = () => {
    // Poistetaan kuuntelija, ettei lisää vastauksia oteta vastaan
    document.querySelector('#calculate').removeEventListener('click', handleCalculateClick);

    // Piilotetaan koko laskutoimituksen sisältävä div, jotta myös / ja = merkit ja "Vastaa" painike katoavat näkyvistä
    const operationDiv = document.querySelector('form div');
    if (operationDiv) {
        operationDiv.style.display = 'none';
    }

    // Piilotetaan "Vastaa" painike erikseen, jos se on sijoitettu eri diviin kuin laskutoimitus
    const calculateButton = document.querySelector('#calculate');
    if (calculateButton) {
        calculateButton.style.display = 'none';
    }

    updateScore(); // Päivitetään pisteet viimeisen kerran

    // Lisätään "Pelaa uudelleen" ja "Siirry seuraavalle tasolle" -painikkeet, jos niitä ei ole jo
    if (!document.querySelector('#playAgainButton')) {
        const playAgainButton = document.createElement('button');
        playAgainButton.id = 'playAgainButton';
        playAgainButton.textContent = 'Pelaa uudelleen';
        playAgainButton.addEventListener('click', () => {
            window.location.reload(); // Sivun uudelleenlataus aloittaa pelin alusta
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

// Huomaa, että funktio 'handleCalculateClick' on olemassa vain, jos se on jo määritelty aiemmin.
// Jos sitä ei ole määritelty, voit jättää tämän osan pois tai korvata 'handleCalculateClick' 
// suoralla viittauksella funktion sisältöön tapahtumankäsittelijässä.


const handleCalculateClick = () => {
    // Koodi tähän
};
