/*
   @author Marco Baldini
   @license GNU General Public License, version 2 (GPLv2)
 */


function loadImages(sources, callback){
                var images = {};
                var loadedImages = 0;
                var numImages = 0;
                
                // get num of sources
                for (var src in sources) {
                    numImages++;
                }
                
                for (var src in sources) {
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

    var unicode=e.keyCode? e.keyCode : e.charCode;
    
    switch (unicode) {
        case 32://space: 32 
            stage.StartGame();
        break;
        case 38://freccia su: 38 
            stage.Rotate();
        break;
        case 40://freccia giu: 40
            stage.MoveDown();
        break;
        case 37: //freccia sx: 37
            stage.MoveSx();
        break; 
        case 39://freccia dx: 39
            stage.MoveDx();
        break;
        case 17: //crtl : 17
            stage.Hold();
        break;
        case 96://0 ins : 96
            stage.Drop();
        break;                    
    }

}
