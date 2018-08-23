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
    initgame:null,
    isClick:new Array(9),
    turn:0,
    gameOver:false,
    giraffe:null,
    giraffe1:null,
    giraffe2:null,
    giraffe3:null,
    giraffe4:null,
    giraffe5:null,
    giraffe6:null,
    giraffe7:null,
    giraffe8:null,
    panda:null,
    panda1:null,
    panda2:null,
    panda3:null,
    panda4:null,
    panda5:null,
    panda6:null,
    panda7:null,
    panda8:null,
    giraffewin:null,
    pandawin:null,

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



                        if (layer.turn == 0) {

                            switch (i) {
                                case 0 :
                                    if(layer.panda===0){
                                        layer.giraffe = null;
                                    }
                                    else{
                                        layer.giraffe = 0;
                                    }
                                    break;
                                case 1 :
                                    if(layer.panda1===1){
                                        layer.giraffe1 = null;
                                    }
                                    else{
                                        layer.giraffe1 = 1;
                                    }
                                    break;
                                case 2 :
                                    if(layer.panda2===2){
                                        layer.giraffe2 = null;
                                    }
                                    else{
                                        layer.giraffe2 = 2;
                                    }
                                    break;
                                case 3 :
                                    if(layer.panda3===3){
                                        layer.giraffe3 = null;
                                    }
                                    else{
                                        layer.giraffe3 = 3;
                                    }
                                    break;
                                case 4 :
                                    if(layer.panda4===4){
                                        layer.giraffe4 = null;
                                    }
                                    else{
                                        layer.giraffe4 = 4;
                                    }
                                    break;
                                case 5 :
                                    if(layer.panda5===5){
                                        layer.giraffe5 = null;
                                    }
                                    else{
                                        layer.giraffe5 = 5;
                                    }
                                    break;
                                case 6 :
                                    if(layer.panda6===6){
                                        layer.giraffe6 = null;
                                    }
                                    else{
                                        layer.giraffe6 = 6;
                                    }
                                    break;
                                case 7 :
                                    if(layer.panda7===7){
                                        layer.giraffe7 = null;
                                    }
                                    else{
                                        layer.giraffe7 = 7;

                                    }
                                    break;
                                case 8 :
                                    if(layer.panda8===8){
                                        layer.giraffe8 = null;
                                    }
                                    else{
                                        layer.giraffe8 = 8;
                                    }
                                    break;

                            }
                        }
                        if (layer.turn == 1) {
                            switch (i) {
                                case 0 :
                                    if(layer.giraffe===0){
                                        layer.panda = null;
                                    }
                                    else{
                                        layer.panda = 0;
                                    }
                                    break;
                                case 1 :
                                    if(layer.giraffe1===1){
                                        layer.panda1 = null;
                                    }
                                    else{
                                        layer.panda1 = 1;
                                    }
                                    break;
                                case 2 :
                                    if(layer.giraffe2===2){
                                        layer.panda2 = null;
                                    }
                                    else{
                                        layer.panda2 = 2;
                                    }
                                    break;
                                case 3 :
                                    if(layer.giraffe3===3){
                                        layer.panda3 = null;
                                    }
                                    else{
                                        layer.panda3 = 3;
                                    }
                                    break;
                                case 4 :
                                    if(layer.giraffe4===4){
                                        layer.panda4 = null;
                                    }
                                    else{
                                        layer.panda4 = 4;
                                    }
                                    break;
                                case 5 :
                                    if(layer.giraffe5===5){
                                        layer.panda5 = null;
                                    }
                                    else{
                                        layer.panda5 = 5;
                                    }
                                    break;
                                case 6 :
                                    if(layer.giraffe6===6){
                                        layer.panda6 = null;
                                    }
                                    else{
                                        layer.panda6 = 6;
                                    }
                                    break;
                                case 7 :
                                    if(layer.giraffe7===7){
                                        layer.panda7 = null;
                                    }
                                    else{
                                        layer.panda7 = 7;
                                    }

                                    break;
                                case 8 :
                                    if(layer.giraffe8===8){
                                        layer.panda8 = null;
                                    }
                                    else {
                                        layer.panda8 = 8;

                                    }

                                    break;


                            }

                        }


                        if (!layer.gameOver) {


                            if (layer.isClick[i] == false) {
                                //判斷是否重複點到
                                playRound(layer.imgrect[i], layer);
                                layer.isClick[i] = true;


                                    //長頸鹿判斷

                                    if (layer.giraffe === 0 && layer.giraffe1 === 1
                                        && layer.giraffe2 === 2) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }



                                if (layer.giraffe3===3&&layer.giraffe4===4&&layer.giraffe5===5) {
                                    alert("giraffe贏了");
                                    layer.gameOver = true;
                                    layer.deuceCheck=false;
                                    layer.giraffewin.setVisible(true);
                                }
                                    if (layer.giraffe6 === 6 && layer.giraffe7 === 7
                                        && layer.giraffe8 === 8
                                    ) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }

                                    //斜對角
                                    if (layer.giraffe === 0 && layer.giraffe4 === 4
                                        && layer.giraffe8 === 8
                                    ) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }
                                    if (layer.giraffe2 === 2 && layer.giraffe4 === 4
                                        && layer.giraffe6 === 6
                                    ) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }
                                    //直條
                                    if (layer.giraffe === 0 && layer.giraffe3 === 3
                                        && layer.giraffe6 === 6
                                    ) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }

                                    if (layer.giraffe1 === 1 && layer.giraffe4 === 4
                                        && layer.giraffe7 === 7
                                    ) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }

                                    if (layer.giraffe2 === 2 && layer.giraffe5 === 5
                                        && layer.giraffe8 === 8
                                    ) {
                                        alert("giraffe贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.giraffewin.setVisible(true);
                                    }
                                    // -------------------熊貓判斷---------------------

                                    if (layer.panda === 0 && layer.panda1 === 1
                                        && layer.panda2 === 2
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }
                                    if (layer.panda3 === 3 && layer.panda4 === 4
                                        && layer.panda5 === 5
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }
                                    if (layer.panda6 === 6 && layer.panda7 === 7
                                        && layer.panda8 === 8
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }


                                    //斜對角

                                    if (layer.panda === 0 && layer.panda4 === 4
                                        && layer.panda8 === 8
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }
                                    if (layer.panda2 === 2 && layer.panda4 === 4
                                        && layer.panda6 === 6
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }

                                    //直條

                                    if (layer.panda === 0 && layer.panda3 === 3
                                        && layer.panda6 === 6
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }
                                    if (layer.panda1 === 1 && layer.panda4 === 4
                                        && layer.panda7 === 7
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);
                                    }
                                    if (layer.panda2 === 2 && layer.panda5 === 5
                                        && layer.panda8 === 8
                                    ) {
                                        alert("panda贏了");
                                        layer.gameOver = true;
                                        layer.deuceCheck=false;
                                        layer.pandawin.setVisible(true);

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
        layer.giraffe=null;
        layer.giraffe1=null;
        layer.giraffe2=null;
        layer.giraffe3=null;
        layer.giraffe4=null;
        layer.giraffe5=null;
        layer.giraffe6=null;
        layer.giraffe7=null;
        layer.giraffe8=null;
        layer.panda=null;
        layer.panda1=null;
        layer.panda2=null;
        layer.panda3=null;
        layer.panda4=null;
        layer.panda5=null;
        layer.panda6=null;
        layer.panda7=null;
        layer.panda8=null;
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
        layer.img2.y = objDest.y + objDest.height / 2;
        layer.addChild(layer.img2);
        layer.turn = 0;
        cc.log("換熊貓")

    }


}

