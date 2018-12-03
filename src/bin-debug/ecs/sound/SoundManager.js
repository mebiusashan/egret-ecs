var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.effectOn = true;
        this.backgroundOn = true;
        this.effectVolume = 0.5;
        this.backgroundVolume = 0.5;
        this.effectSound = new SoundEffects();
        this.effectSound.setVolume(this.effectVolume);
        this.backgroundSound = new SoundBackground();
        this.backgroundSound.setVolume(this.backgroundVolume);
        // egret.lifecycle.onPause = () => {
        //     this.backgroundSound.stop("");
        // }
        // egret.lifecycle.onResume = () => {
        //     if (this.backgroundOn) {
        //         this.backgroundSound.resume();
        //     }
        // }
    }
    SoundManager.getInstance = function () {
        if (!SoundManager.soundManager) {
            SoundManager.soundManager = new SoundManager();
        }
        return SoundManager.soundManager;
    };
    SoundManager.prototype.pause = function () {
        this.backgroundSound.stop('');
    };
    SoundManager.prototype.resume = function () {
        if (this.backgroundOn) {
            this.backgroundSound.resume();
        }
    };
    SoundManager.prototype.getEffectOn = function () {
        return this.effectOn;
    };
    SoundManager.prototype.setEffectOn = function (value) {
        if (this.effectOn == value) {
            return;
        }
        this.effectOn = value;
        var v = value ? "0" : "1";
        Platform.getInstance().setLocalStorage(LocalStorageItems.SOUND, v);
        if (!this.effectOn) {
            this.effectSound.stopAll();
        }
    };
    SoundManager.prototype.getBackgroundOn = function () {
        return this.backgroundOn;
    };
    SoundManager.prototype.setBackgroundOn = function (value) {
        if (this.backgroundOn == value) {
            return;
        }
        this.backgroundOn = value;
        var v = value ? "0" : "1";
        Platform.getInstance().setLocalStorage(LocalStorageItems.BGM, v);
        if (this.backgroundOn) {
            this.backgroundSound.resume();
        }
        else {
            this.backgroundSound.stop("");
        }
    };
    SoundManager.prototype.getEffectVolume = function () {
        return this.effectVolume;
    };
    SoundManager.prototype.setEffectVolume = function (value) {
        value = Math.min(value, 1);
        value = Math.max(value, 0);
        this.effectVolume = value;
        this.effectSound.setVolume(this.effectVolume);
    };
    SoundManager.prototype.getBackgroundVolume = function () {
        return this.backgroundVolume;
    };
    SoundManager.prototype.setBackgroundVolume = function (value) {
        value = Math.min(value, 1);
        value = Math.max(value, 0);
        this.backgroundVolume = value;
        this.backgroundSound.setVolume(this.backgroundVolume);
    };
    SoundManager.prototype.playEffect = function (key) {
        if (!this.effectOn) {
            return;
        }
        this.effectSound.play(key);
    };
    SoundManager.prototype.stopEffect = function (key) {
        if (!this.effectOn) {
            return;
        }
        this.effectSound.stop(key);
    };
    SoundManager.prototype.stopAllEffect = function () {
        if (!this.effectOn) {
            return;
        }
        this.effectSound.stopAll();
    };
    SoundManager.prototype.playBackground = function (key) {
        if (!this.backgroundOn) {
            return;
        }
        this.backgroundSound.play(key);
    };
    SoundManager.prototype.stopBackground = function () {
        if (!this.backgroundOn) {
            return;
        }
        this.backgroundSound.stop("");
    };
    SoundManager.prototype.clearCache = function () {
        this.effectSound.clearCache();
        this.backgroundSound.clearCache();
    };
    SoundManager.prototype.initState = function () {
        var bgm = Platform.getInstance().getLocalStorage(LocalStorageItems.BGM);
        if (!bgm || bgm == "0") {
            this.setBackgroundOn(true);
        }
        else {
            this.setBackgroundOn(false);
        }
        var sound = Platform.getInstance().getLocalStorage(LocalStorageItems.SOUND);
        if (!sound || sound == "0") {
            this.setEffectOn(true);
        }
        else {
            this.setEffectOn(false);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
