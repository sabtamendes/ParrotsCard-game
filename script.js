let quantidadeDeCartas;
const parrots = ['bobross', 'explody', 'fiesta', 'metal', 'revertit', 'triplets', 'unicorn']
const duplicar = [];


// +++++++++++++++++++++++++++++++++++++++++++++++
function perguntarCartas() {
    quantidadeDeCartas = Number(prompt("Digite a quantidade de cartas que você quer jogar! Regra: Deverá ser somente números pares e apartir de 4 à 14 cartas!"));
    // console.log(cartas)

    if (quantidadeDeCartas % 2 === 1 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14 || isNaN(quantidadeDeCartas)) {
        perguntarInfinitamente();
    }
}
perguntarCartas();

// +++++++++++++++++++++++++++++++++++++++++++++++++
function perguntarInfinitamente() {

    while (perguntarCartas()) {
        quantidadeDeCartas = Number(prompt("Digite a quantidade de cartas que você quer jogar! Regra: Deverá ser somente números pares e apartir de 4 à 14 cartas!"));
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++
function embaralharCartas() { 
	return Math.random() - 0.5; 
}

function duplicarCartas(){
    const dobro = quantidadeDeCartas / 2;

    for(let i = 0; i < dobro; i++){
        let cards = parrots[i];
        duplicar.push(dobro);
        duplicar.push(dobro);

    console.log(duplicar)
    }
    duplicar.sort(embaralharCartas);
}

duplicarCartas()
//+++++++++++++++++++++++++++++++++++++++++++++++++
function inserirCartas() {

    const ul = document.querySelector('.cardBoard');

    ul.innerHTML += '';
    for (let i = 0; i < duplicar.length; i++) {
        ul.innerHTML += `<ul class="card">
        <li class="front">
            <img src="./assets/${duplicar[i]}parrot.gif" alt="parrot-card">
        </li> 
        <li class="back">
            <img src="./assets/back.png" alt="front">
        </li>
    </ul>`

    }

}
inserirCartas();


