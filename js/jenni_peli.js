let timestable = 1
let correctAnswer
let points = 0
numbers = []

const getNumbers = () => { //Arvotaan numerot 1-10 taulukkoon satunnaisessa järjestyksessä
    while (numbers.length < 10) {
        const random_number = Math.floor(Math.random() * 10) + 1
        if (!(numbers.includes(random_number))) {
            numbers.push(random_number)
        }
    }
}

const getTask = () => { //Muodostetaan uusi tehtävä
    const multiplier = numbers.shift(0) //Poistetaan numbers-taulukon indeksi 0 ja asetetaan se multiplier-muutujaan
    correctAnswer = multiplier * timestable
    document.getElementById("task").innerHTML = multiplier + " x " + timestable + " = "
}

const newGame = () => { //Aloitetaan uusi peli
    getNumbers()
    getTask()
    document.getElementById("b1").style.display = "none"
    document.getElementById("b2").style.display = "none"
    document.getElementById("b3").style.display = "none"
    document.getElementById("b4").style.display = "none"
    document.getElementById("b5").style.display = "none"
    document.getElementById("b10").style.display = "none"
    document.getElementById("answer").style.display = "block"
    document.getElementById("check").style.display = "block"
}

const nextTask = () => { //Muodotetaan seuraava tehtävä kunnes on muodostettu 10 tehtävää valitusta kertoteulusta
    if (numbers.length > 0) {
        getTask()    
    } else {
        const score = document.querySelector("#score")
        score.innerHTML = "Peli loppui! Keräsit " + points + " pistettä."
        document.getElementById("task").innerHTML = ""
        document.getElementById("back").style.display = "block"
        document.getElementById("newgame").style.display = "block"
        document.getElementById("answer").style.display = "none"
        document.getElementById("check").style.display = "none"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const choise = document.querySelector("#choise")
    choise.innerHTML = "Valitse kertotaulu:"
    document.getElementById("b1").style.display = "block"
    document.getElementById("b2").style.display = "block"
    document.getElementById("b3").style.display = "block"
    document.getElementById("b4").style.display = "block"
    document.getElementById("b5").style.display = "block"
    document.getElementById("b10").style.display = "block"
    document.querySelectorAll('.timestable-button').forEach(button => {
        button.addEventListener('click', () => {
            timestable = parseInt(button.textContent)
            numberOfTask = 0 //Nollataan tehtälaskuri uuden kertotaulun valinnan yhteydessä
            newGame()
            choise.innerHTML = ""
        })
    })
})

document.getElementById("check").addEventListener("click", () => {
    const input = parseInt(document.getElementById("answer").value)
    const result = document.getElementById("feedback")
    const img = document.getElementById("mango")
    if (input === correctAnswer) {
        points ++
        result.innerHTML = "Oikein!"
        img.classList.add("rotate")
        setTimeout(() => { 
            img.classList.remove("rotate")
        }, 2000) //Asetetaan animaation kesto
        nextTask() //Siirry seuraavaan tehtävään
            
    } else {
        result.innerHTML = "Ei aivan! Oikea vastaus on " + correctAnswer + "."
        nextTask() //Siirry seuraavaan tehtävään
    }
    document.getElementById("answer").value = ""
    setTimeout(() => { 
        result.innerHTML = "" //Asetetaan kerto palautteen näkymiselle
    }, 1500)
})

document.querySelector("#newgame").addEventListener("click", () => {
    window.location.reload() //Pelaa uudelleen-napin painallus lataa sivun uudelleen.
})
