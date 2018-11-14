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
 * Web平台
 */
var WebPlatform = (function (_super) {
    __extends(WebPlatform, _super);
    function WebPlatform() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    WebPlatform.prototype.init = function () {
        this._type = PlatformType.Web;
        this._systemInfo = {
            brand: "",
            model: "",
            pixelRatio: 0,
            screenWidth: document.body.clientWidth,
            screenHeight: document.body.clientHeight,
            windowWidth: document.body.clientWidth,
            windowHeight: document.body.clientHeight,
            statusBarHeight: 0,
            language: "",
            version: "",
            system: "",
            platform: "",
            fontSizeSetting: 0,
            SDKVersion: "",
            benchmarkLevel: 0
        };
        this._language = Language.ZH_CN;
    };
    WebPlatform.prototype.login = function () {
        console.error("web端不存在登录功能");
        return new Promise(function (resolve, reject) {
            resolve("1");
        });
    };
    WebPlatform.prototype.getSetting = function () {
        console.error("web端不存在获取设置信息功能");
        return new Promise(function (resolve, reject) {
            var data = {
                userInfo: false,
                userLocation: false,
                address: false,
                invoiceTitle: false,
                werun: false,
                record: false,
                writePhotosAlbum: false,
                camera: false
            };
            resolve(data);
        });
    };
    WebPlatform.prototype.authorize = function (rect, image, callback) {
        console.error("web端不存在授权功能");
    };
    WebPlatform.prototype.getUserInfo = function () {
        var _this = this;
        console.error("web端不存在获取用户信息功能，此处返回默认数据");
        return new Promise(function (resolve, reject) {
            resolve({
                nickName: "神秘用户",
                avatarUrl: _this.conversionResPath("test_header_png"),
                gender: 0,
                country: "",
                province: "",
                city: "",
            });
        });
    };
    WebPlatform.prototype.share = function (title, imageUrl, query) {
        console.error("web端不存在分享功能");
    };
    WebPlatform.prototype.showShareMenu = function (title, imageUrl, query, withShareTicket) {
        if (withShareTicket === void 0) { withShareTicket = true; }
        console.error("web端不存在显示分享菜单功能");
    };
    WebPlatform.prototype.injectLifecycleCallBack = function (pause, resume) {
        egret.lifecycle.onPause = pause;
        egret.lifecycle.onResume = resume;
    };
    WebPlatform.prototype.getLaunchParam = function (key) {
        return egret.getOption(key);
    };
    WebPlatform.prototype.getServerURL = function () {
        return "https://jzsg-wxgame.egret-labs.org/";
    };
    WebPlatform.prototype.exitGame = function () {
        window.location.reload();
    };
    WebPlatform.prototype.createGameClubButton = function (rect) {
        console.error("web平台中不提供该功能");
    };
    WebPlatform.prototype.getResRootPath = function () {
        return "resource/";
    };
    /**
     * Web平台获取localStorage
     * @param key
     * @param value
     */
    WebPlatform.prototype.setLocalStorage = function (key, value) {
        egret.localStorage.setItem(key, value);
    };
    /**
     * Web平台设置localStorage
     * @param key
     */
    WebPlatform.prototype.getLocalStorage = function (key) {
        return egret.localStorage.getItem(key);
    };
    WebPlatform.prototype.showRewardedVideoAd = function (id, succ, err) {
        console.error("web平台中不提供视频广告功能，默认为调用成功");
        succ();
    };
    return WebPlatform;
}(Platform));
__reflect(WebPlatform.prototype, "WebPlatform");
