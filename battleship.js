/*
1. For each 'ship' in 'ships'...
2. set 'placed' to false...
3. While 'placed' is false, attempt to assign an x and y coordinate for each size for that 'ship'...
4. Randomly assign the 'ship' to horizontal orientation, or vertical orientation...
5. If the 'ship' orientation is horizontal, ensure all coordinates increment along the x axis...
6. If the 'ship' orientation is vertical, ensure all coordinates increment along the y axis...
7. If any coordinate value, x or y, is already assigned, return false and go back to step 3...
8. 
*/
const boardSize = 10;
const cellSize = 50;
const cnvs = document.getElementById("gameboard");
const ctx = cnvs.getContext("2d");

function drawGameboard () {   
    ctx.fillStyle = "LightBlue";
    ctx.fillRect(0, 0, boardSize * cellSize, boardSize * cellSize);
}

function drawShip( x, y, color ){
    let cellX = x * cellSize;
    let cellY = y * cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(cellX, cellY, cellSize, cellSize);
    
    ctx.rect(cellX, cellY, cellSize, cellSize);
    ctx.stroke();
}

function generateBattleshipBoard(  ) {
    const ships = [
        { name: "Aircraft Carrier", size: 5 },
        { name: "Battleship", size: 4 },
        { name: "Cruiser", size: 3 },
        { name: "Submarine", size: 3 },
        { name: "Destroyer", size: 2 }
    ];

    // create a 2D array 10 x 10
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    function isPlacementValid(ship, x, y, isHorizontal) {
        for (let i = 0; i < ship.size; i++) {
            const newX = isHorizontal ? x : x + i;
            const newY = isHorizontal ? y + i : y;

            if (
                newX >= boardSize || newY >= boardSize || // Out of bounds
                board[newX][newY] !== 0 // Position already occupied
            ) { return false; }
        }
        return true;
    }

    function placeShip(ship) {
        let placed = false;

        while (!placed) {
            const isHorizontal = Math.random() < 0.5; // Randomly choose orientation
            const x = Math.floor(Math.random() * boardSize);
            const y = Math.floor(Math.random() * boardSize);

            if (isPlacementValid(ship, x, y, isHorizontal)) {
                for (let i = 0; i < ship.size; i++) {
                    const newX = isHorizontal ? x : x + i;
                    const newY = isHorizontal ? y + i : y;
                    board[newX][newY] = ship.name[0]; // Mark ship position with its first letter
                }
                placed = true;
            }
        }
    }
    ships.forEach(placeShip);
    return board;
}

// Display the generated board
const board = generateBattleshipBoard();
const map = drawGameboard();
board.forEach(row => console.log(row.map(cell => (cell === 0 ? 0 : cell)).join(" ")));

for ( let x = 0; x < board.length; x++ ){
    for ( let y = 0; y < board.length; y++ ){
        if (board[x][y] !== 0){
            color = 'red';
            if( board[x][y] == 'A'){color = 'SlateGrey'; length = 5;}
            if( board[x][y] == 'B'){color = 'DarkGray'; length = 4;}
            if( board[x][y] == 'C'){color = 'Gray'; length = 3;}
            if( board[x][y] == 'S'){color = 'Silver'; length = 2;}
            if( board[x][y] == 'D'){color = 'DimGray'; length = 2;}
            drawShip( x, y, color, length );
        }
    }
}

