// Kysymykset ja vastaukset, joita hallitaan indeksin avulla.
let questions = [
    {
        question: "Kuinka monta metriä on 50 senttimetriä?",
        options: ["500", "5000", "50", "0.5"],
        answer: "0.5"
    },
    {
        question: "Kuinka monta senttimetriä on 3 metriä?",
        options: ["30", "300", "3", "3000"],
        answer: "300"
    },
    {
        question: "Kuinka monta millimetriä on 7 metriä?",
        options: ["700", "0,7", "7000", "70"],
        answer: "7000"
    },
    {
        question: "Kuinka monta senttimetriä on 800 millimetriä?",
        options: ["8", "80", "800", "8000"],
        answer: "80"
    },
    {
        question: "Kuinka monta metriä on 5000 millimetriä?",
        options: ["50", "5", "500", "0.5"],
        answer: "5"
    },
    {
        question: "Kuinka monta millimetriä on 2 senttimetriä?",
        options: ["0.2", "2", "20", "200"],
        answer: "20"
    },
    {
        question: "Kuinka monta senttimetriä on 2 metriä?",
        options: ["20", "200", "2", "0.2"],
        answer: "200"
    },
    {
        question: "Kuinka monta metriä on 1000 millimetriä?",
        options: ["1", "10", "100", "1000"],
        answer: "1"
    },
    {
        question: "Kuinka monta millimetriä on 5 senttimetriä?",
        options: ["0.5", "5", "50", "500"],
        answer: "50"
    },
    {
        question: "Kuinka monta senttimetriä on 1 metri?",
        options: ["10", "100", "1", "0.1"],
        answer: "100"

    }
];

let index = 0;
let points_2 = 0;

// Lisätään tapahtumankäsittelijä submit-tapahtumalle lomakkeessa
document.getElementById('questionform').addEventListener('submit', answer);

// Kysymyselementtiä käytetään uuden kysymyksen näyttämiseen. Asetetaan aluksi ensimmäinen.
let questionElement = document.getElementById('question');
questionElement.textContent = questions[index].question;

// Luodaan vaihtoehdot input- ja label-elementeille jokaiselle vaihtoehdolle
let optionsContainer = document.getElementById('options-container');
questions[index].options.forEach((option, i) => {
    createOptionElement(option, i);
});

/**
 * Funktio luo input- ja label-elementit jokaiselle vaihtoehdolle
 * @param {string} option Vaihtoehdon sisältö
 * @param {number} index Vaihtoehdon indeksi
 */
function createOptionElement(option, index) {
    // Luodaan input-elementti
    let input = document.createElement('input');
    input.type = 'radio';
    input.classList.add('btn-check');
    input.name = 'selection';
    input.id = `option${String.fromCharCode(65 + index)}`;
    input.value = option;
    input.autocomplete = 'off';

    // Luodaan label-elementti
    let label = document.createElement('label');
    label.classList.add('btn');
    label.htmlFor = `option${String.fromCharCode(65 + index)}`;
    label.textContent = option;

    // Lisätään input- ja label-elementit vaihtoehtokontaineriin
    optionsContainer.appendChild(input);
    optionsContainer.appendChild(label);
}

/**
 * Funktio form-eventin käsittelyyn
 * @param {Event} e 
 */
function answer(e) {
    e.preventDefault();

   // document.getElementById('answer').disabled = true;

    let formdata = new FormData(e.currentTarget);

    // Tarkistetaan valinta ja verrataan sitä oikeaan vastukseen
    // Vaihdetaan kuva ja teksti riippuen meinikö vastaus väärin vai oikein
    if (formdata.get('selection') === questions[index].answer) {
        points_2++;
        questionElement.classList.add('correct');
        document.getElementById('oikein').style.display = 'block';
        document.getElementById('vaarin').style.display = 'none';
        document.getElementById('oikeinvaarin').innerHTML = 'Oikein! :)';
        sessionStorage.setItem('correctCount_6', points_2);
    } else {
        questionElement.classList.add('incorrect');
        document.getElementById('oikein').style.display = 'none';
        document.getElementById('vaarin').style.display = 'block';
        document.getElementById('oikeinvaarin').innerHTML = 'Äh, väärin meni! :( Oikea vastaus oli: ' + questions[index].answer;
    }
    setTimeout(nextQuestion, 3500);

}




// Seuraavan kysymyksen asettaminen
function nextQuestion() {

    // Haetaan seuraavan indeksin kysymys, jos kysymykset eivät ole loppuneet.
    index++;
    if (index < questions.length) {
        questionElement.textContent = questions[index].question;

        // Tyhjennetään vaihtoehtokontaineri
        optionsContainer.innerHTML = '';

        // Luodaan vaihtoehdot input- ja label-elementeille jokaiselle vaihtoehdolle
        questions[index].options.forEach((option, i) => {
            createOptionElement(option, i);
        });
    } else {
        document.getElementById('questionform').style.display = 'none';
        document.getElementById('playAgain').style.display = 'block';
        document.getElementById('return').style.display = 'block';
        document.getElementById('otsikko').style.display = 'Pääsit loppuun!';
        document.getElementById('result').textContent = 'Pisteesi: ' + points_2 + '/' + questions.length;
    }

    // Resetoidaan muotoilut
    questionElement.classList.remove('correct', 'incorrect');
    document.getElementById('answer').disabled = false;
    document.getElementById('oikeinvaarin').innerHTML = '';
}


function resetGame() {
    window.location.reload();
}
function returnPelit() {
    window.location.href = './pelit.html';
}