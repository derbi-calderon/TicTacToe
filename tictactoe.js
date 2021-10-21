var header = document.createElement('h1');
header.innerHTML = "Welcome to TicTacToe";

header.style.fontSize = '50px';
header.style.marginLeft = '30%';

document.body.appendChild(header);

var playerWins = false;
var cpuWins = false;
var draw = false;

var gameTable = document.createElement('table');
gameTable.style.marginLeft = "30%";



var count = 1; 
for(let i = 0; i < 3; i++){
    let row = document.createElement('tr');
    let col1 = document.createElement('td');

    let button1 =document.createElement('button');
    button1.style.height = "100%";
    button1.style.width = "100%";
    button1.style.fontSize = "20px";
    button1.style.border = "2px gray solid"
    button1.innerText = count ++;
    button1.addEventListener('click', btnClicked);
    col1.appendChild(button1);

    let col2 = document.createElement('td');
    let button2 =document.createElement('button');
    button2.style.height = "100%";
    button2.style.width = "100%";
    button2.style.fontSize = "20px";
    button2.style.border = "2px gray solid"
    button2.innerText = count ++;
    button2.addEventListener('click', btnClicked);
    col2.appendChild(button2);

    let col3 = document.createElement('td');
    let button3 =document.createElement('button');
    button3.style.height = "100%";
    button3.style.width = "100%";
    button3.style.fontSize = "20px";
    button3.style.border = "2px gray solid"
    button3.innerText = count ++;
    button3.addEventListener('click', btnClicked);
    col3.appendChild(button3);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    gameTable.appendChild(row);
}

var btns = document.getElementsByTagName('button');
//console.log(btns);


var resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.style.height = '50px';
resetBtn.style.width = '100px';
resetBtn.style.marginLeft = '45%';
resetBtn.style.display = 'none';
resetBtn.addEventListener('click', resetGame);
document.body.after(gameTable, resetBtn);


function resetGame(){
    playerWins = false;
    cpuWins = false;
    draw = false;

    let counter = 1;
    for(btn of btns){
        btn.innerText = counter++;
        btn.removeAttribute('disabled');
    }
    resetBtn.style.display = 'none';
    resetBtn.innerText = 'Reset';
    header.innerText = "Welcome to TicTacToe";
    movesAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    turnCount = 0; 


}

var movesAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var turnCount = 0; 

function btnClicked(e){
    //console.log(e.target.innerText);
    e.target.setAttribute('disabled','disabled');
    movesAvailable[e.target.innerHTML - 1] = 0;
    //console.log(movesAvailable);
    e.target.innerText = 'X';
    turnCount++;
    checkWin();
    if(playerWins){
        header.innerHTML = "Player X wins the game";
        endGame();
        return;

    }
    checkDraw();
    if(draw){
        header.innerHTML = "Draw!";
        endGame();
        return;
    }
    let pcTurn = true;
    while(pcTurn && turnCount < 5){
        let randomSpot = Math.floor(Math.random() * 9);
        //console.log(randomSpot);
        while(movesAvailable[randomSpot] == 0){
            randomSpot = Math.floor(Math.random() * 9);
            //console.log(randomSpot);
        }
        movesAvailable[randomSpot] = 0;
        btns[randomSpot].innerText = 'O';
        btns[randomSpot].setAttribute('disabled','disabled');
        pcTurn = false;
    }
    
    
    checkWin();
    if(cpuWins){
        header.innerHTML = "Player O wins the game";
        endGame();
    }
}

var winPossiblities = [ [1,2,3] , [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [7,5,3]  ]
//console.log(winPossiblities);

var noMoreMoves = true;

function checkDraw(){
    noMoreMoves = true;
    for(i in movesAvailable){
        if(movesAvailable[i] > 0){
            noMoreMoves = false;
            break;
        }
    }

    if(noMoreMoves){
        draw = true;
        return;
    }
}

function checkWin(){
    


    for(arr of winPossiblities){
        if(btns[arr[0] - 1].innerText == 'X' )
        if(btns[arr[1] - 1].innerText == 'X' )
        if(btns[arr[2] - 1].innerText == 'X' ){
            playerWins = true;
            return;
        }

        

        if(btns[arr[0] - 1].innerText == 'O' )
        if(btns[arr[1] - 1].innerText == 'O' )
        if(btns[arr[2] - 1].innerText == 'O' ){
            cpuWins = true;
            return;
        }

            
        
        //console.log(arr);
    }

    return;
}


function endGame(){
    for(btn of btns){
        btn.setAttribute('disabled','disabled');
    }
    resetBtn.removeAttribute('disabled');
    resetBtn.style.display = 'block';
    return;
}

gameTable.style.height = '500px';
gameTable.style.width = '500px';




document.body.appendChild(gameTable);