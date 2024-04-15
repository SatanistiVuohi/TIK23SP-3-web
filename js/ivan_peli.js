const questions = [
    {
        image: "image1.jpg",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: 1
    },
    {
        image: "image2.jpg",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        correctAnswer: 4
    },
    {
        image: "image1.jpg",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: 2
    },
    {
        image: "image2.jpg",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        correctAnswer: 3
    },   
    {
        image: "image1.jpg",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: 4
    },
    {
        image: "image2.jpg",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        correctAnswer: 3
    },    
    {
        image: "image1.jpg",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: 2
    },
    {
        image: "image2.jpg",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        correctAnswer: 4
    },  
    {
        image: "image1.jpg",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: 2
    },
    {
        image: "image2.jpg",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        correctAnswer: 1
    }
];


let currentQuestionIndex = 0;
let points = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-image").src = currentQuestion.image;
    document.getElementById("result").innerText = "";
    for (let i = 0; i < currentQuestion.options.length; i++) {
        document.getElementsByClassName("btn")[i].innerText = currentQuestion.options[i];
    }
}

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