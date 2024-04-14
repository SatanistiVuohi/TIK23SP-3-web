//Kysymykset ja vastaukset, joita hallitaan indeksin avulla.
let questions = ['Kysymys 1', 'Kysymys 2', 'Kysymys 3', 'Kysymys 4'];
let answers = ['yes', 'no', 'yes', 'no'];
let index = 0;
let points = 0;

//Lisätään koko lomakkeeseen submit-event
document.getElementById('questionform').addEventListener('submit', answer);

//Kysymyselementtiä käytetään uuden kysymyksen näyttämiseen. Asetetaan aluksi ensimmäinen.
let questionElement = document.getElementById('question');
questionElement.textContent = questions[index];

/**
 * Funktio form-eventin käsittelyyn
 * @param {Event} e 
 */
function answer(e){
    e.preventDefault();

    //Disabloidaan hetkeksi vastausnappi, jottei sitä voida painaa ajastuksen aikana.
    document.getElementById('answer').disabled = true;
    
    //Luodaan form data objekti form elementistä (hakee kaikki formin tiedot)
    //CurrentTarget on elementti, johon eventti on kytketty (questionform)
    let formdata = new FormData(e.currentTarget);

    //Tarkistetaan radiobutton valinta ja verrataan sitä oikeaan vastukseen
    //Vaihdetaan väriä CSS:n luokan avulla riippuen vastauksen oikeellisuudesta.
    if( formdata.get('selection') ==  answers[index] ){
        points++;
        questionElement.classList.add('correct');
    }else{
        questionElement.classList.add('incorrect');
    }

    //Päivitetään sivulle käyttäjän pisteet
    document.getElementById('result').textContent = 
        "Sinulla on  " + points + "/" + (answers.length) + " pistettä";

    //Aloitetaan 3 sekunnin ajastin, jonka jälkeen asetetaan seuraava kysymys
    setTimeout(nextQuestion, 3000);

}

/**
 * Seuraavan kysymyksen asettaminen
 */
function nextQuestion(){

    //Haetaan seuraavan indeksin kysymys, jos kysymykset eivät ole loppuneet.
    index++;
    if(index <= questions.length-1){
        questionElement.textContent = questions[index];
    }

    //Resetoidaan muotoilut ja asetetaan nappi takaisin painettavaksi.
    questionElement.classList.remove('correct', 'incorrect');
    document.getElementById('answer').disabled = false;
}