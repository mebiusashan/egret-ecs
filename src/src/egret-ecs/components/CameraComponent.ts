//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 2d摄像机
 */
class Camera2dComponent implements entitas.IComponent, IData {
    public halfWidth: number = 0;
    public halfHeight: number = 0;
    public viewScale: number = 1;
    public restore(): void {
        this.halfWidth = 0;
        this.halfHeight = 0;
        this.viewScale = 1;
    }
}

class Camera2dDebugViewComponent extends egret.Shape implements entitas.IComponent, IView {
    //public resname: string = '';
    public removeView(): void {
        utils.removeFromParent(this);
    }
}

class PositionComponent extends egret.Point implements entitas.IComponent, IData {
    public restore(): void {
        this.setTo(0, 0);
    }
}