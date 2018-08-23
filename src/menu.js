
var menuLayer = cc.Layer.extend({
    sprite:null,
    menubg:null,
    giraffebg:null,
    pandabg:null,
    giraffepleyer1:null,
    i:1,
    dx : 1,
    dxx : 1,


    ctor:function () {

        this._super();

        this.menubg = new cc.Sprite(res.menubg_png);
        this.menubg.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.menubg);

        this.giraffepleyer1 = new cc.Sprite(res.giraffebg_png);
        this.giraffepleyer1.attr({
            x:620,y:220,
            rotation: 0,
        });
        this.addChild(this.giraffepleyer1,0,'giraffepleyer1');


        this.giraffebg = new cc.Sprite(res.giraffebg_png);
        this.giraffebg.attr({
            x:620,y:140,
            rotation: 0,
        });
        this.addChild(this.giraffebg,0,'giraffebg');

        this.pandabg = new cc.Sprite(res.pandabg_png);
        this.pandabg.attr({
            x:668,y:138,
            rotation: 0,
        });
        this.addChild(this.pandabg,0,'pandabg');
        cc.audioEngine.playMusic(res.v5_mp3,true);

        this.initMenu(this);
        this.scheduleUpdate();  // update()


        return true;
    },

    initMenu: function () {
        var item1 = new cc.MenuItemFont("2 Player",this.item1,this);
        item1.attr({x:0,y:-180});
        item1.fontSize=49;

        var item2 =new cc.MenuItemFont('1 Player',this.item2,this);
        item2.attr({x:0,y:-100});
        item2.fontSize=49;

        var menu = new cc.Menu(item1,item2);
        this.addChild(menu);
    },
    item1:function(){
        cc.director.pushScene(new item1Scene());

    },
    item2:function(){
        cc.director.pushScene(new item2Scene());

    },
    update: function(){
        var giraffebg = this.getChildByName("giraffebg");
            giraffebg.rotation += this.dx;
        if (giraffebg.rotation === 20 ){
            this.dx *= -1;
        }
        if(giraffebg.rotation === -20 ){
            this.dx *= -1;
        }
        var pandabg = this.getChildByName("pandabg");
        pandabg.rotation += this.dxx;
        if (pandabg.rotation === 20 ){
            this.dxx *= -1;
        }
        if(pandabg.rotation === -20 ){
            this.dxx *= -1;
        }

        var giraffepleyer1 = this.getChildByName("giraffepleyer1");
        giraffepleyer1.rotation += this.i;
        if (giraffepleyer1.rotation === 20 ){
            this.i *= -1;
        }
        if(giraffepleyer1.rotation === -20 ){
            this.i *= -1;
        }
    }

});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        this.addChild(layer);
    }
});

