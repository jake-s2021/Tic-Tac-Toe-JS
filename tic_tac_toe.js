//designed to work with SpiderMonkey in linux terminal with command 'js52 tic_tac_toe.js'

function main(){

    let board = [["+","+","+"],["+","+","+"],["+","+","+"]];    
    let winner = 0;
    let play = "y"
    let gameStart = false;

    while(1){
        for(let i = 1; i < 3; i++){

            if(gameStart){ //after the first loop the next player will go first, function logic reflects this
                userIn(board, i); //print board should be the first function called upon execution
            } 
            printBoard(board);
            gameStart = true; //since first board has printed to screen, user can be prompted to input
            winner = checkWin(board);
            [play, gameStart] = resetGame(board, winner, gameStart, play, i);
        }
       // print(play.toUpperCase())
        if(play.toUpperCase() != 'Y'){break;} //main loop breaks and program exits

    }
}
function printBoard(arrBoard){

    arrBoard.forEach(element => { print(element)});
    
}
function userIn(arrBoard, userNum){

    let x = 0;
    let y = 0;
    let check = false;
    let userChoice = 0;

    while(!(check)){

        userChoice = readline();//readline is specific to SpiderMonkey

        switch(userChoice){//not as modular as the other functions
            case "1":
            case "2":
            case "3":
                x = 0;
                y = userChoice-1//1-1=0, 2-1=1, 3-1=2
                check = true;
                break;
            case "4":
            case "5":
            case "6":
                x = 1;
                y = userChoice-4;//4-4=0, etc
                check = true;
                break;
            case "7":
            case "8":
            case "9":
                x = 2;
                y = userChoice-7;//7-7=0, etc
                check = true;
                break;
            default:
                print("Invalid selection.");
        }
    
        if(arrBoard[x][y] === 'X' || arrBoard[x][y] === 'O'){
            print("Space already occupied, select another:");
            check = false;
        }
        else{
            (userNum === 1) ? arrBoard[x][y] = 'O' : arrBoard[x][y] = 'X'; //player 1 is 'X', player 2 is 'O', true/false set up due to comment on line 13
        }
    }


    
}
function checkWin(arrBoard){

    p1win = true;
    p2win = true;


    //diagonal check = \
    for(let i = 0; i < arrBoard.length;i++){

        /*
          0 1 2
        0 + + +
        1 + + +
        2 + + +
        */
        
        if(arrBoard[i][i] != 'X'){
                p1win = false;
        }
        if(arrBoard[i][i] != 'O'){
                p2win = false;
        }
        
    }

    if(p1win){
        return 1;
    }
    if(p2win){
        return 2;
    }

  //  print("1")

    //horizontal check
    for(let i = 0; i < arrBoard.length;i++){

        /*
          0 1 2
        0 + + +
        1 + + +
        2 + + +
        */

        p1win = true; //flags need to be reset for each row, must be inside loop
        p2win = true;

        for(let j = 0; j < arrBoard[i].length; j++){
            if(arrBoard[i][j] != 'X'){
                p1win = false;
            }
            if(arrBoard[i][j] != 'O'){
                p2win = false;
            }
        }

        if(p1win){
            return 1;
        }
        if(p2win){
            return 2;
        }

    }

   // print("2")

    p1win = true;
    p2win = true;


    //diagonal = /
    let x = 0;
    let y = arrBoard.length-1;

    while(x < arrBoard.length-1 || y > -1){// while used to modify two variables each loop

        /*
          0 1 2
        0 + + +
        1 + + +
        2 + + +
        */

        if(arrBoard[y][x] != 'X'){
            p1win = false;
        }
        if(arrBoard[y][x] != 'O'){
            p2win = false;
        }

        x++;
        y--;
        
    };


    if(p1win){
        return 1;
    }
    if(p2win){
        return 2;
    }

    //print("3")

    p1win = true;
    p2win = true;

    //vertical check
    for(let i = 0; i < arrBoard.length;i++){

        /*
          0 1 2
        0 + + +
        1 + + +
        2 + + +
        */

        p1win = true;
        p2win = true;

        for(let j = 0; j < arrBoard[i].length; j++){
            if(arrBoard[j][i] != 'X'){
                p1win = false;
            }
            if(arrBoard[j][i] != 'O'){
                p2win = false;
            }
        }

        if(p1win){
            return 1;
        }
        if(p2win){
            return 2;
        }

    }

    //print("4")

    return 0;

}
function resetGame(arrBoard, win, start, replay, userNum){

    if(win === 1 || win === 2){
        print("Player " + win + " wins! Play again? (y/n)");
        replay = readline();
        arrBoard = arrBoard.map((thing) =>{ //re-initializes the board for a new game, thing acts as an iterator for the array of arrays and returns a new array for each element 
            for(let i = 0; i < 3; i++){//for initializes each array in element "thing"
                if(thing[i] != "+"){
                    thing[i] = "+"
                }
            }
        });
        start = false;
        return [replay,start];
    }
    else if(win === 0){//printed in this function to stop unnecessary prompting
        print("\nPlayer "+ userNum + ", please select a space [1-9 starting from top left].\n");
        return [replay,start]
    }
    else{
        return [replay,start];
    }


}
main()
