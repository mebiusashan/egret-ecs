//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 平台类型
 */
enum PlatformType {
    Web,
    WXGame
}

/**
 * 系统语言
 */
enum Language {
    ZH_CN,
    EN_US
}

/**
 * 系统信息接口
 */
interface ISystemInfo {
    brand: string;
    model: string;
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    language: string;
    version: string;
    system: string
    platform: string;
    fontSizeSetting: number;
    SDKVersion: string;
    benchmarkLevel: number;
}

interface IAuthSetting {
    userInfo: boolean;
    userLocation: boolean;
    address: boolean;
    invoiceTitle: boolean;
    werun: boolean;
    record: boolean;
    writePhotosAlbum: boolean;
    camera: boolean;
}

interface IUserInfo {
    nickName: string;
    avatarUrl: string;
    gender: number;
    country: string;
    province: string;
    city: string;
    language: string;
}

interface IGetUserInfoResult {
    result: boolean;
    userInfo: IUserInfo;
}

interface ILaunchInfo {
    scene: number,
    query: Object,
    isSticky: boolean,
    shareTicket: string,
    referrerInfo: IReferrerInfo
}

interface IReferrerInfo {
    appId: string,
    extraData: Object
}

class Platform {
    private static instance: Platform;
    protected _type: PlatformType = PlatformType.Web;
    protected _systemInfo: ISystemInfo = null;
    protected _language: Language = Language.ZH_CN;

    protected constructor() {

    }

    public static getInstance(): Platform {
        if (!Platform.instance) {
            if (window["wx"]) {
                Platform.instance = new WXPlatform();
            } else {
                Platform.instance = new WebPlatform();
            }
        }
        return Platform.instance;
    }

    /**
     *  平台类型
     */
    public get type(): PlatformType { return this._type; }

    /**
     * 系统信息
     */
    public get systemInfo(): ISystemInfo { return this._systemInfo; }

    /**
     * 语言
     */
    public get language(): Language { return this._language; }

    /**
     * 获取登录码
     */
    public login(): Promise<string> { return null; }

    /**
     * 获取当前用户设置
     */
    public getSetting(): Promise<IAuthSetting> { return null; }

    /**
     * 授权
     */
    public authorize(rect: egret.Rectangle, image: string, callback) { }

    /**
     * 获取用户信息
     */
    public getUserInfo(): Promise<IUserInfo> { return null; }

    /**
     * 分享
     */
    public share(title: string, imageUrl: string, query: string) { }

    /**
     * 显示转发菜单
     * @param title 
     * @param imageUrl 
     * @param query 
     */
    public showShareMenu(title: string, imageUrl: string, query: string, withShareTicket: boolean = true) { }

    /**
     * 注入平台声明周期回调
     * @param pause
     * @param resume
     */
    public injectLifecycleCallBack(pause: Function, resume: Function) { }

    /**
     * 获取启动参数
     */
    public getLaunchParam(key: string): any { return null; }

    /**
     * 获取服务器地址
     */
    public getServerURL(): string { return "" }

    /**
     * 退出游戏
     */
    public exitGame(): void { }

    /**
     * 创建游戏社区按钮
     */
    public createGameClubButton(rect: egret.Rectangle): void { }

    /**
     * 转换资源路径
     * @param path
     */
    public conversionResPath(path: string): string {
        return this.getResRootPath() + path;
    }

    /**
     * 获取资源路径
     */
    public getResRootPath(): string { return ""; }

    /**
     * 获取localStorage中的值
     * @param key
     */
    public getLocalStorage(key: string): string { return ""; }

    /**
     * 设置localStorage中的值
     * @param key
     * @param value
     */
    public setLocalStorage(key: string, value: string): void { return null; }

    /**
     * 长震动
     */
    public vibrateLong(): void { return null; }

    /**
     * 短震动
     */
    public vibrateShort(): void { return null; }

    /**
     * 视频广告接口
     * @param id 
     * @param succ 
     * @param err 
     */
    public showRewardedVideoAd(id: string, succ: Function, err: Function) { }
}