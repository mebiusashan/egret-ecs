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