let rand_num1 = 0; //Ensimmäinen satunnaisluku
let rand_num2 = 0; //Toinen satunnaisluku
let correctCount = 0; //Laskuri oikeille vastauksille
let incorrectCount = 0; //Laskuri väärille vastauksille
let isPositive = false; //Onko lasku positiivinen vai negatiivinen, boolean operator

// Funktio satunnaisen kokonaisluvun generoimiseksi annetulta väliltä
const getRandomIntNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Funktio kierroksen aloittamiseksi
const startRound = () => {   
    rand_num1 = getRandomIntNumberInRange(0, 100); // Generoidaan ensimmäinen satunnaisluku
    isPositive = Math.random() < 0.5; // Arvotaan, onko lasku positiivinen vai negatiivinen
    let range;
    if (isPositive) { 
        range = 100-rand_num1; // Lasketaan toisen luvun mahdollinen maksimiarvo, jos lasku on positiivinen
    } else {
        range = rand_num1; // Lasketaan toisen luvun mahdollinen maksimiarvo, jos lasku on negatiivinen
    }
    rand_num2 = getRandomIntNumberInRange(0, range); // Generoidaan toinen satunnaisluku
    // Päivitetään näytettävät luvut ja laskutoimitus HTML-elementteihin
    document.querySelector("#num1").textContent = rand_num1;
    document.querySelector("#num2").textContent = rand_num2;
    const operation = isPositive ? '+' : '-'; // Määritetään laskutoimituksen merkki
    document.querySelector("#operator").textContent = operation;
    
};

//Kierros alkaa heti kun sivu on latautunut
addEventListener("DOMContentLoaded", () => {
    startRound();
});

// Tapahtumankäsittelijä napin klikkaukselle
document.querySelector('#calculate').addEventListener('click', () => {
    getEventListener();
});


// Tapahtumankäsittelijä Enter-näppäimelle
document.querySelector('input').addEventListener("keypress", (event) => {
    // Jos käyttäjä painaa Enter-näppäintä
    if (event.key === "Enter") {
        getEventListener();
    }
  });

// Funktio vastaustapahtumien käsittelyä varten
function getEventListener() {
    const answer = Number(document.querySelector('input').value); //Luetaan käyttäjän syöttämä arvo muuttujaan
    let correctAnswer = getCorrectAnswer(); // Haetaan oikea vastaus
    checkAnswer(answer, correctAnswer); // Tarkistetaan vastaus

    document.querySelector('input').value = '0'; // Tyhjennetään syötekenttä
    // Jos kierroksia ei ole vielä pelattu tarpeeksi
    if (correctCount + incorrectCount < 10) { 
        startRound(); // Aloita uusi kierros
    } else {
        sessionStorage.setItem('correctCount_2', correctCount);
        showOptions(); //Näytä 'options' pelin päätyttyä
    }
}

// Funktio oikean vastauksen hakuun
function getCorrectAnswer() {
    let correctAnswer;

    // Määritetään oikea vastaus riippuen siitä, onko lasku positiivinen vai negatiivinen
    if (isPositive) {
        correctAnswer = rand_num1 + rand_num2;
    } else {
        correctAnswer = rand_num1 - rand_num2;
    }

    return correctAnswer;
}

// Funktio 'options' näyttämiseen pelin päätyttyä
function showOptions() {
    var game = document.getElementById("game");
    game.style.display = "none"; // Piilotetaan peli
    var options = document.getElementById("options");
    options.style.display = ''; // Näytetään vaihtoehdot
    document.querySelector('#pisteet').textContent = `Sait ${correctCount} pistettä!` // Näytetään pisteet
}

// Funktio vastauksen tarkistamiseen
function checkAnswer(answer, correctAnswer) {
    // Jos vastaus on oikein
    if (answer === correctAnswer) {
        document.querySelector('#result').textContent = 'Vastauksesi oli oikein!'; // Näytetään viesti
        correctCount++; // Kasvatetaan oikeiden vastausten laskuria
    } else { // Jos vastaus on väärin
        document.querySelector('#result').textContent = `Vastauksesi oli väärin, oikea vastaus on ${correctAnswer}!`; // Näytetään viesti
        incorrectCount++; // Kasvatetaan väärin vastattujen laskuria
    }
}

