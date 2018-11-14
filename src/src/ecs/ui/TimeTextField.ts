//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 时间显示文本
 */
class TimeTextField extends egret.TextField {

    public setSecond(sec: number) {
        this.text = utils.SecToString(sec);
    }

    public setMillisecond(millsec: number) {
        const sec: number = Math.floor(millsec / 1000);
        this.setSecond(sec);
    }
}