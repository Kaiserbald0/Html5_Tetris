/*
    @author Kaiserbaldo - kaiserbaldo@gmail.com
    @license GNU General Public License, version 3 (GPLv3)
 */

function Stage(images) {

    this.score = 0;
    this.rows = 0;
    this.level = 1;
    this.rowsToNextLevel = 10;
    this.hold = 0;
    this.switched = 0;
    this.paused = 0;

    this.loadKeyConfiguration();

    //pixels
    this.pixel = [];
    this.pixel[0] = images.nero;
    this.pixel[1] = images.blu;
    this.pixel[2] = images.rosso;
    this.pixel[3] = images.arancione;
    this.pixel[4] = images.azzurro;
    this.pixel[5] = images.giallo;
    this.pixel[6] = images.viola;
    this.pixel[7] = images.verde;
    this.pixel[8] = images.trasp;

    this.whitePixel = images.white;


    this.next = [];

    nextP = [];
    nextP[0] = images.nextLO;
    nextP[1] = images.nextLO1;
    nextP[2] = images.nextLO2;

    this.next[6] = nextP;

    nextP = [];
    nextP[0] = images.nextZ;
    nextP[1] = images.nextZ1;
    nextP[2] = images.nextZ2;

    this.next[4] = nextP;

    nextP = [];
    nextP[0] = images.nextL;
    nextP[1] = images.nextL1;
    nextP[2] = images.nextL2;

    this.next[5] = nextP;                

    nextP = [];
    nextP[0] = images.nextI;
    nextP[1] = images.nextI1;
    nextP[2] = images.nextI2;

    this.next[2] = nextP;

    nextP = [];
    nextP[0] = images.nextO;
    nextP[1] = images.nextO1;
    nextP[2] = images.nextO2;

    this.next[1] = nextP;

    nextP = [];
    nextP[0] = images.nextT;
    nextP[1] = images.nextT1;
    nextP[2] = images.nextT2;

    this.next[7] = nextP;

    nextP = [];
    nextP[0] = images.nextS;
    nextP[1] = images.nextS1;
    nextP[2] = images.nextS2;

    this.next[3] = nextP;


    //canvas declaration
    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");


    this.playing = 0;
    this.resetStage();
}

Stage.prototype.getNextRandomIndex = function() {
    var a = [1, 2, 3, 4, 5, 6, 7];
    shuffle(a);
    return a[0];
};

Stage.prototype.loadKeyConfiguration = function() {

    //All the keyboard interactions mapping, default value
    if (localStorage.getItem("leftKeyUnicode")) {
        this.TempLeftKey = localStorage.getItem("leftKeyUnicode");
        this.LeftKey = localStorage.getItem("leftKeyUnicode");
        $('left_key').setProperty("value", localStorage.getItem("leftKeyValue"));
    } else {
        //Left: J - 74
        this.TempLeftKey = 74;
        this.LeftKey = 74;
        $('left_key').setProperty("value", "j");
    }

    if (localStorage.getItem("rightKeyUnicode")) {
        this.TempRightKey = localStorage.getItem("rightKeyUnicode");
        this.RightKey = localStorage.getItem("rightKeyUnicode");
        $('right_key').setProperty("value", localStorage.getItem("rightKeyValue"));
    } else {
        //Right: L - 76
        this.TempRightKey = 76;
        this.RightKey = 76;
        $('right_key').setProperty("value","l");
    }
    
    if (localStorage.getItem("downKeyUnicode")) {
        this.TempDownKey = localStorage.getItem("downKeyUnicode");
        this.DownKey = localStorage.getItem("downKeyUnicode");
        $('down_key').setProperty("value", localStorage.getItem("downKeyValue"));
    } else {
        //Down: K - 75
        this.TempDownKey = 75;
        this.DownKey = 75;
        $('down_key').setProperty("value","k");
    }

    if (localStorage.getItem("holdKeyUnicode")) {
        this.TempHoldKey = localStorage.getItem("holdKeyUnicode");
        this.HoldKey = localStorage.getItem("holdKeyUnicode");
        $('hold_key').setProperty("value", localStorage.getItem("holdKeyValue"));
    } else {    
        //Hold: O - 79
        this.TempHoldKey = 79;
        this.HoldKey = 79;
        $('hold_key').setProperty("value","o");
    }

    if (localStorage.getItem("dropKeyUnicode")) {
        this.TempDropKey = localStorage.getItem("dropKeyUnicode");
        this.DropKey = localStorage.getItem("dropKeyUnicode");
        $('drop_key').setProperty("value", localStorage.getItem("dropKeyValue"));
    } else {
        //Drop: U - 85
        this.TempDropKey = 85;
        this.DropKey = 85;
        $('drop_key').setProperty("value","u");
    }

    if (localStorage.getItem("rotateKeyUnicode")) {
        this.TempRotateKey = localStorage.getItem("rotateKeyUnicode");
        this.RotateKey = localStorage.getItem("rotateKeyUnicode");
        $('rotate_key').setProperty("value", localStorage.getItem("rotateKeyValue"));
    } else {
        //Rotate: I - 73
        this.TempRotateKey = 73;
        this.RotateKey = 73;
        $('rotate_key').setProperty("value","i");
    }
    //Start game: Space - 32
    this.StartGameKey = 32;
    //Pause - P
    this.PauseKey = 80;
    
};


Stage.prototype.saveKey = function(callback) {

    localStorage.setItem("leftKeyUnicode", this.TempLeftKey);
    localStorage.setItem("leftKeyValue", $('left_key').value);
    this.LeftKey = this.TempLeftKey;

    localStorage.setItem("rightKeyUnicode", this.TempRightKey);
    localStorage.setItem("rightKeyValue", $('right_key').value);
    this.RightKey = this.TempRightKey;

    localStorage.setItem("holdKeyUnicode", this.TempHoldKey);
    localStorage.setItem("holdKeyValue", $('hold_key').value);
    this.HoldKey = this.TempHoldKey;

    localStorage.setItem("downKeyUnicode", this.TempDownKey);
    localStorage.setItem("downKeyValue", $('down_key').value);
    this.DownKey = this.TempDownKey;

    localStorage.setItem("dropKeyUnicode", this.TempDropKey);
    localStorage.setItem("dropKeyValue", $('drop_key').value);
    this.DropKey = this.TempDropKey;

    localStorage.setItem("rotateKeyUnicode", this.TempRotateKey);
    localStorage.setItem("rotateKeyValue", $('rotate_key').value);
    this.RotateKey = this.TempRotateKey;

    callback();
};

Stage.prototype.pause = function (){

    if (this.paused == 0) {
        this.paused = 1;
        this.playing = 0;
        this.drawMatrix(1);
        this.context.font = "38pt Calibri Black";
        this.context.fillStyle = 'black';
        this.context.fillText("Game", 18, 100);
        this.context.fillText("Paused", 8, 150);
        this.context.font = "15pt Calibri";
        this.context.fillText("Score: " + this.score, 15, 190);
        this.context.fillText("Row:" + this.rows, 15, 220);
        this.context.fillText("Level:" + this.level, 15, 250);
        this.context.font = "10pt Calibri";
        this.context.fillText("Press \"P\" to restart the game", 5, 295);
    } else {
        this.onTick();
        this.paused = 0;
        this.playing = 1;
    }

};

Stage.prototype.getNextPieceIndex = function () {
    var index = this.followingPieces.shift();
    this.followingPieces.push(this.getNextRandomIndex());
    return index;
};

Stage.prototype.resetStage = function () {
    this.context.font = "40pt Calibri";
    this.context.fillText("Space", 15, 100);
    this.context.fillText("to", 55, 150);
    this.context.fillText("Start", 30, 200);
};

//Draw matrix inside the canvas
Stage.prototype.drawMatrix = function (clear) {
    for (i = 0; i < 10; i ++) {                        
            for (ii = 0; ii < 20; ii ++) {
                    if (clear == 1) matrixPixel = this.whitePixel;
                        else matrixPixel = this.pixel[this.matrix[i][ii]];
                    this.context.drawImage(matrixPixel, i*15+5, ii*15, 15, 15);                           
            }                        
    }
     
};

Stage.prototype.drawHold = function () {
    if (this.hold != 0) {
        matrixPixel = this.next[this.hold][1];
        this.context.drawImage(matrixPixel, 162, 8, 30, 36);
    } else {
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(162, 8, 30, 36);
    }
};

//Draw all next pieces
Stage.prototype.drawFollowingTetrominos = function () {

    offsetX = 160;
    offsetY = 53;

    matrixPixel = this.next[this.followingPieces[0]][0];
    this.context.drawImage(matrixPixel, offsetX, offsetY, 50, 60);

    matrixPixel = this.next[this.followingPieces[1]][1];
    this.context.drawImage(matrixPixel, offsetX + 56, offsetY + 5, 40, 48);

    for (i = 2; i <= 4; i++) {
        matrixPixel = this.next[this.followingPieces[i]][2];
        this.context.drawImage(matrixPixel, offsetX + 65, offsetY + 55 +((i-2)*31), 25, 30);    
    }

};

//horizontal collision
Stage.prototype.checkHCollision = function(dir) {

    var check = false;

    p = this.Piece;
    frames = p.frame;
    nextX = p.x + dir;

    if (
        ((frames[p.selectedFrame][0][0] + nextX) >= 0) &&
        ((frames[p.selectedFrame][0][0] + nextX) < 10) &&
        ((frames[p.selectedFrame][1][0] + nextX) >= 0) &&
        ((frames[p.selectedFrame][1][0] + nextX) < 10) &&
        ((frames[p.selectedFrame][2][0] + nextX) >= 0) &&
        ((frames[p.selectedFrame][2][0] + nextX) < 10) &&
        ((frames[p.selectedFrame][3][0] + nextX) >= 0) &&
        ((frames[p.selectedFrame][3][0] + nextX) < 10) &&
        (((p.y + frames[p.selectedFrame][0][1]) < 0) || (this.matrix[(frames[p.selectedFrame][0][0] + nextX)][p.y + frames[p.selectedFrame][0][1]] == 0)) &&
        (((p.y + frames[p.selectedFrame][1][1]) < 0) || (this.matrix[(frames[p.selectedFrame][1][0] + nextX)][p.y + frames[p.selectedFrame][1][1]] == 0)) &&
        (((p.y + frames[p.selectedFrame][2][1]) < 0) || (this.matrix[(frames[p.selectedFrame][2][0] + nextX)][p.y + frames[p.selectedFrame][2][1]] == 0)) &&
        (((p.y + frames[p.selectedFrame][3][1]) < 0) || (this.matrix[(frames[p.selectedFrame][3][0] + nextX)][p.y + frames[p.selectedFrame][3][1]] == 0))
    ) {

            check = true;
    }

    return check;

};

//vertical collision
Stage.prototype.checkVCollision = function(dir) {

    var check = false;

    p = this.Piece;
    frames = p.frame;
    nextY = p.y + dir;

    if (
        ((frames[p.selectedFrame][0][1] + nextY) < 20) &&
        ((frames[p.selectedFrame][1][1] + nextY) < 20) &&
        ((frames[p.selectedFrame][2][1] + nextY) < 20) &&
        ((frames[p.selectedFrame][3][1] + nextY) < 20) &&
        (((p.y + frames[p.selectedFrame][0][1]) < 0) || (this.matrix[(frames[p.selectedFrame][0][0] + p.x)][nextY + frames[p.selectedFrame][0][1]] == 0)) &&
        (((p.y + frames[p.selectedFrame][1][1]) < 0) || (this.matrix[(frames[p.selectedFrame][1][0] + p.x)][nextY + frames[p.selectedFrame][1][1]] == 0)) &&
        (((p.y + frames[p.selectedFrame][2][1]) < 0) || (this.matrix[(frames[p.selectedFrame][2][0] + p.x)][nextY + frames[p.selectedFrame][2][1]] == 0)) &&
        (((p.y + frames[p.selectedFrame][3][1]) < 0) || (this.matrix[(frames[p.selectedFrame][3][0] + p.x)][nextY + frames[p.selectedFrame][3][1]] == 0))
    ) {
            check = true;
    } 

    return check;

};

//rolling collision
Stage.prototype.CheckRollingCollision = function() {
    var check = false;
    if (this.checkHCollision(0) && this.checkVCollision(0))
        check = true;

    return check;
};

//fix the tetromino to the matrix
Stage.prototype.FixTetromino = function() {
    delete this.Piece;
    this.Piece = new Tetromino(this.getNextPieceIndex());
    this.CheckRigheFatte();
    this.switched = 0;
    for (i = 0; i < 10; i ++) {
        if (this.matrix[i][0] != 0) {
                this.playing = 2;
        }
    }
    this.drawTetromino();
    this.drawFollowingTetrominos();
    this.drawScore();
};

// Draw score at glance
Stage.prototype.drawScore = function() {


    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect (200,205,50,110);

    this.context.font = "10pt Calibri";
    this.context.fillStyle = "#000000";
    this.context.fillText(this.score, 200, 244);
    this.context.fillText(this.rows, 200, 264);
    this.context.fillText(this.rowsToNextLevel, 200, 284);
    this.context.fillText(this.level, 200, 304);
};

//horizontal movement
Stage.prototype.moveX = function(x) {

    this.drawTetromino(1);
    if (this.checkHCollision(x)) {
        this.Piece.x += x;
    }
    this.drawTetromino();
    this.onTick();
};

//vertical movement
Stage.prototype.moveY = function(y) {

    this.drawTetromino(1);
    if (this.checkVCollision(y) ) {
            this.Piece.y += y;
            this.drawTetromino();
    } else {
            this.drawTetromino();
            this.FixTetromino();
    }

    this.onTick();
};

//Drop the floating piece
Stage.prototype.Drop = function() {

    righe = 0;
    this.drawTetromino(1);
    while (this.checkVCollision(1) ) {
            this.Piece.y++;
            righe ++;
    }
    this.drawTetromino();
    this.score += (righe * 2 * this.level);//1 riga
    this.FixTetromino();
    
    this.onTick();
};

//ruoto il pezzo, carico il prossimo frame
Stage.prototype.Rotate = function() {

    this.drawTetromino(1);
    backupFrame = this.Piece.selectedFrame;
    this.Piece.nextFrame();
    if (!this.CheckRollingCollision()) {
        this.Piece.selectedFrame = backupFrame;
    }
    this.drawTetromino();
    this.onTick();
};

Stage.prototype.MoveDown = function () {
    if (this.playing == 1)
        this.moveY(1);
};

Stage.prototype.MoveLeft = function () {
    this.moveX(-1);
};

Stage.prototype.MoveRight = function () {
    this.moveX(1);
};

Stage.prototype.Hold = function () {
    
    if (this.switched == 0) {
        tempIndex = this.Piece.index;
        this.drawTetromino(true);
        delete this.Piece;
        if (this.hold != 0) {
            this.Piece = new Tetromino(this.hold);
        } else {            
            this.Piece = new Tetromino(this.getNextPieceIndex());
            this.drawFollowingTetrominos();
        }
        this.switched = 1;
        this.hold = tempIndex;
        this.drawHold();
        this.drawTetromino();
        this.MoveDown();
    }

};

Stage.prototype.resetRow = function(r) {
        for (i = 0; i < 10; i ++) {
                this.matrix[r][i] = 0;
        }
};

Stage.prototype.deleteMatrixRow = function (r){

    for (i = r; i > 0; i --) {

            for (ir = 0; ir < 10; ir ++) {
                    this.matrix[ir][i] = this.matrix[ir][i-1];
            }
    }

    this.resetRow(0);

};

//controllo se ci sono delle righe
Stage.prototype.CheckRigheFatte = function() {

    i = 0;
    ii = 0;
    r= 0;
    numRighe = 0;
    check = true;
    righeDaCancellare = new Array(0,0,0,0);
    for (ii = 0; ii < 20; ii ++) {
        check = true;
        for (i = 0; i < 10; i ++) {
            if (this.matrix[i][ii] == 0) {
                    check = false;
            }
        }
        if (check) {
            righeDaCancellare[numRighe] = ii;
            numRighe++;
        }

    }

    //--------------//
    //se ci sono righe aggiorno la matrice
    if (numRighe > 0) {

            for (r = 0; r < numRighe; r++) {
                    this.deleteMatrixRow(righeDaCancellare[r]);
                    this.rows ++;
            }

            //ci sono righe, butta i punti
            if (numRighe==1) this.score += (100 * this.level);//1 riga
            if (numRighe==2) this.score += (300 * this.level);//2 righe
            if (numRighe==3) this.score += (500 * this.level);//3 righe
            if (numRighe==4) this.score += (800 * this.level);//4 righe

            this.level = Math.floor(this.rows / 10) + 1;
            this.rowsToNextLevel = this.level * 10 - this.rows;

    }


};

//metto il pezzo dentro la matrice
Stage.prototype.drawTetromino = function (clear) {

    p = this.Piece;
    frames = p.frame;
    if (clear == 1) s = 0;
       else s = p.sprite;
    frameSelezionato = p.selectedFrame;
    for (i = 0; i < 4; i++) {                   

        x = frames[frameSelezionato][i][0] + p.x; 
        y = frames[frameSelezionato][i][1] + p.y;
        if (x >= 0 && y >= 0) {
            this.matrix[x][y] = s;
        }
    }
};

//ad ogni tick esegui questo
Stage.prototype.onTick = function () {

    if (this.paused == 0) {

        if (this.playing == 1) {
            this.drawMatrix();
        } else if (this.playing == 2) {
            this.drawMatrix(1);
            this.context.font = "40pt Calibri";
            this.context.fillText("Game", 18, 100);
            this.context.fillText("Over", 30, 150);
            this.context.font = "15pt Calibri";
            this.context.fillText("Score: " + this.score, 15, 190);
            this.context.fillText("Row:" + this.rows, 15, 220);
            this.context.fillText("Level:" + this.level, 15, 250);
            this.context.font = "10pt Calibri";
            this.context.fillText("Space to start a new game", 8, 295);
        }
    }
};

Stage.prototype.OnTimer = function() {

    if (this.paused == 0) {
        this.MoveDown();
    }

    var Time = 1050 - (this.level * 100);
    setTimeout ( "stage.OnTimer()",  Time);
};

//Let's start playing
Stage.prototype.StartGame = function(){

    if (this.playing != 1) {                    

        //reset the matrix
        this.matrix = [];
        for (i = 0; i < 10; i ++) {
                mRow = [];
                for (ii = 0; ii < 20; ii ++) {
                        mRow[ii] = 0;                                
                }
                this.matrix[i] = mRow;
        }  

        //array dei prossimi 5 pezzi:
        this.followingPieces = new Array(this.getNextRandomIndex(),this.getNextRandomIndex(),this.getNextRandomIndex(),this.getNextRandomIndex(),this.getNextRandomIndex());

        this.playing = 1;
        this.switched = 0;
        this.hold = 0;
        this.score = 0;
        this.rows = 0;
        this.level = 1;
        this.Piece = new Tetromino(this.getNextPieceIndex());
        this.drawTetromino();
        this.drawFollowingTetrominos();
        this.drawScore();
        this.drawHold();
        this.onTick();
        
        //timer
        setTimeout ( "stage.OnTimer()", 1000 );
        
    }

};

