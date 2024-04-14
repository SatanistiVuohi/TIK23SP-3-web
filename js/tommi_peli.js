//Kysymykset ja vastaukset, joita hallitaan indeksin avulla.
let questions = [
    {
        question: "Mikä on perusyksikkö SI-järjestelmässä?",
        options: ["Metri", "Kilogramma", "Sekunti", "Litra"],
        answer: "Metri"
    },
    {
        question: "Kuinka monta senttimetriä on yksi metri?",
        options: ["10", "100", "1000", "0.1"],
        answer: "100"
    }];
let index = 0;
let points = 0;

// Lisätään tapahtumankäsittelijä submit-tapahtumalle lomakkeessa
document.getElementById('questionform').addEventListener('submit', answer);

// Kysymyselementtiä käytetään uuden kysymyksen näyttämiseen. Asetetaan aluksi ensimmäinen.
let questionElement = document.getElementById('question');
questionElement.textContent = questions[index].question;

// Haetaan vaihtoehdot HTML:stä ja asetetaan niihin vastaukset
document.getElementById('optionA').nextElementSibling.textContent = questions[index].options[0];
document.getElementById('optionB').nextElementSibling.textContent = questions[index].options[1];
document.getElementById('optionC').nextElementSibling.textContent = questions[index].options[2];
document.getElementById('optionD').nextElementSibling.textContent = questions[index].options[3];

/**
 * Funktio form-eventin käsittelyyn
 * @param {Event} e 
 */
function answer(e){
    e.preventDefault();

    // Luodaan form data objekti form elementistä (hakee kaikki formin tiedot)
    let formdata = new FormData(e.currentTarget);

    // Tarkistetaan radiobutton valinta ja verrataan sitä oikeaan vastukseen
    // Vaihdetaan kuva riippuen vastauksen oikeellisuudesta.
    if (formdata.get('selection') === questions[index].answer) {
        points++;
        questionElement.classList.add('correct');
        document.getElementById('oikein').style.display = 'block';
        document.getElementById('vaarin').style.display = 'none';
    } else {
        questionElement.classList.add('incorrect');
        document.getElementById('oikein').style.display = 'none';
        document.getElementById('vaarin').style.display = 'block';
    }

    // Päivitetään sivulle käyttäjän pisteet
    document.getElementById('result').textContent = 
        "Sinulla on " + points + "/" + questions.length + " pistettä";

    nextQuestion();
}
console.log();

// Seuraavan kysymyksen asettaminen
function nextQuestion(){

    // Haetaan seuraavan indeksin kysymys, jos kysymykset eivät ole loppuneet.
    index++;
    if(index < questions.length){
        questionElement.textContent = questions[index].question;

        // Haetaan vaihtoehdot HTML:stä ja asetetaan niihin vastaukset
        document.getElementById('optionA').nextElementSibling.textContent = questions[index].options[0];
        document.getElementById('optionB').nextElementSibling.textContent = questions[index].options[1];
        document.getElementById('optionC').nextElementSibling.textContent = questions[index].options[2];
        document.getElementById('optionD').nextElementSibling.textContent = questions[index].options[3];
    } else {
        // Jos kaikki kysymykset on käyty läpi, voit tehdä tässä jotain, esim. näyttää lopputuloksen
    }

    // Resetoidaan muotoilut
    questionElement.classList.remove('correct', 'incorrect');
}
