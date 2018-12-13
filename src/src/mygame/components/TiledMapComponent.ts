//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class TiledMapComponent implements entitas.IComponent, IData {
    public o: TiledMap | null = null;
    public restore(): void {
        this.o.clear();
        this.o = null;
    }
}

class TiledMapViewComponent extends egret.DisplayObjectContainer implements entitas.IComponent, IView {
    public removeView(): void {
        this.removeChildren();
        utils.removeFromParent(this);
    }
}