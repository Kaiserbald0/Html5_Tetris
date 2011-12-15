function Pezzo(index){
    this.x = 0;
    this.y = 0;
    this.frameSelezionato = 0;
    this.getNew(index);
    this.index;
};

Pezzo.prototype.getNew = function(index) {                   

        this.x = 4;
        //index = 6;
        this.index = index;
        switch (index) {

                case 1://quadrato - ok
                    this.numeroFrame = 1;
                    this.sprite = 5;
                    this.sprite = 1;
                    this.frame = new Array(
                        new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(1,-1),
                            new Array(1,0)
                        )
                    );                                             
                break;

                case 2://lungo
                    this.numeroFrame = 4;
                    this.sprite = 4;
                    this.sprite = 2;
                    this.frame = new Array(
                        new Array(
                            new Array(2,0),
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0)
                        ),
                        new Array(
                            new Array(1,-1),
                            new Array(1,0),
                            new Array(1,1),
                            new Array(1,2)
                        ),
                        new Array(
                            new Array(2,1),
                            new Array(-1,1),
                            new Array(0,1),
                            new Array(1,1)
                        ), 
                        new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(0,1),
                            new Array(0,2)
                        )    
                    );                                
                break;

                case 3://S
                    this.numeroFrame = 4;
                    this.sprite = 7;
                    this.sprite = 3;
                    this.frame = new Array(
                        new Array(
                            new Array(1,-1),
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(-1,0)
                        ),
                        new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(1,0),
                            new Array(1,1)
                        ),
                        new Array(
                            new Array(1,-1),
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(-1,0)
                        ),
                        new Array(
                            new Array(-1,-1),
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(0,1)
                        )    
                    );
                break;

                case 4://Z
                    this.sprite = 2;
                    this.sprite = 4;
                    this.numeroFrame = 2;
                    this.frame = new Array(
                        new Array(
                            new Array(-1,-1),
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(1,0)
                        ),
                        new Array(
                            new Array(0,0),
                            new Array(1,0),
                            new Array(0,1),
                            new Array(1,-1)
                        ),
                        new Array(
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(0,1),
                            new Array(1,1)
                        ),
                        new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(-1,0),
                            new Array(-1,1)
                        )
                    );
                break;

                case 5://L
                    this.numeroFrame = 4;
                    this.sprite = 3;
                    this.sprite = 5;
                    this.frame = new Array(
                        new Array(
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0),
                            new Array(1,-1)
                        ),
                        new Array(
                            new Array(-1,-1),
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(0,1)
                        ),
                        new Array(
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0),
                            new Array(-1,1)
                        ),
                        new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(0,1),
                            new Array(1,1)
                        ) 
                    );                                
                break;

                case 6://J
                    this.sprite = 1;
                    this.sprite = 6;
                    this.numeroFrame = 4;
                    this.frame = new Array(
                        new Array(
                            new Array(-1,-1),
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0)
                        ),
                        new Array(
                            new Array(0,-1),
                            new Array(-1,-1),
                            new Array(-1,0),
                            new Array(-1,1)
                        ),
                        new Array(
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0),
                            new Array(1,1)
                        ) ,
                        new Array(
                            new Array(1,-1),
                            new Array(1,0),
                            new Array(1,1),
                            new Array(0,1)
                        )
                    );
                break;

                case 7://T
                    this.sprite = 6;
                    this.sprite = 7;
                    this.numeroFrame = 4;
                    this.frame = new Array(
                        new Array(
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0),
                            new Array(0,-1)
                        ),

                        new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(0,1),
                            new Array(-1,0)
                        ),
                        new Array(
                            new Array(-1,0),
                            new Array(0,0),
                            new Array(1,0),
                            new Array(0,1)
                        ), 
                            new Array(
                            new Array(0,-1),
                            new Array(0,0),
                            new Array(0,1),
                            new Array(1,0)
                        )
                    );
                break;
        }
}

Pezzo.prototype.nextFrame = function() {

    if ((this.frameSelezionato + 1) < this.numeroFrame)
        this.frameSelezionato ++
    else 
        this.frameSelezionato = 0
}