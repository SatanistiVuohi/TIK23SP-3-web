const path = "./images/img_ivanin_peli/"
const questions = [
    {
        image: "12_00.png",
        options: ["12:00", "12:45", "12:30", "12:20"],
        correctAnswer: 1
    },
    {
        image: "12_10.png",
        options: ["12:00", "12:15", "12:30", "12:10"],
        correctAnswer: 4
    },
    {
        image: "12_25.png",
        options: ["12:20", "12:25", "12:15", "12:40"],
        correctAnswer: 2
    },
    {
        image: "12_05.png",
        options: ["12:45", "12:05", "12:15", "12:25"],
        correctAnswer: 2
    },   
    {
        image: "12_20.png",
        options: ["12:30", "12:10", "12:20", "12:40"],
        correctAnswer: 3
    },
    {
        image: "12_15.png",
        options: ["12:45", "12:15", "12:35", "12:25"],
        correctAnswer: 2
    },    
    {
        image: "12_35.png",
        options: ["12:35", "12:45", "12:25", "12:55"],
        correctAnswer: 1
    },
    {
        image: "12_30.png",
        options: ["12:10", "12:15", "12:45", "12:30"],
        correctAnswer: 4
    },  
    {
        image: "12_40.png",
        options: ["12:50", "12:40", "12:30", "12:20"],
        correctAnswer: 2
    },
    {
        image: "12_50.png",
        options: ["12:20", "12:50", "12:30", "12:10"],
        correctAnswer: 2
    }
];


let currentQuestionIndex = 0;
let points = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-image").src = path + currentQuestion.image;
    document.getElementById("result").innerText = "";
    for (let i = 0; i < currentQuestion.options.length; i++) {
        document.getElementsByClassName("btn")[i].innerText = currentQuestion.options[i];
    }
}
loadQuestion();

function checkAnswer(optionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedButton = document.getElementsByClassName("btn")[optionIndex];
    if (optionIndex === currentQuestion.correctAnswer - 1) {
        document.getElementById("result").innerText = "Oikein!";
        points++;
    } else {
        document.getElementById("result").innerText = "Väärin.";
    }
    selectedButton.classList.add('selected'); // Add the 'selected' class to the selected button
    setTimeout(() => {
        selectedButton.classList.remove('selected'); // Remove the 'selected' class after 2 seconds
        loadNextQuestion();
    }, 2000);

}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("result").innerText = "Olet suorittanut pelin. Pisteesi: " + points;
        document.getElementById("playAgainButton").style.display = "block";
    }
}

function resetGame() {
    window.location.reload(); 
}

function navigateToPage() {
    window.location.href = "http://127.0.0.1:5500/pelit.html"; 
}

window.onload = loadQuestion;