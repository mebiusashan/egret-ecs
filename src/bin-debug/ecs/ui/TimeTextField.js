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
 * 时间显示文本
 */
var TimeTextField = (function (_super) {
    __extends(TimeTextField, _super);
    function TimeTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeTextField.prototype.setSecond = function (sec) {
        this.text = utils.SecToString(sec);
    };
    TimeTextField.prototype.setMillisecond = function (millsec) {
        var sec = Math.floor(millsec / 1000);
        this.setSecond(sec);
    };
    return TimeTextField;
}(egret.TextField));
__reflect(TimeTextField.prototype, "TimeTextField");
