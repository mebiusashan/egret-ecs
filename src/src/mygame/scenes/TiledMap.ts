//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class TiledMapGrid {

    public readonly map: TiledMap | null = null;
    public readonly layer: TiledMapLayer | null = null;
    public readonly rowidx: number = 0;
    public readonly colidx: number = 0;

    constructor(map: TiledMap, layer: TiledMapLayer, rowidx: number, colidx: number) {
        this.map = map;
        this.layer = layer;
        this.rowidx = Math.ceil(rowidx);
        this.colidx = Math.ceil(colidx);
    }

    public onReplace(target: TiledMapGrid): TiledMapGrid {
        return this;
    }

    public onCreate(): TiledMapGrid {
        return this;
    }

    public get width(): number {
        return this.layer.gw;
    }

    public get height(): number {
        return this.layer.gh;
    }

    public serialize(): string {
        return '';
    }

    public deserialize(s: string): TiledMapGrid {
        return this;
    }
}

class TiledMapLayer {

    public name: string = '';
    public grids: TiledMapGrid[][] = [];
    public map: TiledMap | null = null;
    public row: number = 0;
    public col: number = 0;
    public readonly gw: number = 0;
    public readonly gh: number = 0;

    constructor(name: string, tiledMap: TiledMap, rownumber: number, colnumber: number, gw: number, gh: number) {
        this.name = name;
        this.map = tiledMap;
        this.gw = gw;
        this.gh = gh;
        this.resize(rownumber, colnumber);
    }

    public resize(rownumber: number, colnumber: number): TiledMapLayer {
        if (this.row === rownumber && this.col === colnumber) {
            egret.log('resize?');
            return this;
        }
        //
        this.row = rownumber;
        this.col = colnumber;
        egret.log(this.name + ' resize = [' + this.row + ' , ' + this.col + ']');
        //
        const grids = this.grids;
        grids.length = this.col;
        for (let i = 0, l = grids.length; i < l; ++i) {
            if (!grids[i]) {
                grids[i] = [];
            }
            grids[i].length = this.row;
        }
        return this;
    }

    public addGrid(rowidx: number, colidx: number): TiledMapGrid {
        const grids = this.grids;
        if (colidx >= 0 && colidx < grids.length) {
            const row = grids[colidx];
            if (rowidx >= 0 && rowidx < row.length) {
                const _new_ = new TiledMapGrid(this.map, this, rowidx, colidx);
                const old = row[rowidx];
                if (old) {
                    old.onReplace(_new_);
                }
                row[rowidx] = _new_;
                _new_.onCreate();
                return _new_;
            }
        }
        return null;
    }

    public serialize(): string {
        return '';
    }

    public deserialize(s: string): TiledMapLayer {
        return this;
    }
}

class TiledMap {

    public name: string = '';
    public layers: Array<TiledMapLayer> = [];
    private readonly defaultRow: number = 0;
    private readonly defaultCol: number = 0;
    private readonly defaultGridWidth: number = 0;
    private readonly defaultGridHeight: number = 0;

    constructor(name: string, defaultRow: number = 2, defaultCol: number = 2, defaultGridWidth: number = 100, defaultGridHeight: number = 100) {
        this.name = name;
        this.defaultRow = defaultRow;
        this.defaultCol = defaultCol;
        this.defaultGridWidth = defaultGridWidth;
        this.defaultGridHeight = defaultGridHeight;
    }

    public addTiledMapLayer(add?: TiledMapLayer): TiledMapLayer {
        const layer: TiledMapLayer = add ? add : new TiledMapLayer('layer', this, this.defaultRow, this.defaultCol, 
        this.defaultGridWidth, this.defaultGridHeight);
        this.layers.push(layer);
        return layer;
    }

    public serialize(): string {
        return '';
    }

    public deserialize(s: string): TiledMap {
        return this;
    }
}

