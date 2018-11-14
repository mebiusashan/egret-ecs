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
var __ecscontext__ = null;
/**
 * 框架入口
 */
var ECSApp = (function (_super) {
    __extends(ECSApp, _super);
    function ECSApp() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ECSApp.prototype.onAddToStage = function (event) {
        this.initialize();
    };
    ECSApp.prototype.initialize = function () {
    };
    return ECSApp;
}(egret.DisplayObjectContainer));
__reflect(ECSApp.prototype, "ECSApp");
