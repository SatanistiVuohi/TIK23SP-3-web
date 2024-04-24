let timestable = 1
let correctAnswer
let points = 0
numbers = []

const getNumbers = () => { // Arvotaan numerot 1-10 taulukkoon satunnaisessa järjestyksessä
    while (numbers.length < 10) {
        const random_number = Math.floor(Math.random() * 10) + 1
        if (!(numbers.includes(random_number))) {
            numbers.push(random_number)
        }
    }
}

// Elementtien näkyminen ja piilottaminen lähde: https://stackoverflow.com/questions/42334747/how-can-elements-made-invisible-by-displaynone-be-made-visible-again-with-javas

const showButtons = () => { // Kertotaulun valintapainikkeiden näyttäminen
    document.querySelectorAll('.timestable-button').forEach(button => {
        button.style.display = "block"
    })
}

const hideButtons = () => { // Kertotaulun valintapainikkeiden piilottaminen
    document.querySelectorAll('.timestable-button').forEach(button => {
        button.style.display = "none"
    })
}

const showField = () => { // Vastauskentän ja tarkistuspainikkeen näyttäminen
    document.getElementById("answer").style.display = "block"
    document.getElementById("check").style.display = "block"
}

const hideField = () => { // Vastauskentän ja tarkistuspainikkeen piilottaminen
    document.getElementById("answer").style.display = "none"
    document.getElementById("check").style.display = "none"
}

const showOptions = () => { // Paluu ja uusi peli - painikkeiden näyttäminen
    document.getElementById("back").style.display = "block"
    document.getElementById("newgame").style.display = "block"
}

const getTask = () => { // Muodostetaan uusi tehtävä
    const multiplier = numbers.shift(0) // Poistetaan numbers-taulukon indeksi 0 ja asetetaan se multiplier-muutujaan lähde: https://www.w3schools.com/jsref/jsref_shift.asp
    correctAnswer = multiplier * timestable
    document.getElementById("task").innerHTML = multiplier + " x " + timestable + " = "
}

const newGame = () => { // Aloitetaan uusi peli, piilotetaan otsikkoteksti ja näytetään vastauskenntä ja tarkistuspainike
    score.innerHTML = ""
    getNumbers()
    getTask()
    hideButtons()
    showField()
}

const nextTask = () => { // Muodotetaan seuraava tehtävä kunnes on käytetty kaikki taulukkoon arvotut 10 numeroa
    if (numbers.length > 0) {
        getTask()    
    } else { // Pelin päättyminen. Näytetään pisteet, piilotetaan tehtävä, vastauskenttä ja tarkistuspainike
        const score = document.querySelector("#score")
        document.getElementById("task").innerHTML = "" 
        showOptions()
        hideField()
        sessionStorage.setItem('correctCount_3', points) // Pisteiden tallentaminen koostesivua varten
        if (points === 10) { // Pisteiden näyttäminen ja palaute pelatusta pelistä
            score.innerHTML = "Wau! Kaikki meni oikein! Keräsit " + points + " pistettä."
        } else if (points === 0) {
            score.innerHTML = "Hupista! Nyt ei onnistunut mikään. Keräsit " + points + " pistettä."
        } else {
            score.innerHTML = "Sehän meni hienosti! Keräsit " + points + " pistettä." 
        }
    }
}

document.addEventListener("DOMContentLoaded", () => { // Sivun latautuessa:
    const score = document.querySelector("#score")
    score.innerHTML = "Valitse kertotaulu:"
    showButtons()
    document.querySelectorAll('.timestable-button').forEach(button => { // Lähteet nappien läpikäymiseen: https://www.w3schools.com/jsref/prop_node_textcontent.asp, https://www.w3schools.com/jsref/met_element_queryselectorall.asp, https://www.w3schools.com/jsref/prop_element_classlist.asp ja https://chat.openai.com/
        button.addEventListener('click', () => {
            timestable = parseInt(button.textContent)
            newGame()
            choise.innerHTML = ""
        })
    })
})

document.getElementById("check").addEventListener("click", () => { // Vastauspainikkeen painaminen tarkistaa tehtävän ja antaa palautteen
    const input = parseInt(document.getElementById("answer").value)
    const result = document.getElementById("feedback")
    const img = document.getElementById("mango")
    if (input === correctAnswer) {
        points ++ // Pisteet lisääntyvät oikein vastatessa
        result.innerHTML = "Oikein!"
        img.classList.add("rotate") // Kun käyttäjä vastaa oikein, mango pyörähtää
        setTimeout(() => { // Ajastustoiminto lähde: https://www.w3schools.com/jsref/met_win_settimeout.asp
            img.classList.remove("rotate")
            nextTask() // Siirry seuraavaan tehtävään
        }, 2000) // Asetetaan animaation kesto
        
            
    } else {
        result.innerHTML = "Ei aivan! Oikea vastaus on " + correctAnswer + "."
        setTimeout(() => {
            nextTask() // Siirry seuraavaan tehtävään
        }, 2000) // Ajastetaan seuraavan tehtävän ilmestyminen
    }
    document.getElementById("answer").value = ""
    setTimeout(() => { 
        result.innerHTML = "" 
    }, 2000) // Ajastetaan palautteen näkyminen
})

document.querySelector("#newgame").addEventListener("click", () => {
    window.location.reload() // Pelaa uudelleen-napin painallus lataa sivun uudelleen.
})
