//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


declare const wx;

/**
 * 微信平台
 */
class WXPlatform extends Platform {
    constructor() {
        super();
        this.init();
    }

    private init() {
        this._type = PlatformType.WXGame;
        this._systemInfo = wx.getSystemInfoSync();
        this._language = Language.ZH_CN;
    }

    public login(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            wx.login({
                success(res) {
                    if (res.code) {
                        resolve(res.code);
                    } else {
                        reject(res.errMsg)
                    }
                }
            })
        });
    }

    public getSetting(): Promise<IAuthSetting> {
        return new Promise<IAuthSetting>((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    const rel = res.authSetting;
                    const data: IAuthSetting = {
                        userInfo: rel['scope.userInfo'],
                        userLocation: rel['scope.userLocation'],
                        address: rel['scope.address'],
                        invoiceTitle: rel['scope.invoiceTitle'],
                        werun: rel['scope.werun'],
                        record: rel['scope.record'],
                        writePhotosAlbum: rel['scope.writePhotosAlbum'],
                        camera: rel['scope.camera']
                    } as IAuthSetting;
                    resolve(data);
                },
                fail() {
                    reject();
                }
            })
        });
    }

    public authorize(rect: egret.Rectangle, image: string, callback: (rel: IGetUserInfoResult) => {}): Promise<IGetUserInfoResult> {
        return new Promise<IGetUserInfoResult>((resolve, reject) => {
            let button = wx.createUserInfoButton({
                type: 'image',
                image: image,
                style: {
                    left: rect.x,
                    top: rect.y,
                    width: rect.width,
                    height: rect.height
                }
            });
            button.onTap((res) => {
                let rel: IGetUserInfoResult = {} as IGetUserInfoResult;
                if (res.userInfo) {
                    rel.result = true;
                    rel.userInfo = res.userInfo;
                } else {
                    rel.result = false;
                }
                callback(rel);
                rel.result ? button.destroy() : void 0;
            })
        });
    }

    public getUserInfo(): Promise<IUserInfo> {
        return new Promise<IUserInfo>((resolve, reject) => {
            wx.getUserInfo({
                success: function (res) {
                    resolve(res.userInfo);
                },
                fail: function () {
                    resolve(null);
                }
            })
        });
    }

    public share(title: string, imageUrl: string, query: string) {
        // console.error("微信分享接口尚未实现");
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query
        });
    }

    public showShareMenu(title: string, imageUrl: string, query: string, withShareTicket: boolean = true) {
        wx.onShareAppMessage(function () {
            return {
                title: title,
                imageUrl: imageUrl,
                query: query
            }
        });
        wx.showShareMenu({ withShareTicket: withShareTicket });
    }

    public injectLifecycleCallBack(pause: Function, resume: Function) {
        wx.onShow(resume);
        wx.onHide(pause);
    }

    public getLaunchParam(key: string): any {
        return wx.getLaunchOptionsSync();
    }

    public getServerURL(): string {
        return "https://jzsg-wxgame.egret-labs.org/";
    }

    public exitGame(): void {
        wx.exitMiniProgram();
    }

    public createGameClubButton(rect: egret.Rectangle): void {
        wx.createGameClubButton({
            icon: 'light',
            style: {
                left: rect.x,
                top: rect.y,
                width: rect.width,
                height: rect.height
            }
        })
    }

    public getResRootPath(): string {
        return "https://pkclient.egret-labs.org/td/test/v27/resource/";
    }

    // WX短振动
    public vibrateShort(): void {
        wx.vibrateShort({
            success: function () {
                egret.log("wxVibrateShort");
            }
        })
    }

    // WX长振动
    public vibrateLong(): void {
        wx.vibrateLong({
            success: function () {
                egret.log("wxVibrateLong");
            }
        })
    }

    /**
     * 微信平台获取localStorage
     * @param key
     * @param value
     */
    public setLocalStorage(key: string, value: string): void {
        egret.localStorage.setItem(key, value);
    }

    /**
     * 微信平台设置localStorage
     * @param key
     */
    public getLocalStorage(key: string): string {
        return egret.localStorage.getItem(key);
    }


    public showRewardedVideoAd(id: string, succ: Function, err: Function) {
        const rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: id });
        rewardedVideoAd.show().then(() => {
            //console.log('激励视频 广告显示')
            rewardedVideoAd.onClose(res => {
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
            })
        }).catch(err => {
            // //console.log(err)
            console.warn("视频广告播放失败")
            err();
        })
    }

    public setUserCloudStorage(base_level: number) {
        let data = [
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
            success: (res) => {
                //console.log("setUserCloudStorage success", res)
            },
            fail: (res) => {
                //console.log("setUserCloudStorage fail", res)
            }
        });
    }
}