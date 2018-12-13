//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class TiledMapViewReactiveSystem extends GameSystem<MyGameContext> implements entitas.IReactiveSystem, entitas.IReactiveExecuteSystem, entitas.IClearReactiveSystem, entitas.IEnsureComponents {

    public trigger: entitas.TriggerOnEvent;
    public clearAfterExecute: boolean = true;
    public ensureComponents: entitas.IMatcher | null = null;

    constructor(ecscontext: EntitasContext, gamecontext: MyGameContext) {
        super(ecscontext, gamecontext);
        const ids = ecscontext.ids;
        this.trigger = new entitas.TriggerOnEvent(entitas.Matcher.allOf(ids.TiledMapComponent, ids.TiledMapViewComponent), entitas.GroupEventType.OnEntityAdded);
    }

    public execute(entities: Array<entitas.Entity>) {

        const gamecontext = this.gamecontext;
        const testScene = gamecontext.gameScene as TestScene;
        let e: GameObject = null;
        let tiledMapCom: TiledMapComponent = null;
        let tiledMapViewCom: TiledMapViewComponent = null;

        for (let i = 0, length = entities.length; i < length; ++i) {
            e = entities[i] as GameObject;
            if (!e._isEnabled) {
                continue;
            }
            tiledMapCom = e.hasAs(TiledMapComponent);
            tiledMapViewCom = e.hasAs(TiledMapViewComponent);
            if (tiledMapCom && tiledMapViewCom) {
                testScene.addToLayer0(tiledMapViewCom);
                this.createTiledMapView(tiledMapViewCom, tiledMapCom);
            }
            else {
            }
        }
    }

    private createTiledMapView(tiledMapViewCom: TiledMapViewComponent, tiledMapCom: TiledMapComponent): void {
        const mapview = tiledMapViewCom;
        const data = tiledMapCom.o;
        const layers = data.layers;
        let layer: TiledMapLayer = null;
        let layerview: egret.DisplayObjectContainer = null;
        for (let i = 0, length = layers.length; i < length; ++i) {
            layer = layers[i];
            layerview = this.createTiledMapLayer(layer);
            if (layerview) {
                mapview.addChild(layerview);
            }
        }
    }

    private createTiledMapLayer(layer: TiledMapLayer): egret.DisplayObjectContainer {
        if (!layer) {
            return null;
        }
        const row: number = layer.row;
        const col: number = layer.col;
        const grids: TiledMapGrid[][] = layer.grids;
        let res = new egret.DisplayObjectContainer;
        let grid: TiledMapGrid = null;
        let bitmap: egret.Bitmap = null;
        let texture: egret.Texture = null;
        for (let i = 0; i < col; ++i) {
            for (let j = 0; j < row; ++j) {
                grid = grids[i][j];
                bitmap = new egret.Bitmap();
                texture = RES.getRes('bg_jpg');
                bitmap.texture = texture;
                bitmap.x = grid.width * j;
                bitmap.y = grid.height * i;
                bitmap.width = grid.width;
                bitmap.height = grid.height;
                bitmap.name = j + ':' + i;
                res.addChild(bitmap);
            }
        }
        return res;
    }
}

class TiledMapViewExecuteSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {
    public execute(): void {
    }
    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids;
    }
}

class TiledMapViewSystem extends GameSystems<MyGameContext> implements entitas.ISetPool {
    public setPool(pool: entitas.Pool): void {
        const ecscontext = this.ecscontext;
        const gamecontext = this.gamecontext;
        this.add(pool.createSystem(new TiledMapViewReactiveSystem(ecscontext, gamecontext)));
        this.add(pool.createSystem(new TiledMapViewExecuteSystem(ecscontext, gamecontext)));
    }
}