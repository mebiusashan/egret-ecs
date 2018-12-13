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
    //public resname: string = '';
    public removeView(): void {
        utils.removeFromParent(this);
    }
}