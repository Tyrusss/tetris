//Define tetromino bitmaps

Z = [
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,1,1],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,1,0],
        [1,1,0],
        [1,0,0]
    ]
]
S = [
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,1],
        [0,0,1]
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [1,0,0],
        [1,1,0],
        [0,1,0]
    ]
]
J = [
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [0,1,0],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,0,1]
    ]
]
T = [
    [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    [
        [0,1,0],
        [1,1,0],
        [0,1,0]
    ],
    [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,1],
        [0,1,0]
    ]
]
L = [
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [0,0,0],
        [1,1,1],
        [1,0,0]
    ],
    [
        [1,1,0],
        [0,1,0],
        [0,1,0]
    ],
    [
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ]
]
I = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
    ]
]
O = [
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ]
]

Piece_Table = [[Z,"red"], [S, "green"], [J, "rgb(0, 64, 255)"], [T, "purple"], [L, "orange"], [I, "rgb(0,200,255)"], [O, "yellow"]]

//Define tetromino class
class Piece {
    constructor(Tetromino, colour) {
        this.tetromino = Tetromino;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.colour = colour;
        this.x = 3;
        this.y = -2;
    }

    draw() {
        for(var r=0;r<this.activeTetromino.length;r++) {
            for(var c=0;c<this.activeTetromino.length;c++) {
                if(this.activeTetromino[r][c]) {
                    drawSquare(this.x+c, this.y+r, this.colour)
                }
            }
        }
    }
    undraw() {
        for(var r=0;r<this.activeTetromino.length;r++) {
            for(var c=0;c<this.activeTetromino.length;c++) {
                if(this.activeTetromino[r][c]) {
                    drawSquare(this.x+c, this.y+r, "white")
                }
            }
        }
    }
    willCollide(dx, dy, piece) {
        for(r=0;r<piece.length;r++) {
            for(c=0;c<piece.length;c++) {
                if(!piece[r][c]) { continue; }

                let newX = this.x + c + dx;
                let newY = this.y + r + dy;
                
                if(newX < 0 || newX >= COLUMN || newY >= ROW) { return true; }
                if(newY < 0) { continue; }
                if(board[newY][newX] != VACANT) { return true; }
            } 
        }
        return false;
    }
    moveLeft() {
        if(! this.willCollide(-1, 0, this.activeTetromino)) {
            this.undraw();
            this.x--;
            this.draw();
        }
    }
    moveRight() {
        if(! this.willCollide(1, 0, this.activeTetromino)) {
            this.undraw();
            this.x++;
            this.draw();
        }
    }
    moveDown() {
        if(! this.willCollide(0, 1, this.activeTetromino)) {
            this.undraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            drawBoard();
            piece = randomPiece(randomN);
        }
    }
    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]
        let kick = 0;

        if(this.willCollide(0, 0, nextPattern)) {
            if(this.x < COLUMN/2) { kick = 1; } else { kick = -1; }
        }

        if(! this.willCollide(kick, 0, nextPattern)) {
            this.undraw();
            this.x += kick;
            this.tetrominoN++;
            if(this.tetrominoN == 4) { this.tetrominoN = 0 };
            this.activeTetromino = nextPattern
            this.draw();
        }
    }
    lock() {
        for(r=0;r<this.activeTetromino.length;r++) {
            for(c=0;c<this.activeTetromino.length;c++) {
                if(! this.activeTetromino[r][c]) { continue; }
                if(this.y + r < 0) {
                    score = 0;
                    document.getElementById("score").innerText="Score: "+score;
                    gameOver = true;
                    alert("Game Over!")
                    for(var r=0;r<ROW;r++) {
                        for(var c=0;c<COLUMN;c++) {
                            board[r][c] = VACANT;
                        }
                    }
                    drawBoard();
                }
                board[this.y + r][this.x + c] = this.colour;
                drawBoard();
            }
        }

        for(r=0;r<=ROW-1;r++) {
            let isRowFull = true;
            for(c=0;c<COLUMN;c++) {
                isRowFull = isRowFull && (board[r][c] != VACANT);
            }
            if(isRowFull) {
                for(var y=r;y>1;y--) {
                    for(c=0;c<COLUMN;c++) {
                        board[y][c] = board[y-1][c];
                    }
                }
                for(c=0;c<COLUMN;c++) { board[0][c] = VACANT;}
                drawBoard();
                score += 10;
                document.getElementById("score").innerText="Score: "+score;
            }
        }
    }
}

function randomPiece(pieceN) {
    randomN = Math.floor(Math.random() * Piece_Table.length);
    let nextPiece = new Piece(Piece_Table[randomN][0], Piece_Table[randomN][1]);

    switch(nextPiece.tetromino) {
        case Z:
            nextPiece.x = 13.5;
            nextPiece.y = 8;
            break;
        case S:
            nextPiece.x = 13.5;
            nextPiece.y = 8;
            break;
        case J:
            nextPiece.x = 13.7;
            nextPiece.y = 7.7;
            break;
        case T:
            nextPiece.x = 13.5;
            nextPiece.y = 7.2;
            break;
        case L:
            nextPiece.x = 13.25;
            nextPiece.y = 7.5;
            break;
        case I:
            nextPiece.x = 13.5;
            nextPiece.y = 7;
            break;
        case O:
            nextPiece.x = 13;
            nextPiece.y = 7;
            break;
    }

    ctx.fillstyle = "white";
    ctx.fillRect(13*SQ, 7*SQ, 4*SQ, 4*SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(13*SQ, 7*SQ, 4*SQ, 4*SQ);
    nextPiece.draw();

    return new Piece(Piece_Table[pieceN][0], Piece_Table[pieceN][1]);
}

document.addEventListener("keydown", keyPush);
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            piece.moveLeft();
            break;
        case 38:
            piece.rotate();
            break;
        case 39:
            piece.moveRight();
            break;
        case 40:
            piece.moveDown();
            break;
    }
}
var dropStart = Date.now();
function drop() {
    var now = Date.now();
    var delta = now - dropStart;
    if(delta > 1000) {
        piece.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
}

window.onload=function() {
    pieceN = Math.floor(Math.random() * Piece_Table.length);
    piece = randomPiece(pieceN);
    piece.draw();
    drop();
}