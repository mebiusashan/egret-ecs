//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(gamecontext, name) {
        var _this = _super.call(this) || this;
        _this.gamecontext = null;
        _this.gamecontext = gamecontext;
        _this.name = name;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    GameScene.prototype.onAddToStage = function (event) {
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
        console.log('enterScene = ' + this.name);
        this.enterScene();
    };
    GameScene.prototype.onRemovedFromStage = function (event) {
        egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
        console.log('exitScene = ' + this.name);
        this.exitScene();
    };
    GameScene.prototype.onEnterFrame = function (advancedTime) {
        var ctx = this.gamecontext;
        //debug
        if (advancedTime > 1000 / 30) {
            advancedTime = 1000 / 30;
        }
        ctx.dtMs = advancedTime;
        ctx.dtSec = advancedTime / 1000;
        this.updateScene();
    };
    GameScene.prototype.enterScene = function () {
    };
    GameScene.prototype.exitScene = function () {
    };
    GameScene.prototype.updateScene = function () {
    };
    GameScene.prototype.registerLayer = function (layerOrder, name) {
        var layer = new egret.DisplayObjectContainer();
        this.addChild(layer);
        layer.name = name;
        this.setChildIndex(layer, layerOrder);
        return layer;
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
