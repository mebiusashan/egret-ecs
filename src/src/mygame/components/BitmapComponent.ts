//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class BitmapComponent extends egret.Bitmap implements entitas.IComponent, IView {
    public resname: string = '';
    public removeView(): void {
        utils.removeFromParent(this);
    }
}