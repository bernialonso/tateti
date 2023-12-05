document.addEventListener('DOMContentLoaded', function () {
    const infoButton = document.getElementById('infoButton');
    const dropdown = document.querySelector('.dropdown');
  
    infoButton.addEventListener('click', function () {
      dropdown.classList.toggle('clicked');
    });
  
    infoButton.addEventListener('mouseover', function () {
      dropdown.classList.add('clicked');
    });
  
    infoButton.addEventListener('mouseout', function () {
      dropdown.classList.remove('clicked');
    });
  });

//constantes con los dos iconos de jugadores
const playerOne = 'O';
const playerTwo = 'X';

let scoreO = 0;
let scoreX = 0;

//Jugador inicial
let currentPlayer = 'O';

//funcion que genera un div con la clase que recibe por parametro ()
function createDiv(className) {
    let div = document.createElement('div');
    div.className = className;
    return div;
}

//funcion para generar el tablero
function createBoard() {
    let rows = document.querySelector(".row-container");
    if (rows != null) return;

    //creamos 3 filas
    for (let row = 0; row < 3; row++) {
        const div = createDiv(`row-container`);
        //añadir fila al tablero
        document.querySelector('.board-container').appendChild(div); //queryselector para class, id, etc del doc. appendchild le agrega un hijo html element xd
        //por cada fila ejecutamos 3 veces:
        for (let col = 0; col < 3; col++) {
            //creamos una celda
            const cell = createDiv(`cell-container row-${row} col-${col}`); //entre cmillas inclinadas, signo pesos y llaves, interpreta contenido de js
            //asignamos el numero a la celda
            cell.textContent = 1 + 3 * row + col;
            //le indicamos que funcion ejecutar cuando es clickeado, usamos arrow function
            //para que se llame cada vez que hacemos click, y no solo al cargar la pagina
            cell.addEventListener("click", () => move(cell), false); // los eventos se aplican a los elementos del html. la arrow  function (las flechitas esas) sirve para q se ejecute, sino estan no se ejecuta.
            //añadimos la celda a la fila
            div.appendChild(cell);
        }
    }

    //reemplazamos que hace el boton
    var button = document.querySelector(".play-button");
    button.onclick = () => resetBoard();
    button.textContent = "Reiniciar"
}

function resetBoard() {
    //recorre todas las celdas y les resetea el valor interno y el color de fondo
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            let cell = document.querySelector(`.cell-container.row-${i}.col-${j}`);
            cell.textContent = 1 + 3 * i + j;
            refreshColor(cell)
        }
    }

    //resetea el jugador inicial
    currentPlayer = playerOne;
    setTurn();
}

function move(cell) {
    //verifica si es valido el movimiento, si no lo es alerta
    if (!isMoveValid(cell.textContent)) {
        alert("Posicion Invalida! \nElija otra posicion.");
        return;
    }

    //actualiza el valor de la celda
    cell.textContent = currentPlayer;

    //cambia el color de la celda
    refreshColor(cell);

    //revisa si hay ganador, y avisa o cambia de turno
    if (isPlayerWinner()) {
        alert("¡Felicitaciones!");
        updateScore(currentPlayer);
        resetBoard();
    }
    else
        changePlayer();
}

//revisa si el valor de la celda es distinta a las dos opciones posibles
function isMoveValid(currentCellValue) {
    return currentCellValue != playerOne && currentCellValue != playerTwo
}

//alterna entre jugadores
function changePlayer() {
    currentPlayer =
        currentPlayer == playerOne ?
            playerTwo :
            playerOne;

    setTurn();
}

//refresca el valor del display de turno
function setTurn() {
    const p = document.querySelector(".turn-container p");
    p.textContent = currentPlayer;
    
    if (currentPlayer == playerOne)
        p.style.color = "gray"
    else
        p.style.color = "#4267B2"
}

//revisa si el jugador actual gano
function isPlayerWinner() {
    let board = [[], [], []];
    let winner = currentPlayer;

    //aca genera el tablero que usabamos antes pero a partir de los valores actuales en el html
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            board[i][j] = document.querySelector(`.cell-container.row-${i}.col-${j}`).textContent
        }
    }

    //la logica de siempre
    for (let i = 0; i <= 2; i++) {
        if ((board[i][0] == winner && board[i][1] == winner && board[i][2] == winner) ||
            (board[0][i] == winner && board[1][i] == winner && board[2][i] == winner))
            return true
    }

    if ((board[0][0] == winner && board[1][1] == winner && board[2][2] == winner) ||
        (board[0][2] == winner && board[1][1] == winner && board[2][0] == winner))
        return true
    return false
}

function refreshColor(cell) {
    //valor por defecto/al reiniciar
    let color = "#9966CC";

    //revisa el valor de la celda para cambiar el color
    switch (cell.textContent) {
        case playerOne:
            color = "gray";
            break;
        case playerTwo:
            color = "#4267B2"
            break;
    }

    cell.style.backgroundColor = color;
}

function updateScore(isPlayerWinner) {
    if (isPlayerWinner === 'O') {
      scoreO++;
      document.getElementById('playerOne').innerText = scoreO;
    } else {
      scoreX++;
      document.getElementById('playerTwo').innerText = scoreX;
    }
  }
  
