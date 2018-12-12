//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 简单按钮
 */
class SimpleButton extends egret.Bitmap {

    private _upSkin: egret.Texture;
    private _downSkin: egret.Texture;

    public constructor(upSkin: string, downSkin: string) {
        super();
        this._upSkin = RES.getRes(upSkin);
        this._downSkin = RES.getRes(downSkin);
        this.texture = this._upSkin;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.up, this);
    }

    private up(e: egret.TouchEvent): void {
        this.texture = this._upSkin;
    }

    private down(e: egret.TouchEvent): void {
        this.texture = this._downSkin;
    }

    public destroy(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.up, this);
        this._upSkin = null;
        this._downSkin = null;
    }
}