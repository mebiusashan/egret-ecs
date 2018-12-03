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
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    function SoundEffects() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoundEffects.prototype.play = function (key) {
        var voice = this.find(key, true);
        if (voice) {
            voice.play(0, 1);
            voice.setVolume(this.volume);
        }
    };
    SoundEffects.prototype.stop = function (key) {
        var voices = this.finds(key);
        if (voices) {
            voices.map(function (voice) {
                voice.stop();
            });
        }
    };
    SoundEffects.prototype.stopAll = function () {
        var voices;
        for (var key in this.cache) {
            voices = this.cache[key];
            voices.map(function (voice) {
                voice.stop();
            });
        }
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
