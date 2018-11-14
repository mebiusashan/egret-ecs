//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 平台类型
 */
var PlatformType;
(function (PlatformType) {
    PlatformType[PlatformType["Web"] = 0] = "Web";
    PlatformType[PlatformType["WXGame"] = 1] = "WXGame";
})(PlatformType || (PlatformType = {}));
/**
 * 系统语言
 */
var Language;
(function (Language) {
    Language[Language["ZH_CN"] = 0] = "ZH_CN";
    Language[Language["EN_US"] = 1] = "EN_US";
})(Language || (Language = {}));
var Platform = (function () {
    function Platform() {
        this._type = PlatformType.Web;
        this._systemInfo = null;
        this._language = Language.ZH_CN;
    }
    Platform.getInstance = function () {
        if (!Platform.instance) {
            if (window["wx"]) {
                Platform.instance = new WXPlatform();
            }
            else {
                Platform.instance = new WebPlatform();
            }
        }
        return Platform.instance;
    };
    Object.defineProperty(Platform.prototype, "type", {
        /**
         *  平台类型
         */
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform.prototype, "systemInfo", {
        /**
         * 系统信息
         */
        get: function () { return this._systemInfo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform.prototype, "language", {
        /**
         * 语言
         */
        get: function () { return this._language; },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取登录码
     */
    Platform.prototype.login = function () { return null; };
    /**
     * 获取当前用户设置
     */
    Platform.prototype.getSetting = function () { return null; };
    /**
     * 授权
     */
    Platform.prototype.authorize = function (rect, image, callback) { };
    /**
     * 获取用户信息
     */
    Platform.prototype.getUserInfo = function () { return null; };
    /**
     * 分享
     */
    Platform.prototype.share = function (title, imageUrl, query) { };
    /**
     * 显示转发菜单
     * @param title
     * @param imageUrl
     * @param query
     */
    Platform.prototype.showShareMenu = function (title, imageUrl, query, withShareTicket) {
        if (withShareTicket === void 0) { withShareTicket = true; }
    };
    /**
     * 注入平台声明周期回调
     * @param pause
     * @param resume
     */
    Platform.prototype.injectLifecycleCallBack = function (pause, resume) { };
    /**
     * 获取启动参数
     */
    Platform.prototype.getLaunchParam = function (key) { return null; };
    /**
     * 获取服务器地址
     */
    Platform.prototype.getServerURL = function () { return ""; };
    /**
     * 退出游戏
     */
    Platform.prototype.exitGame = function () { };
    /**
     * 创建游戏社区按钮
     */
    Platform.prototype.createGameClubButton = function (rect) { };
    /**
     * 转换资源路径
     * @param path
     */
    Platform.prototype.conversionResPath = function (path) {
        return this.getResRootPath() + path;
    };
    /**
     * 获取资源路径
     */
    Platform.prototype.getResRootPath = function () { return ""; };
    /**
     * 获取localStorage中的值
     * @param key
     */
    Platform.prototype.getLocalStorage = function (key) { return ""; };
    /**
     * 设置localStorage中的值
     * @param key
     * @param value
     */
    Platform.prototype.setLocalStorage = function (key, value) { return null; };
    /**
     * 长震动
     */
    Platform.prototype.vibrateLong = function () { return null; };
    /**
     * 短震动
     */
    Platform.prototype.vibrateShort = function () { return null; };
    /**
     * 视频广告接口
     * @param id
     * @param succ
     * @param err
     */
    Platform.prototype.showRewardedVideoAd = function (id, succ, err) { };
    return Platform;
}());
__reflect(Platform.prototype, "Platform");
