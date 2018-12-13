//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class TiledMapLayerView extends egret.DisplayObjectContainer {

    private readonly gridsMap: Object = {};
    public readonly visibleGrids: TiledMapGridView[] = [];

    public addGrid(child: TiledMapGridView, rowidx: number, colidx: number): void {
        if (!child) {
            return;
        }
        this.addChild(child);
        child.name = this.gridName(rowidx, colidx);
        this.gridsMap[child.name] = child;
    }

    private gridName(rowidx: number, colidx: number): string {
        return rowidx + ':' + colidx;
    }

    public getGrid(rowidx: number, colidx: number): TiledMapGridView {
        const name = this.gridName(rowidx, colidx);
        return this.gridsMap[name] as TiledMapGridView;
    }
 
    public removeInvisibleGridsByCameraView(left: number, right: number, top: number, bottom: number, hw: number, hh: number): void {
        const vgrids = this.visibleGrids;
        if (vgrids.length === 0) {
            return;
        }
        const cw = hw * 2;
        const ch = hh * 2;
        let gridView: TiledMapGridView = null;
        let intersect: boolean = false;
        for (let i = vgrids.length - 1; i >= 0; --i) {
            gridView = vgrids[i];
            intersect = (Math.abs(left - gridView.x) <= cw && Math.abs(top - gridView.y) < ch);
            if (!intersect) {
                gridView.visible = false;
                vgrids.splice(i, 1);
            }
        }
    }

    public addVisibleGridsByRowAndColIndex(rowmin: number, rowmax: number, colmin: number, colmax: number): void {
        const vgrids = this.visibleGrids;
        let gridView: TiledMapGridView = null;
        for (let i = colmin; i <= colmax; ++i) {
            for (let j = rowmin; j <= rowmax; ++j) {
                gridView = this.getGrid(j, i);
                if (gridView && !gridView.visible) {
                    gridView.visible = true;
                    vgrids.push(gridView);
                }
                else {
                }
            }
        }
    }  

}

class TiledMapGridView extends egret.Bitmap {

}