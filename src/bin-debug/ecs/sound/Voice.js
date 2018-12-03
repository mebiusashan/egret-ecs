var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Voice = (function () {
    function Voice(sound) {
        this._position = 0;
        this._sound = sound;
        this._isPlay = false;
    }
    Voice.prototype.setVolume = function (value) {
        if (this._channel) {
            this._channel.volume = value;
        }
    };
    Object.defineProperty(Voice.prototype, "isPlay", {
        get: function () {
            return this._isPlay;
        },
        enumerable: true,
        configurable: true
    });
    Voice.prototype.play = function (startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 0; }
        this._isPlay = true;
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
        }
        this._channel = this._sound.play(startTime, loops);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
        return this._channel;
    };
    Voice.prototype.playComplete = function (evt) {
        this._isPlay = false;
    };
    Voice.prototype.stop = function () {
        this._isPlay = false;
        if (this._channel) {
            this._position = this._channel.position;
            this._channel.stop();
        }
    };
    Voice.prototype.resume = function () {
        this.play(this._position);
    };
    Voice.prototype.dispose = function () {
        if (this._channel) {
            this._channel.stop();
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
        }
        this._channel = null;
        this._sound = null;
    };
    return Voice;
}());
__reflect(Voice.prototype, "Voice");
