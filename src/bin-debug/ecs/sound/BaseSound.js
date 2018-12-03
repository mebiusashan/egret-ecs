var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseSound = (function () {
    function BaseSound() {
        this.cache = {};
        this.volume = 0.5;
    }
    BaseSound.prototype.play = function (key) {
    };
    BaseSound.prototype.stop = function (key) {
    };
    BaseSound.prototype.setVolume = function (value) {
        this.volume = value;
        var voices;
        for (var key in this.cache) {
            voices = this.cache[key];
            voices.map(function (voice) {
                voice.setVolume(value);
            });
        }
    };
    BaseSound.prototype.clearCache = function () {
        var voices;
        for (var key in this.cache) {
            voices = this.cache[key];
            for (var i = 0; i < voices.length; i++) {
                if (!voices[i].isPlay) {
                    voices[i].dispose();
                    voices.splice(i);
                    i--;
                }
            }
            if (voices.length == 0) {
                delete this.cache[key];
            }
        }
    };
    BaseSound.prototype.find = function (key, unused) {
        if (unused === void 0) { unused = false; }
        var voices = this.cache[key];
        if (voices) {
            if (unused) {
                voices.map(function (voice) {
                    if (!voice.isPlay) {
                        return voice;
                    }
                });
            }
            else {
                return voices[0];
            }
        }
        var sound = RES.getRes(key);
        if (sound) {
            if (!voices) {
                voices = [];
                this.cache[key] = voices;
            }
            var voice = new Voice(sound);
            voices.push(voice);
            return voice;
        }
        console.error("sound resource not found, key:", key);
        return null;
    };
    BaseSound.prototype.finds = function (key) {
        return this.cache[key];
    };
    return BaseSound;
}());
__reflect(BaseSound.prototype, "BaseSound");
