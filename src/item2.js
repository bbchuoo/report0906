var item2Layer = cc.Layer.extend({
    sprite:null,
    repeat:null,
    repeatRect:null,
    itembg1player:null,
    imgrect:new Array(9),
    px:null,
    py:null,
    img1:null,
    img2:null,
    isClick:new Array(9),
    turn:0,
    gameOver:false,
    array:['','','','','','','','',''],
    lose:null,
    win:null,



    ctor:function () {

        this._super();


        this.drawSegment(this);
        this.setUpMouse(this);
        this.setImg(this);
        this.resetGame(this);


        return true;
    },
    drawSegment(layer){

        //背景圖片
        this.itembg1player = new cc.Sprite(res.itembg1player_jpg);
        this.itembg1player.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.itembg1player);



        //使用DrawNode(繪製結點)來繪製圖形
        var stick1 = new cc.DrawNode();
        //drawSegment(繪製段)繪製線(從哪,到哪,半徑,顏色)
        stick1.drawSegment(
            cc.p(cc.winSize.width *1/5,cc.winSize.height *3/5),
            cc.p(cc.winSize.width *4/5,cc.winSize.height *3/5),
            4,
            cc.color(255,255,255)
        );
        this.addChild(stick1);

        var stick2 = new cc.DrawNode();
        stick2.drawSegment(
            cc.p(cc.winSize.width *1/5,cc.winSize.height *2/5),
            cc.p(cc.winSize.width *4/5,cc.winSize.height *2/5),
            4,
            cc.color(255,255,255)
        );
        this.addChild(stick2);

        var stick3 = new cc.DrawNode();
        stick3.drawSegment(
            cc.p(cc.winSize.width *2/5,cc.winSize.height *4/5),
            cc.p(cc.winSize.width *2/5,cc.winSize.height *1/5),
            4,
            cc.color(255,255,255)
        );
        this.addChild(stick3);

        var stick4 = new cc.DrawNode();
        stick4.drawSegment(
            cc.p(cc.winSize.width *3/5,cc.winSize.height *4/5),
            cc.p(cc.winSize.width *3/5,cc.winSize.height *1/5),
            4,
            cc.color(255,255,255)
        );
        this.addChild(stick4);



        this.repeat = new cc.Sprite(res.repeat_png);
        this.repeat.attr({
            x: 750,
            y: 100
        });
        this.addChild(this.repeat);

        this.repeatRect = new cc.Rect(
            this.repeat.x - this.repeat.width/2,
            this.repeat.y - this.repeat.height/2,
            this.repeat.width,
            this.repeat.height,
        )
        var item = new cc.MenuItemImage(
            res.home_png,
            res.home_png,
            res.home_png,
            this.item, this
        );
        item.x = 350;
        item.y = 250;

        var menu =new cc.Menu(item);
        this.addChild(menu);

        //win

        this.win = new cc.Sprite(res.win_png);
        this.win.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.win);
        this.win.setVisible(false);
        this.win.zIndex=9999;

        //lose

        this.lose = new cc.Sprite(res.lose_png);
        this.lose.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.lose);
        this.lose.setVisible(false);
        this.lose.zIndex=9999;


    },
    item:function(){
        cc.director.pushScene(new menuScene());

    },
    setImg:function(layer){
        for(let i=0;i<this.imgrect.length;i++) {

            this.px = (i % 3) + 1;
            this.py = parseInt(i / 3);
            if (this.py === 0) {
                this.py += 3;
            }
            else if (this.py === 1) {
                this.py += 1;
            }
            else if (this.py === 2) {
                this.py -= 1;

            }
            this.imgrect[i] = new cc.Rect(
                cc.winSize.width * this.px / 5,
                cc.winSize.height * this.py / 5,
                180,
                130,
            );
            this.isClick[i] = false;

        }
    },
    setUpMouse:function(layer){



        cc.eventManager.addListener({
            event:cc.EventListener.MOUSE,
            onMouseDown:function(event) {
                var x = event.getLocationX();
                var y = event.getLocationY();
                var point = new cc.Point(x, y);

                if (cc.rectContainsPoint(layer.repeatRect, point)){

                    layer.resetGame(layer);
                }

                for (let i=0;i < layer.imgrect.length;i++) {

                    if (cc.rectContainsPoint(layer.imgrect[i], point)) {

                        if (layer.turn === 0&& layer.array[i]==='') {
                            layer.array[i]='O';
                            cc.log('這時候是長頸鹿'+layer.array)
                        }




                        if (!layer.gameOver) {

                            if (layer.isClick[i] === false) {
                                 playRound1(layer.imgrect[i], layer,layer.array[i]);
                                layer.isClick[i] = true;

                            }
                            else{
                                alert('點過了');
                                layer.isClick[i] = true;
                            }



                        }
                        else{
                            //贏了之後會進入gameOver=true;
                            //然後因為上面的判斷(!gameOver)就不符合了
                            // 轉跳到這裡顯示結束
                            alert("遊戲結束");
                        }


                    }


                }

            } // end of down

        },this);
    },
    resetGame(layer){
        layer.win.setVisible(false);
        layer.lose.setVisible(false);
        layer.removeChild(layer.img1);
        layer.removeChild(layer.img2);
        layer.removeChild(layer.repeat);
        layer.isClick=[];
        layer.isClick[0]=false;
        layer.isClick[1]=false;
        layer.isClick[2]=false;
        layer.isClick[3]=false;
        layer.isClick[4]=false;
        layer.isClick[5]=false;
        layer.isClick[6]=false;
        layer.isClick[7]=false;
        layer.isClick[8]=false;
        layer.img1=null;
        layer.img2=null;
        layer.turn=0;
        layer.gameOver=false;
        layer.array=['','','','','','','','',''];
        layer.drawSegment();
    },




});

var item2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new item2Layer();
        this.addChild(layer);
    }
});


function  playRound1(objDest,layer,array){
    if(layer.turn===0&&layer.gameOver===false){


        if((layer.array[0]==='O'&&layer.array[1]==='O'&&layer.array[2]==='O')
            ||(layer.array[3]==='O'&&layer.array[4]==='O'&&layer.array[5]==='O')
            ||(layer.array[6]==='O'&&layer.array[7]==='O'&&layer.array[8]==='O')
            ||(layer.array[0]==='O'&&layer.array[4]==='O'&&layer.array[8]==='O')
            ||(layer.array[2]==='O'&&layer.array[4]==='O'&&layer.array[6]==='O')
            ||(layer.array[0]==='O'&&layer.array[3]==='O'&&layer.array[6]==='O')
            ||(layer.array[1]==='O'&&layer.array[4]==='O'&&layer.array[7]==='O')
            ||(layer.array[2]==='O'&&layer.array[5]==='O'&&layer.array[8]==='O')
        ){
            alert("你贏了");
            layer.win.setVisible(true);
            layer.gameOver=true;
            cc.log(' layer.gameOver=true;')
        }

        layer.img1 = new cc.Sprite(res.giraffe_png);
        layer.img1.x = objDest.x + objDest.width / 2;
        layer.img1.y = objDest.y + objDest.height / 2;
        layer.addChild(layer.img1);
        layer.turn=1;
        cc.log("換長頸鹿");
    if(layer.turn===1&&layer.gameOver===false) {


        //平行
        if(layer.array[0]==='O'&&layer.array[1]==='O'&&layer.array[2]===''){
            layer.isClick[2] = true;
            layer.array[2]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[2].x + layer.imgrect[2].width / 2;
            layer.img2.y = layer.imgrect[2].y + layer.imgrect[2].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[1]==='O'&&layer.array[2]==='O'&&layer.array[0]===''){
            layer.isClick[0] = true;
            layer.array[0]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[0].x + layer.imgrect[0].width / 2;
            layer.img2.y = layer.imgrect[0].y + layer.imgrect[0].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[3]==='O'&&layer.array[4]==='O'&&layer.array[5]===''){
            layer.isClick[5] = true;
            layer.array[5]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[5].x + layer.imgrect[5].width / 2;
            layer.img2.y = layer.imgrect[5].y + layer.imgrect[5].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[4]==='O'&&layer.array[5]==='O'&&layer.array[3]===''){
            layer.isClick[3] = true;
            layer.array[3]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[3].x + layer.imgrect[3].width / 2;
            layer.img2.y = layer.imgrect[3].y + layer.imgrect[3].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
       else if(layer.array[6]==='O'&&layer.array[7]==='O'&&layer.array[8]===''){
            layer.isClick[8] = true;
            layer.array[8]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[8].x + layer.imgrect[8].width / 2;
            layer.img2.y = layer.imgrect[8].y + layer.imgrect[8].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[7]==='O'&&layer.array[8]==='O'&&layer.array[6]===''){
            layer.isClick[6] = true;
            layer.array[6]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[6].x + layer.imgrect[6].width / 2;
            layer.img2.y = layer.imgrect[6].y + layer.imgrect[6].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        //斜對角
        else if(layer.array[0]==='O'&&layer.array[4]==='O'&&layer.array[8]==='') {
            layer.isClick[8] = true;
            layer.array[8] = 'X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x = layer.imgrect[8].x + layer.imgrect[8].width / 2;
            layer.img2.y = layer.imgrect[8].y + layer.imgrect[8].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest, layer, array);
            layer.turn = 0;
        }

        else if(layer.array[8]==='O'&&layer.array[4]==='O'&&layer.array[0]===''){
                layer.isClick[0] = true;
                layer.array[0]='X';
                layer.img2 = new cc.Sprite(res.panda_png);
                layer.img2.x =layer.imgrect[0].x + layer.imgrect[0].width / 2;
                layer.img2.y = layer.imgrect[0].y + layer.imgrect[0].height / 2;
                layer.addChild(layer.img2);
                pandaCheck(objDest,layer,array);
                layer.turn = 0;

        }
        else if(layer.array[2]==='O'&&layer.array[4]==='O'&&layer.array[6]===''){
            layer.isClick[6] = true;
            layer.array[6]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[6].x + layer.imgrect[6].width / 2;
            layer.img2.y = layer.imgrect[6].y + layer.imgrect[6].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[6]==='O'&&layer.array[4]==='O'&&layer.array[2]===''){
            layer.isClick[2] = true;
            layer.array[2]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[2].x + layer.imgrect[2].width / 2;
            layer.img2.y = layer.imgrect[2].y + layer.imgrect[2].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        // //直的
        else if(layer.array[0]==='O'&&layer.array[3]==='O'&&layer.array[6]===''){
            layer.isClick[6] = true;
            layer.array[6]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[6].x + layer.imgrect[6].width / 2;
            layer.img2.y = layer.imgrect[6].y + layer.imgrect[6].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[6]==='O'&&layer.array[3]==='O'&&layer.array[0]===''){
            layer.isClick[0] = true;
            layer.array[0]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[0].x + layer.imgrect[0].width / 2;
            layer.img2.y = layer.imgrect[0].y + layer.imgrect[0].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[1]==='O'&&layer.array[4]==='O'&&layer.array[7]===''){
            layer.isClick[7] = true;
            layer.array[7]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[7].x + layer.imgrect[7].width / 2;
            layer.img2.y = layer.imgrect[7].y + layer.imgrect[7].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[4]==='O'&&layer.array[7]==='O'&&layer.array[1]===''){
            layer.isClick[1] = true;
            layer.array[1]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[1].x + layer.imgrect[1].width / 2;
            layer.img2.y = layer.imgrect[1].y + layer.imgrect[1].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[2]==='O'&&layer.array[5]==='O'&&layer.array[8]===''){
            layer.isClick[8] = true;
            layer.array[8]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[8].x + layer.imgrect[8].width / 2;
            layer.img2.y = layer.imgrect[8].y + layer.imgrect[8].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }
        else if(layer.array[5]==='O'&&layer.array[8]==='O'&&layer.array[2]===''){
            layer.isClick[2] = true;
            layer.array[2]='X';
            layer.img2 = new cc.Sprite(res.panda_png);
            layer.img2.x =layer.imgrect[2].x + layer.imgrect[2].width / 2;
            layer.img2.y = layer.imgrect[2].y + layer.imgrect[2].height / 2;
            layer.addChild(layer.img2);
            pandaCheck(objDest,layer,array);
            layer.turn = 0;

        }

        else{
            random(objDest,layer,array);
            layer.turn = 0;

        }







        }
    }




}
function random(objDest,layer,array){
    var randomnNumber = Math.floor(Math.random()*9);
    if(layer.array[randomnNumber]===''){
        layer.isClick[randomnNumber] = true;
        layer.array[randomnNumber]='X';
        layer.img2 = new cc.Sprite(res.panda_png);
        layer.img2.x =layer.imgrect[randomnNumber].x + layer.imgrect[randomnNumber].width / 2;
        layer.img2.y = layer.imgrect[randomnNumber].y + layer.imgrect[randomnNumber].height / 2;
        layer.addChild(layer.img2);
        pandaCheck(objDest,layer,array);
        layer.turn = 0;
    }
    else if(layer.array[0]!==''&&layer.array[1]!==''&&layer.array[2]!==''&&
        layer.array[3]!==''&&layer.array[4]!==''&&layer.array[5]!==''&&
        layer.array[6]!==''&&layer.array[7]!==''&&layer.array[8]!==''
    ){
        cc.log('...');
    }
    else{
        layer.turn = 1;
        random(objDest,layer,array);
    }



}
function pandaCheck(objDest,layer,array){
    if((layer.array[0]==='X'&&layer.array[1]==='X'&&layer.array[2]==='X')
        ||(layer.array[3]==='X'&&layer.array[4]==='X'&&layer.array[5]==='X')
        ||(layer.array[6]==='X'&&layer.array[7]==='X'&&layer.array[8]==='X')
        ||(layer.array[0]==='X'&&layer.array[4]==='X'&&layer.array[8]==='X')
        ||(layer.array[2]==='X'&&layer.array[4]==='X'&&layer.array[6]==='X')
        ||(layer.array[0]==='X'&&layer.array[3]==='X'&&layer.array[6]==='X')
        ||(layer.array[1]==='X'&&layer.array[4]==='X'&&layer.array[7]==='X')
        ||(layer.array[2]==='X'&&layer.array[5]==='X'&&layer.array[8]==='X')
    ){
        alert("你輸了");
        layer.lose.setVisible(true);
        layer.gameOver=true;
        cc.log(' layer.gameOver=true;')
    }
}
