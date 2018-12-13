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
    public viewChanged: boolean = true;
    public lastCameraX: number = 0;
    public lastCameraY: number = 0;
    public restore(): void {
        this.halfWidth = 0;
        this.halfHeight = 0;
        this.viewScale = 1;
        this.viewChanged = true;
        this.lastCameraX = 0;
        this.lastCameraY = 0;
    }
}

class Camera2dDebugViewComponent extends egret.Shape implements entitas.IComponent, IView {
    public removeView(): void {
        utils.removeFromParent(this);
    }
}
