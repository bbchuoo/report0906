var item1Layer = cc.Layer.extend({
    sprite:null,
    repeat:null,
    repeatRect:null,
    itembg:null,
    imgrect:new Array(9),
    px:null,
    py:null,
    img1:null,
    img2:null,
    isClick:new Array(9),
    turn:0,
    gameOver:false,
    giraffewin:null,
    pandawin:null,
    array:['','','','','','','','',''],

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
        this.itembg = new cc.Sprite(res.itembg_jpg);
        this.itembg.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.itembg);


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

        //giraffewin

        this.giraffewin = new cc.Sprite(res.giraffewin_png);
        this.giraffewin.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.giraffewin);
        this.giraffewin.setVisible(false);
        this.giraffewin.zIndex=9999;

        //pandawin

        this.pandawin = new cc.Sprite(res.pandawin_png);
        this.pandawin.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.pandawin);
        this.pandawin.setVisible(false);
        this.pandawin.zIndex=9999;

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




                        if (!layer.gameOver) {


                            if (layer.isClick[i] == false) {
                                //判斷是否重複點到
                                playRound(layer.imgrect[i], layer);
                                layer.isClick[i] = true;

                                if (layer.turn === 0 && layer.array[i]==='') {
                                    layer.array[i]='X';
                                    cc.log('這時候是熊貓'+layer.array)
                                }
                                else if(layer.turn === 1&&layer.array[i]===''){
                                    layer.array[i]='O';
                                    cc.log('這時候是長頸鹿'+layer.array)
                                }
                                if((layer.array[0]==='O'&&layer.array[1]==='O'&&layer.array[2]==='O')
                                    ||(layer.array[3]==='O'&&layer.array[4]==='O'&&layer.array[5]==='O')
                                    ||(layer.array[6]==='O'&&layer.array[7]==='O'&&layer.array[8]==='O')
                                    ||(layer.array[0]==='O'&&layer.array[4]==='O'&&layer.array[8]==='O')
                                    ||(layer.array[2]==='O'&&layer.array[4]==='O'&&layer.array[6]==='O')
                                    ||(layer.array[0]==='O'&&layer.array[3]==='O'&&layer.array[6]==='O')
                                    ||(layer.array[1]==='O'&&layer.array[4]==='O'&&layer.array[7]==='O')
                                    ||(layer.array[2]==='O'&&layer.array[5]==='O'&&layer.array[8]==='O')
                                ){
                                    alert("長頸鹿贏了");
                                    layer.giraffewin.setVisible(true);
                                    layer.gameOver=true;
                                }
                                else if((layer.array[0]==='X'&&layer.array[1]==='X'&&layer.array[2]==='X')
                                    ||(layer.array[3]==='X'&&layer.array[4]==='X'&&layer.array[5]==='X')
                                    ||(layer.array[6]==='X'&&layer.array[7]==='X'&&layer.array[8]==='X')
                                    ||(layer.array[0]==='X'&&layer.array[4]==='X'&&layer.array[8]==='X')
                                    ||(layer.array[2]==='X'&&layer.array[4]==='X'&&layer.array[6]==='X')
                                    ||(layer.array[0]==='X'&&layer.array[3]==='X'&&layer.array[6]==='X')
                                    ||(layer.array[1]==='X'&&layer.array[4]==='X'&&layer.array[7]==='X')
                                    ||(layer.array[2]==='X'&&layer.array[5]==='X'&&layer.array[8]==='X')
                                ){
                                    alert("熊貓贏了");
                                    layer.pandawin.setVisible(true);
                                    layer.gameOver=true;
                                }

                            }
                            else{
                                alert("這格被點過了");
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
        layer.giraffewin.setVisible(false);
        layer.pandawin.setVisible(false);
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

var item1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new item1Layer();
        this.addChild(layer);
    }
});


function playRound(objDest,layer){
    if(layer.turn==0){
        layer.img1 = new cc.Sprite(res.giraffe_png);
        layer.img1.x = objDest.x + objDest.width / 2;
        layer.img1.y = objDest.y + objDest.height / 2;
        layer.addChild(layer.img1);
        layer.turn=1;
        cc.log("換長頸鹿")

    }

    else if(layer.turn==1) {
        layer.img2 = new cc.Sprite(res.panda_png);
        layer.img2.x = objDest.x + objDest.width / 2;
        layer.img2.x = objDest.x + objDest.width / 2;
        layer.img2.y = objDest.y + objDest.height / 2;
        layer.addChild(layer.img2);
        layer.turn = 0;
        cc.log("換熊貓")

    }


}

