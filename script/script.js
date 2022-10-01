// Variáveis globais úteis
const opacityBoard = document.querySelector("main");
const startGameDiv = document.querySelector(".btn-div");
const startGame = document.querySelector(".startGame");
const restartDiv = document.querySelector(".tryAgain");
const restart = document.querySelector(".tryAgain button");
const boardRegions = document.querySelectorAll(".cell");
const p1Span = document.querySelector(".p1");
const p2Span = document.querySelector(".p2");
let vBoard = [];
let turnPlayer = "";
let askName = true;

function initializeGame() {
	// Desaparece com o botao start, e aparece com o botao de tentar novamente
	startGameDiv.style.display = "none";
	restartDiv.style.display = "flex";
	opacityBoard.style.opacity = "1";

	//Pergunta o nome caso seja a primeira vez que entra no site
	if (askName == true) {
		playerOne = prompt("Informe o nome do jogador(a) 1:");
		playerTwo = prompt("Informe o nome do jogador(a) 2:");
		p1Span.textContent = `Jogador(a) 1: ${playerOne}`;
		p2Span.textContent = `Jogador(a) 2: ${playerTwo}`;
		askName = false;
	}

	vBoard = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	turnPlayer = "player1";

	// Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
	boardRegions.forEach(function (element) {
		element.classList.remove("win");
		element.innerText = "";
		element.classList.add("cursor-pointer");
		element.addEventListener("click", handleBoardClick);
	});
}
// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
	const winRegions = [];
	if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]) winRegions.push("0.0", "0.1", "0.2");
	if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2]) winRegions.push("1.0", "1.1", "1.2");
	if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2]) winRegions.push("2.0", "2.1", "2.2");
	if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0]) winRegions.push("0.0", "1.0", "2.0");
	if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1]) winRegions.push("0.1", "1.1", "2.1");
	if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2]) winRegions.push("0.2", "1.2", "2.2");
	if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2]) winRegions.push("0.0", "1.1", "2.2");
	if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0]) winRegions.push("0.2", "1.1", "2.0");
	return winRegions;
}
// Desabilita uma região do tabuleiro para que não seja mais clicável
function disableRegion(element) {
	element.classList.remove("cursor-pointer");
	element.removeEventListener("click", handleBoardClick);
}
// Pinta as regiões onde o jogador venceu e mostra seu nome na tela
function handleWin(regions) {
	regions.forEach(function (region) {
		document.querySelector('[data-position="' + region + '"]').classList.add("win");
	});

	boardRegions.forEach((item) => {
		disableRegion(item);
	});

	if (turnPlayer == "player1") {
		setTimeout(() => {
			alert(`${playerOne} ganhou!`);
		}, 200);
	} else {
		setTimeout(() => {
			alert(`${playerTwo} ganhou!`);
		}, 200);
	}
}

function handleBoardClick(ev) {
	// Obtém os índices da região clicada
	const div = ev.currentTarget;
	const region = div.dataset.position; // N.N
	const rowColumnPair = region.split("."); // ["N", "N"]
	const row = rowColumnPair[0];
	const column = rowColumnPair[1];
	// Marca a região clicada com o símbolo do jogador
	if (turnPlayer === "player1") {
		div.innerText = "X";
		vBoard[row][column] = "X";
		p1Span.removeAttribute("id");
		p2Span.setAttribute("id", "turnPlayer");
	} else {
		div.innerText = "O";
		vBoard[row][column] = "O";
		p2Span.removeAttribute("id");
		p1Span.setAttribute("id", "turnPlayer");
	}
	// Limpa o console e exibe nosso tabuleiro virtual
	console.clear();
	console.table(vBoard);
	// Desabilita a região clicada
	disableRegion(div);
	// Verifica se alguém venceu
	const winRegions = getWinRegions();
	if (winRegions.length > 0) {
		handleWin(winRegions);
	} else if (vBoard.flat().includes("")) {
		turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
	} else {
		document.querySelector("h2").innerHTML = "Empate!";
	}
}
// Adiciona o evento no botão que inicia o jogo
startGame.addEventListener("click", initializeGame);
restart.addEventListener("click", initializeGame);
