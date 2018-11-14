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
 * 微信平台
 */
var WXPlatform = (function (_super) {
    __extends(WXPlatform, _super);
    function WXPlatform() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    WXPlatform.prototype.init = function () {
        this._type = PlatformType.WXGame;
        this._systemInfo = wx.getSystemInfoSync();
        this._language = Language.ZH_CN;
    };
    WXPlatform.prototype.login = function () {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        resolve(res.code);
                    }
                    else {
                        reject(res.errMsg);
                    }
                }
            });
        });
    };
    WXPlatform.prototype.getSetting = function () {
        return new Promise(function (resolve, reject) {
            wx.getSetting({
                success: function (res) {
                    var rel = res.authSetting;
                    var data = {
                        userInfo: rel['scope.userInfo'],
                        userLocation: rel['scope.userLocation'],
                        address: rel['scope.address'],
                        invoiceTitle: rel['scope.invoiceTitle'],
                        werun: rel['scope.werun'],
                        record: rel['scope.record'],
                        writePhotosAlbum: rel['scope.writePhotosAlbum'],
                        camera: rel['scope.camera']
                    };
                    resolve(data);
                },
                fail: function () {
                    reject();
                }
            });
        });
    };
    WXPlatform.prototype.authorize = function (rect, image, callback) {
        return new Promise(function (resolve, reject) {
            var button = wx.createUserInfoButton({
                type: 'image',
                image: image,
                style: {
                    left: rect.x,
                    top: rect.y,
                    width: rect.width,
                    height: rect.height
                }
            });
            button.onTap(function (res) {
                var rel = {};
                if (res.userInfo) {
                    rel.result = true;
                    rel.userInfo = res.userInfo;
                }
                else {
                    rel.result = false;
                }
                callback(rel);
                rel.result ? button.destroy() : void 0;
            });
        });
    };
    WXPlatform.prototype.getUserInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: function (res) {
                    resolve(res.userInfo);
                },
                fail: function () {
                    resolve(null);
                }
            });
        });
    };
    WXPlatform.prototype.share = function (title, imageUrl, query) {
        // console.error("微信分享接口尚未实现");
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query
        });
    };
    WXPlatform.prototype.showShareMenu = function (title, imageUrl, query, withShareTicket) {
        if (withShareTicket === void 0) { withShareTicket = true; }
        wx.onShareAppMessage(function () {
            return {
                title: title,
                imageUrl: imageUrl,
                query: query
            };
        });
        wx.showShareMenu({ withShareTicket: withShareTicket });
    };
    WXPlatform.prototype.injectLifecycleCallBack = function (pause, resume) {
        wx.onShow(resume);
        wx.onHide(pause);
    };
    WXPlatform.prototype.getLaunchParam = function (key) {
        return wx.getLaunchOptionsSync();
    };
    WXPlatform.prototype.getServerURL = function () {
        return "https://jzsg-wxgame.egret-labs.org/";
    };
    WXPlatform.prototype.exitGame = function () {
        wx.exitMiniProgram();
    };
    WXPlatform.prototype.createGameClubButton = function (rect) {
        wx.createGameClubButton({
            icon: 'light',
            style: {
                left: rect.x,
                top: rect.y,
                width: rect.width,
                height: rect.height
            }
        });
    };
    WXPlatform.prototype.getResRootPath = function () {
        return "https://pkclient.egret-labs.org/td/test/v27/resource/";
    };
    // WX短振动
    WXPlatform.prototype.vibrateShort = function () {
        wx.vibrateShort({
            success: function () {
                egret.log("wxVibrateShort");
            }
        });
    };
    // WX长振动
    WXPlatform.prototype.vibrateLong = function () {
        wx.vibrateLong({
            success: function () {
                egret.log("wxVibrateLong");
            }
        });
    };
    /**
     * 微信平台获取localStorage
     * @param key
     * @param value
     */
    WXPlatform.prototype.setLocalStorage = function (key, value) {
        egret.localStorage.setItem(key, value);
    };
    /**
     * 微信平台设置localStorage
     * @param key
     */
    WXPlatform.prototype.getLocalStorage = function (key) {
        return egret.localStorage.getItem(key);
    };
    WXPlatform.prototype.showRewardedVideoAd = function (id, succ, err) {
        var rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: id });
        rewardedVideoAd.show().then(function () {
            //console.log('激励视频 广告显示')
            rewardedVideoAd.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    succ();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    err();
                }
            });
        }).catch(function (err) {
            // //console.log(err)
            console.warn("视频广告播放失败");
            err();
        });
    };
    WXPlatform.prototype.setUserCloudStorage = function (base_level) {
        var data = [
            {
                key: "base_level",
                value: JSON.stringify({
                    "wxgame": {
                        "score": base_level,
                        "update_time": Math.floor((new Date().valueOf()) / 1000)
                    }
                })
            }
        ];
        wx.setUserCloudStorage({
            KVDataList: data,
            success: function (res) {
                //console.log("setUserCloudStorage success", res)
            },
            fail: function (res) {
                //console.log("setUserCloudStorage fail", res)
            }
        });
    };
    return WXPlatform;
}(Platform));
__reflect(WXPlatform.prototype, "WXPlatform");
