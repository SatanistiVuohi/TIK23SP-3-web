const correctCount_1 = sessionStorage.getItem('correctCount_1');
document.querySelector('#correctCount_1').textContent = "Yhteen- ja vähennyslaskuja 0-20 oikeat vastaukset : "+correctCount_1;

const correctCount_2 = sessionStorage.getItem('correctCount_2');
document.querySelector('#correctCount_2').textContent = "Yhteen- ja vähennyslaskuja 0-100 oikeat vastaukset : "+correctCount_2;

const points2 = sessionStorage.getItem('correctCount_3');
document.querySelector('#correctCount_3').textContent = "Kertolaskut 1-5, 10 : "+points2;

const correctCount_4 = sessionStorage.getItem('correctCount_4');
document.querySelector('#correctCount_4').textContent = "Jakolaskut 1-5, 10 : "+correctCount_4;

const points_1 = sessionStorage.getItem('correctCount_5');
document.querySelector('#correctCount_5').textContent = "Kellonajat : "+points_1;

const points_2 = sessionStorage.getItem('correctCount_6');
document.querySelector('#correctCount_6').textContent = "Mittayksiköt : "+points_2;

