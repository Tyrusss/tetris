const canv = document.getElementById("gc");
const ctx = canv.getContext("2d");
const SQ = 20;
const ROW = 20;
const COLUMN = 10;
const VACANT = "white";
var score = 0;
var gameOver = false;


function drawSquare(x, y, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

board = [];
for(r=0;r<ROW;r++) {
    board[r] = [];
    for(c=0;c<COLUMN;c++) {
        board[r][c] = VACANT;
    }
}

function drawBoard() {
    for(r=0;r<ROW;r++) {
        for(c=0;c<COLUMN;c++) {
            drawSquare(c, r, board[r][c])
        }
    }
    ctx.fillStyle = "white";
    ctx.fillRect(13*SQ, 7*SQ, 4*SQ, 4*SQ)
    ctx.strokeStyle = "black";
    ctx.strokeRect(13*SQ, 7*SQ, 4*SQ, 4*SQ);
}
drawBoard()
