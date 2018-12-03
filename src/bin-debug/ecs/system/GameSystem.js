//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 单一游戏系统
 */
var GameSystem = (function () {
    function GameSystem(ecscontext, gameContext) {
        this.ecscontext = null;
        this.gamecontext = null;
        this.ecscontext = ecscontext;
        this.gamecontext = gameContext;
    }
    return GameSystem;
}());
__reflect(GameSystem.prototype, "GameSystem");
