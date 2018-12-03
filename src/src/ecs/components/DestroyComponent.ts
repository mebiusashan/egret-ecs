//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


/**
 * 销毁
 */
class DestroyComponent implements entitas.IComponent, IRestore {
    public restore(): void {
    }
}

class BitmapComponent extends egret.Bitmap implements entitas.IComponent, IView {
    public resname: string = '';
    public removeView(): void {
        utils.removeFromParent(this);
    }
}