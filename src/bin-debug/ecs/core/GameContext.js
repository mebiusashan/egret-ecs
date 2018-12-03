//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏核心上下文
 */
var GameContext = (function () {
    function GameContext() {
        this.dtMs = 0;
        this.dtSec = 0;
    }
    return GameContext;
}());
__reflect(GameContext.prototype, "GameContext");
