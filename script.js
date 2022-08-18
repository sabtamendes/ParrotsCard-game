// let quantidadeDeCartas;
// const parrots = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']
// const duplicar = [];
// let temporizador = 0;

// // +++++++++++++++++++++++++++++++++++++++++++++++
// function perguntarCartas() {
//     quantidadeDeCartas = Number(prompt("Digite a quantidade de cartas que você quer jogar! Regra: Deverá ser somente números pares e apartir de 4 à 14 cartas!"));

//     if (quantidadeDeCartas % 2 === 1 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14 || isNaN(quantidadeDeCartas)) {
//         perguntarInfinitamente();
//     }
// }
// perguntarCartas();

// // +++++++++++++++++++++++++++++++++++++++++++++++++
// function perguntarInfinitamente() {

//     while (perguntarCartas()) {
//         quantidadeDeCartas = Number(prompt("Digite a quantidade de cartas que você quer jogar! Regra: Deverá ser somente números pares e apartir de 4 à 14 cartas!"));
//     }
// }
// //++++++++++++++++++++++++++++++++++++++++++++++++
// function embaralharCartas() {
//     return Math.random() - 0.5;
// }

// function duplicarCartas() {
//     const dobro = quantidadeDeCartas / 2;

//     for (let i = 0; i < dobro; i++) {
//         let cards = parrots[i];
//         duplicar.push(dobro);
//         duplicar.push(dobro);
//     }
//     duplicar.sort(embaralharCartas);
// }

// duplicarCartas()
// //+++++++++++++++++++++++++++++++++++++++++++++++++
// function inserirCartas() {

//     const ul = document.querySelector('.cardBoard');

//     ul.innerHTML += '';
//     for (let i = 0; i < duplicar.length; i++) {
//         ul.innerHTML += `<ul class="card" onclick="cardFlip(this)">
      
//         <li class="front">
//             <img src="./assets/back.png" alt="front">
//         </li>
//         <li class="back">
//         <img src="./assets/${duplicar[i]}.gif" alt="parrot-card">
//     </li> 
//     </ul>`

//     }
//     //setInterval(contarTempo, 1000, temporizador)
// }
// inserirCartas();


// // function virarCartas(element) {

// //     if (element.classList.contains('flip')) {
// //         console.log('clicado')
// //         element.classList.remove('flip');
// //         console.log(element)
// //     }

// // }

// function contarTempo() {
//     temporizador++
//     document.querySelector('.timer').innerHTML = temporizador;
//     clearInterval()
// }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//O usuário não vai jogar com o array de tipos de imagens e sim com as cartas duplicdas
let timer = 0;
let cliques = 0;
let contadorDeJogadas = 0;
let quantidadeDeCartas;
let tiposDeImagens = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'] //guarda as imagens que usarei para enviar a outro array que duplicará as cartas, essas são para informação, não é com elas que vou jogar
let duplicarCartas = []; //nesse array vou guardar as imagens duplicadas

function cartasInvalidas() {

    if (quantidadeDeCartas < 4 || quantidadeDeCartas > 14 || quantidadeDeCartas % 2 !== 0 || isNaN(quantidadeDeCartas)) {

        return true; //se true o valor digitado pelo usuário está fora da regra, então são realmente valores inválidos
    }
    return false;
}


function perguntarCartas() {
    quantidadeDeCartas = Number(prompt('Informe a quantidade de cartas que você quer jogar!\nRegra do Jogo: A quantidade deverá ser a partir de 4 até 14 cartas e somente números pares'));

    while (cartasInvalidas()) {
        quantidadeDeCartas = Number(prompt('Informe a quantidade de cartas que você quer jogar!\nRegra do Jogo: A quantidade deverá ser a partir de 4 até 14 cartas e somente números pares'));

    }

    duplicar(); //entra no else pq já pode dá inicio ao jogo
}
perguntarCartas();

//minhaArray.sort(comparador); // Após esta linha, a minhaArray estará embaralhada


// Esta função pode ficar separada do código acima, onde você preferir
function embaralharCartas() {
    return Math.random() - 0.5;
}

function duplicar() {
    let pares = quantidadeDeCartas / 2; //quantidade de imagens escolhidas pelo ususário e divido por 2 pra entao duplicar as cartas


    for (let i = 0; i < pares; i++) { //uso o for pq quero percorrer cada elemento do array de tiposDeImagens enquanto o i for menor que a quantidade de cartas que o usuário escolheu
        let cards = tiposDeImagens[i]; //acesso o indice para poder duplicar cada imagem
        duplicarCartas.push(cards);
        duplicarCartas.push(cards);
    }
    duplicarCartas.sort(embaralharCartas)
    renderizarCartasDuplicadas();
    setInterval(timerPlay, 1000)
}

//as cartas que renderizarei não são as mesmas que eu duplicarei
function renderizarCartasDuplicadas() {

    const ul = document.querySelector('.cardBoard');

    ul.innerHTML += '';
    for (let i = 0; i < duplicarCartas.length; i++) {
        ul.innerHTML += `<ul class="card" onclick="cardFlip(this)">
      
        <li class="front">
            <img src="./assets/back.png" alt="front">
        </li>
        <li class="back">
        <img src="./assets/${duplicarCartas[i]}.gif" alt="parrot-card">
    </li> 
    </ul>`
    }

}

let primeiraCarta;
let segundaCarta;


function cardFlip(card) {
    // quando clico na carta por duas vezes ela conta como 1a e 2a carta
    //então estou verificando se a carta contém a classe flip se tiver já quebra e não faz mais nenhuma contagem
    if (card.classList.contains("flip")) {
        return;
    }
    //evitará que ao clicar em duas cartas diferentes e logo clicar na terceira antes de esperar as duas primeiras virarem, esse if bloqueia a terceira carta de ser clicada enquanto as outras estao sendo desviradas
    if (primeiraCarta !== undefined && segundaCarta !== undefined) {
        return;
    }
    //nesse trecho 77 à 78 se a carta for undefined ou seja foi clicada, é atrbuído o card, pq é o clique
    card.classList.add("flip");
    if (primeiraCarta === undefined) {
        primeiraCarta = card;
        cliques = cliques + 1;

    } else {
        if (segundaCarta === undefined) {
            segundaCarta = card;
            //aqui devo fazer uma comparação nas cartas, se são iguais devo deixar elas viradas, ou seja não faço nada com elas, apenas coloco o valor como undefined
            if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
                //deixo elas viradas e torno elas como undefined, ou seja informo ao js que as duas estão clicadas
                resetCards();
                cliques = cliques + 1;
                contadorDeJogadas = contadorDeJogadas + 2;
                setTimeout(fimDeJogo, 1000);
                //setTimeout usado pra mostrar o alert depois da última carta e não antes
            } else {
                //desviro elas com delay
                setTimeout(cardUnflip, 1000);

            }
        }

    }

}

function resetCards() {
    primeiraCarta = undefined;
    segundaCarta = undefined;
}
function cardUnflip() {
    primeiraCarta.classList.remove("flip");
    segundaCarta.classList.remove("flip");
    resetCards();

}

function fimDeJogo() { //verificar fim
    let resetarTempo = document.querySelector(".timer");
    if (contadorDeJogadas === duplicarCartas.length) {
        alert(`Você ganhou em ${cliques} jogadas em ${timer}s!☺️`);
        console.log('fim de jogo');
        resetarTempo.classList.remove("timer");
        resetarTempo.innerHTML = "";
       // clearInterval(timerPlay); CLEAR INTERVAL NÃO FUNCIONA RESOLVI REMOVER A CLASSE E LIMPAR O INNERHTML
        setTimeout(reiniciarJogo, 1200);

    } else {
        console.log('tá no jogo');

    }
}
//bonus
function reiniciarJogo() {
    let answer = confirm("Você quer reiniciar a partida?")
    if (answer === true) {
        window.location.reload();
    }

}

function timerPlay() {
    timer++;
    document.querySelector('.timer').innerHTML = timer;
}