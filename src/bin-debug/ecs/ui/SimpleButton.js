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
 * 简单按钮
 */
var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton(upSkin, downSkin) {
        var _this = _super.call(this) || this;
        _this._upSkin = RES.getRes(upSkin);
        _this._downSkin = RES.getRes(downSkin);
        _this.texture = _this._upSkin;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.down, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.up, _this);
        return _this;
    }
    SimpleButton.prototype.up = function (e) {
        this.texture = this._upSkin;
    };
    SimpleButton.prototype.down = function (e) {
        this.texture = this._downSkin;
    };
    SimpleButton.prototype.destroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.up, this);
        this._upSkin = null;
        this._downSkin = null;
    };
    return SimpleButton;
}(egret.Bitmap));
__reflect(SimpleButton.prototype, "SimpleButton");
