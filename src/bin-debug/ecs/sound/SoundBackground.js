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
var SoundBackground = (function (_super) {
    __extends(SoundBackground, _super);
    function SoundBackground() {
        var _this = _super.call(this) || this;
        _this.curKey = "";
        return _this;
    }
    SoundBackground.prototype.play = function (key) {
        if (key == this.curKey) {
            return;
        }
        if (this.curKey != "") {
            this.stop(this.curKey);
        }
        this.curKey = key;
        var voice = this.find(key);
        if (voice) {
            voice.play();
            voice.setVolume(this.volume);
        }
    };
    SoundBackground.prototype.stop = function (key) {
        if (key == "") {
            key = this.curKey;
        }
        if (key == '') {
            return;
        }
        var voice = this.find(key);
        if (voice) {
            voice.stop();
        }
    };
    SoundBackground.prototype.resume = function () {
        var voice = this.find(this.curKey);
        if (voice) {
            voice.resume();
            voice.setVolume(this.volume);
        }
    };
    return SoundBackground;
}(BaseSound));
__reflect(SoundBackground.prototype, "SoundBackground");
