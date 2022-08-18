let quantidadeDeCartas;

let temporizador = 0;

let cliques = 0;

let contadorDeJogadas = 0;

let tiposDeImagens = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

let duplicarCartas = []; //nesse array vou guardar as imagens duplicadas e jogar com essas imagens


function cartasInvalidas() {

    if (quantidadeDeCartas < 4 || quantidadeDeCartas > 14 || quantidadeDeCartas % 2 !== 0 || isNaN(quantidadeDeCartas)) {
        return true;
    }
    return false;
}


function perguntarCartas() {

    quantidadeDeCartas = Number(prompt('Informe a quantidade de cartas que você quer jogar!\nRegra do Jogo: A quantidade deverá ser a partir de 4 até 14 cartas e somente números pares'));

    while (cartasInvalidas()) {
        quantidadeDeCartas = Number(prompt('Informe a quantidade de cartas que você quer jogar!\nRegra do Jogo: A quantidade deverá ser a partir de 4 até 14 cartas e somente números pares'));
    }
    duplicar();
}
perguntarCartas();


function embaralharCartas() {
    return Math.random() - 0.5;
}

function duplicar() {
    let pares = quantidadeDeCartas / 2;


    for (let i = 0; i < pares; i++) {
        let cards = tiposDeImagens[i];
        duplicarCartas.push(cards);
        duplicarCartas.push(cards);
    }
    duplicarCartas.sort(embaralharCartas);

    renderizarCartasDuplicadas();

    setInterval(contarTempo, 1000)
}

//as cartas que renderizarei não são as mesmas que eu dupliquei
function renderizarCartasDuplicadas() {

    const ul = document.querySelector('.cardBoard');

    ul.innerHTML += '';
    for (let i = 0; i < duplicarCartas.length; i++) {

        ul.innerHTML += `<ul class="card" onclick="virarCarta(this)">
        <li class="front">
            <img src="./assets/back.png" alt="front">
        </li>
        <li class="back">
        <img src="./assets/${duplicarCartas[i]}.gif" alt="parrot-card">
    </li> 
    </ul>`
    }
}


let primeiraCarta = null;
let segundaCarta = null;

function virarCarta(cartaClicada) {
    // quando clico na carta por duas vezes ela conta como 1a e 2a carta
    //então estou verificando se a carta contém a classe flip se tiver já quebra e não faz mais nenhuma contagem
    if (cartaClicada.classList.contains("flip")) {
        return;
    }
    //evitará que ao clicar em duas cartas diferentes e logo clicar na terceira antes de esperar as duas primeiras virarem, esse if bloqueia a terceira carta de ser clicada enquanto as outras estao sendo desviradas
    if (primeiraCarta !== null && segundaCarta !== null) {
        return;
    }
    //nesse trecho se a carta for null ou seja ainda não foi clicada e ao clicar recebe o innerhtml de carta clicada, é atrbuído o card, pq é o clique
    cartaClicada.classList.add("flip");
    if (primeiraCarta === null) {
        primeiraCarta = cartaClicada;
        cliques = cliques + 1;

    } else {
            if (segundaCarta === null) {
                segundaCarta = cartaClicada;
                //aqui devo fazer uma comparação nas cartas, se são iguais devo deixar elas viradas, ou seja não faço nada com elas, apenas coloco o valor como undefined
            if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
                //deixo elas viradas e torno elas como undefined, ou seja informo ao js que as duas estão clicadas
                resetarCartas();
                cliques = cliques + 1;
                contadorDeJogadas = contadorDeJogadas + 2;
                setTimeout(finalizarJogo, 1000);
                //setTimeout usado pra mostrar o alert depois da última carta e não antes
            } else {
                //desviro elas com delay
                setTimeout(desvirarCarta, 1000);

            }
        }

    }

}


function resetarCartas() {
    primeiraCarta = null;
    segundaCarta = null;
}

function desvirarCarta() {
    primeiraCarta.classList.remove("flip");
    segundaCarta.classList.remove("flip");
    resetarCartas();
}

function finalizarJogo() {
    let resetarTempo = document.querySelector(".timer");
    if (contadorDeJogadas === duplicarCartas.length) {

        alert(`Você ganhou em ${cliques} jogadas e em ${temporizador}s! ☺️`);

        resetarTempo.classList.remove("timer");

        resetarTempo.innerHTML = "";

        setTimeout(reiniciarJogo, 1200);
    } 
}

function reiniciarJogo() {

    let answer = confirm("Você quer reiniciar a partida?");

    if (answer === true) {
        window.location.reload();
    }
}

function contarTempo() {
    temporizador++;

    document.querySelector('.timer').innerHTML = `${temporizador} s`;
}