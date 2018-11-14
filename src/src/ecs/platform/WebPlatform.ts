//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * Web平台
 */
class WebPlatform extends Platform {

    constructor() {
        super();
        this.init();
    }

    private init() {
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
        } as ISystemInfo;
        this._language = Language.ZH_CN;
    }

    public login(): Promise<string> {
        console.error("web端不存在登录功能");
        return new Promise<string>((resolve, reject) => {
            resolve("1");
        });
    }

    public getSetting(): Promise<IAuthSetting> {
        console.error("web端不存在获取设置信息功能");
        return new Promise<IAuthSetting>((resolve, reject) => {
            const data: IAuthSetting = {
                userInfo: false,
                userLocation: false,
                address: false,
                invoiceTitle: false,
                werun: false,
                record: false,
                writePhotosAlbum: false,
                camera: false
            } as IAuthSetting;
            resolve(data);
        });
    }

    public authorize(rect: egret.Rectangle, image: string, callback: (rel: IGetUserInfoResult) => {}) {
        console.error("web端不存在授权功能");
    }

    public getUserInfo(): Promise<IUserInfo> {
        console.error("web端不存在获取用户信息功能，此处返回默认数据");
        return new Promise<IUserInfo>((resolve, reject) => {
            resolve({
                nickName: "神秘用户",
                avatarUrl: this.conversionResPath("test_header_png"),
                gender: 0,
                country: "",
                province: "",
                city: "",
            } as IUserInfo);
        });
    }

    public share(title: string, imageUrl: string, query: string) {
        console.error("web端不存在分享功能");
    }

    public showShareMenu(title: string, imageUrl: string, query: string, withShareTicket: boolean = true) {
        console.error("web端不存在显示分享菜单功能");
    }

    public injectLifecycleCallBack(pause: () => {}, resume: () => {}) {
        egret.lifecycle.onPause = pause;
        egret.lifecycle.onResume = resume;
    }

    public getLaunchParam(key: string): any {
        return egret.getOption(key);
    }

    public getServerURL(): string {
        return "https://jzsg-wxgame.egret-labs.org/";
    }

    public exitGame(): void {
        window.location.reload();
    }

    public createGameClubButton(rect: egret.Rectangle): void {
        console.error("web平台中不提供该功能");
    }

    public getResRootPath(): string {
        return "resource/";
    }

    /**
     * Web平台获取localStorage
     * @param key
     * @param value
     */
    public setLocalStorage(key: string, value: string): void {
        egret.localStorage.setItem(key, value);
    }

    /**
     * Web平台设置localStorage
     * @param key
     */
    public getLocalStorage(key: string): string {
        return egret.localStorage.getItem(key);
    }

    public showRewardedVideoAd(id: string, succ: Function, err: Function) {
        console.error("web平台中不提供视频广告功能，默认为调用成功");
        succ();
    }
}