
var menuLayer = cc.Layer.extend({
    sprite:null,
    menubg:null,

    ctor:function () {

        this._super();

        this.menubg = new cc.Sprite(res.menubg_png);
        this.menubg.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.menubg);

        // cc.audioEngine.playMusic(res.v5_mp3,true);

        var item1 = new cc.MenuItemFont("2 Player",this.item1,this);
        item1.attr({x:0,y:-180});
        item1.setFontSize(49);

        // var item2 =new cc.MenuItemFont('1 Player',this.item2,this);
        // item2.attr({x:0,y:-100});
        // item2.setFontSize(49);

        var menu = new cc.Menu(item1);
        this.addChild(menu);




        return true;
    },
    item1:function(){
        cc.director.pushScene(new item1Scene());

    },
    // item2:function(){
    //     cc.director.pushScene(new item2Scene());
    //
    // },

});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        this.addChild(layer);
    }
});

