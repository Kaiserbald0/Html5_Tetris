/*
    @author Kaiserbaldo - kaiserbaldo@gmail.com
    @license GNU General Public License, version 2 (GPLv2)
 */


function loadImages(sources, callback){
                var images = {};
                var loadedImages = 0;
                var numImages = 0;
                var src;

                // get num of sources
                for (src in sources) {
                    numImages++;
                }
                
                for (src in sources) {
                    images[src] = new Image();
                    images[src].onload = function(){
                        if (++loadedImages >= numImages) {
                            callback(images);
                        }
                    };
                    images[src].src = sources[src];
                }
            }
            
shuffle = function(v){
            for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
            return v;
};

function keyPressed(e) {

    var unicode=e.code;
    //alert(unicode);

    if ((unicode == stage.StartGameKey)&&(stage.playing !=1)) {
        stage.StartGame();
    } else if ((unicode == stage.RotateKey)&&(stage.playing ==1)) {
        stage.Rotate();
    } else if ((unicode == stage.DownKey)&&(stage.playing ==1)) {
        stage.MoveDown();
    } else if ((unicode == stage.LeftKey)&&(stage.playing ==1)) {
        stage.MoveLeft();
    } else if ((unicode == stage.RightKey)&&(stage.playing ==1)) {
        stage.MoveRight();
    } else if ((unicode == stage.HoldKey)&&(stage.playing ==1)) {
        stage.Hold();
    } else if ((unicode == stage.DropKey)&&(stage.playing ==1)) {
        stage.Drop();
    } else if ((unicode == stage.PauseKey)&&( stage.playing ==1 || stage.paused==1 )) {
        stage.Pause();
    }

}

function saveKey() {

    stage.SaveKey(function(){
        alert("Configuration Saved!");
    });
}

function preSaveKey(e) {

    var unicode=e.code;
    //$(this).value

    switch ($(this).id) {

        case 'left_key':
            stage.TempLeftKey = unicode;
        break;
        case 'rotate_key':
            stage.TempRotateKey = unicode;
            break;
        case 'right_key':
            stage.TempRightKey = unicode;
        break;
        case 'hold_key':
            stage.TempHoldKey = unicode;
        break;
        case 'drop_key':
            stage.TemDropKey = unicode;
        break;
        case 'down_key':
            stage.TempDownKey = unicode;
        break;
    }


}

function setupDom() {

    if (typeof(Storage) === "undefined") {
        alert("No web storage support, please use a proper browser");
    } else {

        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");


        var sources = {
            azzurro:"assets/azzurro.bmp",
            blu:"assets/blu.bmp",
            giallo:"assets/giallo.bmp",
            blu:"assets/blu.bmp",
            nero:"assets/nero.bmp",
            rosso:"assets/rosso.bmp",
            nero:"assets/nero.bmp",
            arancione:"assets/arancione.bmp",
            viola:"assets/viola.bmp",
            verde:"assets/verde.bmp",
            trasp:"assets/trasp.bmp",
            white:"assets/white.bmp",

            nextI:"assets/i.bmp",
            nextI1:"assets/i1.bmp",
            nextI2:"assets/i2.bmp",

            nextL:"assets/l.bmp",
            nextL1:"assets/l1.bmp",
            nextL2:"assets/l2.bmp",

            nextLO:"assets/lo.bmp",
            nextLO1:"assets/lo1.bmp",
            nextLO2:"assets/lo2.bmp",

            nextO:"assets/o.bmp",
            nextO1:"assets/o1.bmp",
            nextO2:"assets/o2.bmp",

            nextS:"assets/s.bmp",
            nextS1:"assets/s1.bmp",
            nextS2:"assets/s2.bmp",

            nextT:"assets/t.bmp",
            nextT1:"assets/t1.bmp",
            nextT2:"assets/t2.bmp",

            nextZ:"assets/z.bmp",
            nextZ1:"assets/z1.bmp",
            nextZ2:"assets/z2.bmp"
        };

        var borderColor = "#ff0000";
        var borderWidth = 10;
        var xOffset = 5;


        context.lineWidth = borderWidth;
        context.strokeStyle = borderColor;
        //Bordo sinistro
        context.moveTo(0 + xOffset, 0);
        context.lineTo(0 + xOffset, 305);
        context.stroke();

        //Bordo basso
        context.moveTo(0 + xOffset, 300);
        context.lineTo(150 + xOffset, 300);
        context.stroke();

        //Bordo destro
        context.moveTo(150 + xOffset, 305);
        context.lineTo(150 + xOffset, 0);
        context.stroke();

        //Casella hold
        context.lineWidth = 6;
        context.strokeStyle = borderColor;
        context.moveTo(156, 50);
        context.lineTo(199, 50);
        context.stroke();
        context.moveTo(196, 50);
        context.lineTo(196, 0);
        context.stroke();
        context.moveTo(196, 3);
        context.lineTo(156, 3);
        context.stroke();
        context.font = "12pt Calibri";
        context.fillText("Hold", 213, 30);

        //Casella next
        context.lineWidth = 6;
        context.strokeStyle = borderColor;
        context.moveTo(160, 50);
        context.lineTo(215, 50);
        context.stroke();
        context.moveTo(213, 47);
        context.lineTo(213, 113);
        context.stroke();
        context.moveTo(216, 116);
        context.lineTo(160, 116);
        context.stroke();
        context.font = "12pt Calibri";
        context.fillText("Next", 220, 57);

        context.font = "10pt Calibri";
        context.fillText("Score:", 165, 244);
        context.fillText("Lines:", 165, 264);
        context.fillText("LtNL:", 165, 284);
        context.fillText("Level:", 165, 304);


        loadImages(sources, function (assets) {
            stage = new Stage(assets);
            document.getElementById("preloader").style.display = "none";
            document.getElementById("myCanvas").style.display = "block";
            $('body').addEvent('keydown', keyPressed);
            $('submit').addEvent('click', saveKey);
            $$('.key_selector').addEvent('keyup', preSaveKey);
        });


    }



}