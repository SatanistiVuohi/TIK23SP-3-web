let currentProgress1 = 0;
let currentProgress2 = 0;
let currentProgress3 = 0;
let currentProgress4 = 0;
let currentProgress5 = 0;
let currentProgress6 = 0;

const correctCount_1 = parseInt(sessionStorage.getItem('correctCount_1')) || 0;
document.querySelector('#correctCount_1').textContent = "" + correctCount_1;
updateProgressBar1();

const correctCount_2 = parseInt(sessionStorage.getItem('correctCount_2')) || 0;
document.querySelector('#correctCount_2').textContent = "" + correctCount_2;
updateProgressBar2();

const points2 = parseInt(sessionStorage.getItem('correctCount_3')) || 0;
document.querySelector('#correctCount_3').textContent = "" + points2;
updateProgressBar3();

const correctCount_4 = parseInt(sessionStorage.getItem('correctCount_4')) || 0;
document.querySelector('#correctCount_4').textContent = "" + correctCount_4;
updateProgressBar4();

const points_1 = parseInt(sessionStorage.getItem('correctCount_5')) || 0;
document.querySelector('#correctCount_5').textContent = "" + points_1;
updateProgressBar5();

const points_2 = parseInt(sessionStorage.getItem('correctCount_6')) || 0;
document.querySelector('#correctCount_6').textContent = "" + points_2;
updateProgressBar6();

const totalScore = correctCount_1 + correctCount_2 + points2 + correctCount_4 + points_1 + points_2;
document.querySelector('#total').innerHTML = "Yhteispisteesi: " + totalScore;

function updateProgressBar1() {
    currentProgress1 = correctCount_1 * 10;
    document.getElementById("progress-bar1").style.width = currentProgress1 + "%";
    document.getElementById("progress-bar1").innerHTML = currentProgress1 + "%";
}
function updateProgressBar2() {
    currentProgress2 = correctCount_2 * 10;
    document.getElementById("progress-bar2").style.width = currentProgress2 + "%";
    document.getElementById("progress-bar2").innerHTML = currentProgress2 + "%";
}
function updateProgressBar3() {
    currentProgress3 = points2 * 10;
    document.getElementById("progress-bar3").style.width = currentProgress3 + "%";
    document.getElementById("progress-bar3").innerHTML = currentProgress3 + "%";
}
function updateProgressBar4() {
    currentProgress4 = correctCount_4 * 10;
    document.getElementById("progress-bar4").style.width = currentProgress4 + "%";
    document.getElementById("progress-bar4").innerHTML = currentProgress4 + "%";
}
function updateProgressBar5() {
    currentProgress5 = points_1 * 10;
    document.getElementById("progress-bar5").style.width = currentProgress5 + "%";
    document.getElementById("progress-bar5").innerHTML = currentProgress5 + "%";
}
function updateProgressBar6() {
    currentProgress6 = points_2 * 10;
    document.getElementById("progress-bar6").style.width = currentProgress6 + "%";
    document.getElementById("progress-bar6").innerHTML = currentProgress6 + "%";
}

var resultsElement = document.getElementById("results");
var resultTextElement = document.createElement("p");
resultsElement.appendChild(resultTextElement);

// Pistetaulukon palautteet
if (totalScore >= 46 && totalScore <= 60) {
    resultTextElement.classList.add("range-46-60"); 
    resultTextElement.textContent = "Erinomaista! Sehän meni ihan nappiin!";
} else if (totalScore >= 30 && totalScore <= 45) {
    resultTextElement.classList.add("range-30-45"); 
    resultTextElement.textContent = "Hienoa! Hyvin menee!";
} else if (totalScore >= 15 && totalScore <= 29) {
    resultTextElement.classList.add("range-15-29"); 
    resultTextElement.textContent = "Hyvä yritys! Harjoittele vielä!" ;
} else if (totalScore >= 1 && totalScore <= 14) {
    resultTextElement.classList.add("range-1-14"); 
    resultTextElement.textContent = "Yritä uudelleen! Harjoitus tekee mestarin!";
}