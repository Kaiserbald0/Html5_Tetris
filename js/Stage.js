/*
    @author Kaiserbaldo - kaiserbaldo@gmail.com
    @license GNU General Public License, version 2 (GPLv2)
 */

function Stage(images) {

    this.punteggio = 0;
    this.righe = 0;
    this.livello = 1;
    this.righeToNextLevel = 10;
    this.hold = 0;
    this.switched = 0;
    this.paused = 0;

    this.LoadKeyConfiguration();

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


    //definisco il canvas
    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");


    this.playing = 0;
    this.ResetStage();
}

Stage.prototype.getNextRandomIndex = function() {
    var a = [1, 2, 3, 4, 5, 6, 7];
    shuffle(a);
    return a[0];
};

Stage.prototype.LoadKeyConfiguration = function() {

    //All the keyboard interactions mapping, default value

    //Left: J - 74
    this.TempLeftKey = 74;
    this.LeftKey = 74;
    //Right: L - 76
    this.TempRightKey = 76;
    this.RightKey = 76;
    //Down: K - 75
    this.TempDownKey = 75;
    this.DownKey = 75;
    //Hold: O - 79
    this.TempHoldKey = 79;
    this.HoldKey = 79;
    //Drop: U - 85
    this.TemDropKey = 85;
    this.DropKey = 85;
    //Rotate: I - 73
    this.TempRotateKey = 73;
    this.RotateKey = 73;
    //Start game: Space - 32
    this.StartGameKey = 32;
    //Pause - P
    this.PauseKey = 80;

    $('left_key').setProperty("value", "j");
    $('right_key').setProperty("value","l");
    $('rotate_key').setProperty("value","i");
    $('hold_key').setProperty("value","o");
    $('drop_key').setProperty("value","u");
    $('down_key').setProperty("value","k");
};


Stage.prototype.SaveKey = function(callback) {

    this.LeftKey = this.TempLeftKey;
    this.RightKey = this.TempRightKey;
    this.DownKey = this.TempDownKey;
    this.HoldKey = this.TempHoldKey;
    this.DropKey = this.TemDropKey;
    this.RotateKey = this.TempRotateKey;

    callback();
};

Stage.prototype.Pause = function (){

    if (this.paused == 0) {
        this.paused = 1;
        this.playing = 0;
        this.DrawMatrix(1);
        this.context.font = "38pt Calibri Black";
        this.context.fillStyle = 'black';
        this.context.fillText("Game", 18, 100);
        this.context.fillText("Paused", 8, 150);
        this.context.font = "15pt Calibri";
        this.context.fillText("Score: " + this.punteggio, 15, 190);
        this.context.fillText("Row:" + this.righe, 15, 220);
        this.context.fillText("Level:" + this.livello, 15, 250);
        this.context.font = "10pt Calibri";
        this.context.fillText("Press \"P\" to restart the game", 5, 295);
    } else {
        this.OnTick();
        this.paused = 0;
        this.playing = 1;
    }

};

Stage.prototype.getNextPezzoIndex = function () {
    index = this.nextPezzi.shift();
    this.nextPezzi.push(this.getNextRandomIndex());
    return index;
};

Stage.prototype.ResetStage = function () {
    this.context.font = "40pt Calibri";
    this.context.fillText("Space", 15, 100);
    this.context.fillText("to", 55, 150);
    this.context.fillText("Start", 30, 200);
};

//Draw matrin inside the canvas
Stage.prototype.DrawMatrix = function (clear) {
    for (i = 0; i < 10; i ++) {                        
            for (ii = 0; ii < 20; ii ++) {
                    if (clear == 1) matrixPixel = this.whitePixel;
                        else matrixPixel = this.pixel[this.matrix[i][ii]];
                    this.context.drawImage(matrixPixel, i*15+5, ii*15, 15, 15);                           
            }                        
    }
     
};

Stage.prototype.DrawHold = function () {
    if (this.hold != 0) {
        matrixPixel = this.next[this.hold][1];
        this.context.drawImage(matrixPixel, 162, 8, 30, 36);
    } else {
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(162, 8, 30, 36);
    }
};

//Draw next pieces
Stage.prototype.DrawNexts = function () {

    offsetX = 160;
    offsetY = 53;

    matrixPixel = this.next[this.nextPezzi[0]][0];
    this.context.drawImage(matrixPixel, offsetX, offsetY, 50, 60);

    matrixPixel = this.next[this.nextPezzi[1]][1];
    this.context.drawImage(matrixPixel, offsetX + 56, offsetY + 5, 40, 48);

    for (i = 2; i <= 4; i++) {
        matrixPixel = this.next[this.nextPezzi[i]][2];
        this.context.drawImage(matrixPixel, offsetX + 65, offsetY + 55 +((i-2)*31), 25, 30);    
    }

};

//collisioni orizzontali
Stage.prototype.CheckHCollision = function(dir) {

    var check = false;

    p = this.Pezzo;
    frames = p.frame;
    nextX = p.x + dir;

    if (
        ((frames[p.frameSelezionato][0][0] + nextX) >= 0) &&
        ((frames[p.frameSelezionato][0][0] + nextX) < 10) &&
        ((frames[p.frameSelezionato][1][0] + nextX) >= 0) &&
        ((frames[p.frameSelezionato][1][0] + nextX) < 10) &&
        ((frames[p.frameSelezionato][2][0] + nextX) >= 0) &&
        ((frames[p.frameSelezionato][2][0] + nextX) < 10) &&
        ((frames[p.frameSelezionato][3][0] + nextX) >= 0) &&
        ((frames[p.frameSelezionato][3][0] + nextX) < 10) &&
        (((p.y + frames[p.frameSelezionato][0][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][0][0] + nextX)][p.y + frames[p.frameSelezionato][0][1]] == 0)) &&
        (((p.y + frames[p.frameSelezionato][1][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][1][0] + nextX)][p.y + frames[p.frameSelezionato][1][1]] == 0)) &&
        (((p.y + frames[p.frameSelezionato][2][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][2][0] + nextX)][p.y + frames[p.frameSelezionato][2][1]] == 0)) &&
        (((p.y + frames[p.frameSelezionato][3][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][3][0] + nextX)][p.y + frames[p.frameSelezionato][3][1]] == 0)) 
    ) {

            check = true;
    }

    return check;

};

//vertical collision
Stage.prototype.CheckVCollision = function(dir) {

    var check = false;

    p = this.Pezzo;
    frames = p.frame;
    nextY = p.y + dir;

    if (
        ((frames[p.frameSelezionato][0][1] + nextY) < 20) &&
        ((frames[p.frameSelezionato][1][1] + nextY) < 20) &&
        ((frames[p.frameSelezionato][2][1] + nextY) < 20) &&
        ((frames[p.frameSelezionato][3][1] + nextY) < 20) &&
        (((p.y + frames[p.frameSelezionato][0][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][0][0] + p.x)][nextY + frames[p.frameSelezionato][0][1]] == 0)) &&
        (((p.y + frames[p.frameSelezionato][1][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][1][0] + p.x)][nextY + frames[p.frameSelezionato][1][1]] == 0)) &&
        (((p.y + frames[p.frameSelezionato][2][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][2][0] + p.x)][nextY + frames[p.frameSelezionato][2][1]] == 0)) &&
        (((p.y + frames[p.frameSelezionato][3][1]) < 0) || (this.matrix[(frames[p.frameSelezionato][3][0] + p.x)][nextY + frames[p.frameSelezionato][3][1]] == 0)) 
    ) {
            check = true;
    } 

    return check;

};

//rolling collision
Stage.prototype.CheckRollingCollision = function() {
    var check = false;
    if (this.CheckHCollision(0) && this.CheckVCollision(0))
        check = true;

    return check;
};

//fisso il pezzo alla matrice
Stage.prototype.FixPezzo = function() {
    delete this.Pezzo;
    this.Pezzo = new Piece(this.getNextPezzoIndex());
    this.CheckRigheFatte();
    this.switched = 0;
    for (i = 0; i < 10; i ++) {
        if (this.matrix[i][0] != 0) {
                this.playing = 2;
        }
    }
    this.DrawPezzo();
    this.DrawNexts();
    this.DrawScore();
};

/**
 * Disegno il riassunto dei punteggi
 */
Stage.prototype.DrawScore = function() {


    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect (200,205,50,110);

    this.context.font = "10pt Calibri";
    this.context.fillStyle = "#000000";
    this.context.fillText(this.punteggio, 200, 244);
    this.context.fillText(this.righe, 200, 264);
    this.context.fillText(this.righeToNextLevel, 200, 284);
    this.context.fillText(this.livello, 200, 304);
};

//muovo oriz
Stage.prototype.MoveX = function(x) {

    this.DrawPezzo(1);
    if (this.CheckHCollision(x)) {
        this.Pezzo.x += x;                        
    }
    this.DrawPezzo();
    this.OnTick();                
};

//vertical movement
Stage.prototype.MoveY = function(y) {

    this.DrawPezzo(1);
    if (this.CheckVCollision(y) ) {                        
            this.Pezzo.y += y;    
            this.DrawPezzo();
    } else {
            this.DrawPezzo();
            this.FixPezzo();
    }

    this.OnTick();                
};

//Drop the floating piece
Stage.prototype.Drop = function() {

    righe = 0;
    this.DrawPezzo(1);
    while (this.CheckVCollision(1) ) {
            this.Pezzo.y++;                
            righe ++;
    }
    this.DrawPezzo();
    this.punteggio += (righe * 2 * this.livello);//1 riga
    this.FixPezzo();
    
    this.OnTick();                
};

//ruoto il pezzo, carico il prossimo frame
Stage.prototype.Rotate = function() {

    this.DrawPezzo(1);
    backupFrame = this.Pezzo.frameSelezionato;
    this.Pezzo.nextFrame();
    if (!this.CheckRollingCollision()) {
        this.Pezzo.frameSelezionato = backupFrame;
    }
    this.DrawPezzo();
    this.OnTick();                
};

Stage.prototype.MoveDown = function () {
    if (this.playing == 1)
        this.MoveY(1);
};

Stage.prototype.MoveLeft = function () {
    this.MoveX(-1);
};

Stage.prototype.MoveRight = function () {
    this.MoveX(1);
};

Stage.prototype.Hold = function () {
    
    if (this.switched == 0) {
        tempIndex = this.Pezzo.index;
        this.DrawPezzo(true);
        delete this.Pezzo;
        if (this.hold != 0) {
            this.Pezzo = new Piece(this.hold);
        } else {            
            this.Pezzo = new Piece(this.getNextPezzoIndex());
            this.DrawNexts();
        }
        this.switched = 1;
        this.hold = tempIndex;
        this.DrawHold();
        this.DrawPezzo();
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
                    this.righe ++;			
            }

            //ci sono righe, butta i punti
            if (numRighe==1) this.punteggio += (100 * this.livello);//1 riga
            if (numRighe==2) this.punteggio += (300 * this.livello);//2 righe 
            if (numRighe==3) this.punteggio += (500 * this.livello);//3 righe 
            if (numRighe==4) this.punteggio += (800 * this.livello);//4 righe 

            this.livello = Math.floor(this.righe / 10) + 1;
            this.righeToNextLevel = this.livello * 10 - this.righe;

    }


};

//metto il pezzo dentro la matrice
Stage.prototype.DrawPezzo = function (clear) {

    p = this.Pezzo;
    frames = p.frame;
    if (clear == 1) s = 0;
       else s = p.sprite;
    frameSelezionato = p.frameSelezionato;
    for (i = 0; i < 4; i++) {                   

        x = frames[frameSelezionato][i][0] + p.x; 
        y = frames[frameSelezionato][i][1] + p.y;
        if (x >= 0 && y >= 0) {
            this.matrix[x][y] = s;
        }
    }
};

//ad ogni tick esegui questo
Stage.prototype.OnTick = function () {

    if (this.paused == 0) {

        if (this.playing == 1) {
            this.DrawMatrix();
        } else if (this.playing == 2) {
            this.DrawMatrix(1);
            this.context.font = "40pt Calibri";
            this.context.fillText("Game", 18, 100);
            this.context.fillText("Over", 30, 150);
            this.context.font = "15pt Calibri";
            this.context.fillText("Score: " + this.punteggio, 15, 190);
            this.context.fillText("Row:" + this.righe, 15, 220);
            this.context.fillText("Level:" + this.livello, 15, 250);
            this.context.font = "10pt Calibri";
            this.context.fillText("Space to start a new game", 8, 295);
        }
    }
};

Stage.prototype.OnTimer = function() {

    if (this.paused == 0) {
        this.MoveDown();
    }

    var Time = 1050 - (this.livello * 100);
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
        this.nextPezzi = new Array(this.getNextRandomIndex(),this.getNextRandomIndex(),this.getNextRandomIndex(),this.getNextRandomIndex(),this.getNextRandomIndex());

        this.playing = 1;
        this.switched = 0;
        this.hold = 0;
        this.punteggio = 0;
        this.righe = 0;
        this.livello = 1;
        this.Pezzo = new Piece(this.getNextPezzoIndex());
        this.DrawPezzo();
        this.DrawNexts();
        this.DrawScore();
        this.DrawHold();
        this.OnTick();   
        
        //timer
        setTimeout ( "stage.OnTimer()", 1000 );
        
    }

};

