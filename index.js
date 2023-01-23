let turn = new Audio("ting.mp3");

let CurrentPlayer = "X";

let gameActive = true;

const statusDisplay = document.querySelector('.info');

let gameState = ["","","","","","","","",""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = ()=> `Player ${CurrentPlayer} has won!`;


const drawMessage = ()=> `Match has been ended in a draw`;

const currentPlayerTurn = ()=> `Player ${CurrentPlayer} has to play!`;

const newinfo = document.querySelector(".info");
newinfo.innerHTML = currentPlayerTurn();

 const handleCellPlayed=(cellClicked,cellIndex) => {
    
    gameState[cellIndex] = CurrentPlayer;
    cellClicked.innerHTML = CurrentPlayer;
   
}

function handleResultValidation() {
    let roundWon = false;
    winningConditions.forEach(comb =>{
        let a  = gameState[comb[0]];
        let b = gameState[comb[1]];
        let c = gameState[comb[2]];
        if (a === '' || b === '' || c === '') {
            return;
        }
        if(a==b&&a==c){
           roundWon = true;
        }

    })
    if(roundWon){
        newinfo.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
   console.log(roundDraw);
    if (roundDraw) {
        console.log("bhai hello");
        newinfo.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    changePlayer();
    
}

const handleCellClick = (elementListener) => {
    console.log(elementListener);
       const cellClicked = elementListener.target;
       const clickedCellIndex = parseInt(cellClicked.getAttribute('data-cell-index'));
       if(gameState[clickedCellIndex]!=""||!gameActive){
         return;
       }
       handleCellPlayed(cellClicked,clickedCellIndex);
       handleResultValidation();
}
function handleRestartGame() {
            console.log("hello");
            gameState = ["","","","","","","","","",""];
            CurrentPlayer = "X";
            newinfo.innerHTML = currentPlayerTurn();
            gameActive = true;
            document.querySelectorAll('.grid-item').forEach(e=>
                e.innerHTML = "" );
        
}
const changePlayer = ()=>{
    CurrentPlayer =  CurrentPlayer==="X"?"O":"X";
    newinfo.innerHTML = currentPlayerTurn();
}
document.querySelectorAll('.grid-item').forEach((element)=>{
        element.addEventListener('click',handleCellClick);
})
document.querySelector('.reset').addEventListener('click',handleRestartGame);

