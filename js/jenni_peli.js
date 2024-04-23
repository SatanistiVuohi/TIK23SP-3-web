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

const showButtons = () => {
    document.querySelectorAll('.timestable-button').forEach(button => {
        button.style.display = "block"
    })
}

const hideButtons = () => {
    document.querySelectorAll('.timestable-button').forEach(button => {
        button.style.display = "none"
    })
}

const showField = () => {
    document.getElementById("answer").style.display = "block"
    document.getElementById("check").style.display = "block"
}

const hideField = () => {
    document.getElementById("answer").style.display = "none"
    document.getElementById("check").style.display = "none"
}

const showOptions = () => {
    document.getElementById("back").style.display = "block"
    document.getElementById("newgame").style.display = "block"
}

const getTask = () => { //Muodostetaan uusi tehtävä
    const multiplier = numbers.shift(0) //Poistetaan numbers-taulukon indeksi 0 ja asetetaan se multiplier-muutujaan
    correctAnswer = multiplier * timestable
    document.getElementById("task").innerHTML = multiplier + " x " + timestable + " = "
}

const newGame = () => { //Aloitetaan uusi peli
    score.innerHTML = ""
    getNumbers()
    getTask()
    hideButtons()
    showField()
}

const nextTask = () => { //Muodotetaan seuraava tehtävä kunnes on muodostettu 10 tehtävää valitusta kertoteulusta
    if (numbers.length > 0) {
        getTask()    
    } else {
        const score = document.querySelector("#score")
        document.getElementById("task").innerHTML = ""
        showOptions()
        hideField()
        sessionStorage.setItem('correctCount_3', points)
        if (points === 10) {
            score.innerHTML = "Wau! Kaikki meni oikein! Keräsit " + points + " pistettä."
        } else if (points === 0) {
            score.innerHTML = "Hupista! Nyt ei onnistunut mikään. Keräsit " + points + " pistettä."
        } else {
            score.innerHTML = "Sehän meni hienosti! Keräsit " + points + " pistettä." 
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const score = document.querySelector("#score")
    score.innerHTML = "Valitse kertotaulu:"
    showButtons()
    document.querySelectorAll('.timestable-button').forEach(button => {
        button.addEventListener('click', () => {
            timestable = parseInt(button.textContent)
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
            nextTask() //Siirry seuraavaan tehtävään
        }, 2000) //Asetetaan animaation kesto
        
            
    } else {
        result.innerHTML = "Ei aivan! Oikea vastaus on " + correctAnswer + "."
        setTimeout(() => {
            nextTask() //Siirry seuraavaan tehtävään
        }, 2000)
    }
    document.getElementById("answer").value = ""
    setTimeout(() => { 
        result.innerHTML = "" //Asetetaan kerto palautteen näkymiselle
    }, 2000)
})

document.querySelector("#newgame").addEventListener("click", () => {
    window.location.reload() //Pelaa uudelleen-napin painallus lataa sivun uudelleen.
})
