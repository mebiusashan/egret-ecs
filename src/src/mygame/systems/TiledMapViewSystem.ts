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
        const data = tiledMapCom.o;
        const layers = data.layers;
        if (layers.length === 0) {
            return;
        }
        const mapview = tiledMapViewCom;
        let layer: TiledMapLayer = null;
        let layerview: TiledMapLayerView = null;
        for (let i = 0, length = layers.length; i < length; ++i) {
            layer = layers[i];
            layerview = this.createTiledMapLayerView(layer);
            if (layerview) {
                mapview.addChild(layerview);
            }
        }
    }

    private createTiledMapLayerView(layerdata: TiledMapLayer): TiledMapLayerView {
        if (!layerdata) {
            return null;
        }
        const row = layerdata.row;
        const col = layerdata.col;
        if (row === 0 && col === 0) {
            return null;
        }
        const grids: TiledMapGrid[][] = layerdata.grids;
        let layer = new TiledMapLayerView;
        let grid: TiledMapGrid = null;
        let gridView: TiledMapGridView = null;
        for (let i = 0; i < col; ++i) {
            for (let j = 0; j < row; ++j) {
                grid = grids[i][j];
                gridView = new TiledMapGridView();
                gridView.texture = RES.getRes('bg_jpg');
                gridView.x = grid.width * j;
                gridView.y = grid.height * i;
                gridView.width = grid.width;
                gridView.height = grid.height;
                gridView.visible = false;
                layer.addGrid(gridView, j, i);
            }
        }
        return layer;
    }
}

class TiledMapViewExecuteSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {

    private group1: entitas.Group | null = null;
    private group2: entitas.Group | null = null;

    public execute(): void {
        const tiledmap = this.group1.getSingleEntity() as GameObject;
        if (!tiledmap) {
            return;
        }
        const camera = this.group2.getSingleEntity() as GameObject;
        if (!camera) {
            return;
        }
        const camera2dCom = camera.getAs(Camera2dComponent);
        if (!camera2dCom.viewChanged) {
            return;
        }
        const tiledMapViewCom = tiledmap.getAs(TiledMapViewComponent);
        const childrenNum = tiledMapViewCom.numChildren;
        if (childrenNum > 0) {
            let tiledMapLayer: TiledMapLayerView = null;
            for (let i = 0; i < childrenNum; ++i) {
                tiledMapLayer = tiledMapViewCom.getChildAt(i) as TiledMapLayerView;
                if (tiledMapLayer) {
                    this.handleLayer(tiledMapLayer, camera, tiledmap);
                }
            }
        }
    }

    private handleLayer(tiledMapLayerView: TiledMapLayerView, camera: GameObject, tiledMap: GameObject): void {
        
        const camera2dCom = camera.getAs(Camera2dComponent);
        const positionCom = camera.getAs(PositionComponent);
        //已经在显示的，就更新掉，如果和摄像机不再碰撞，就关掉
        const hw = camera2dCom.halfWidth;
        const hh = camera2dCom.halfHeight;
        const left = positionCom.x - hw;
        const right = positionCom.x + hw;
        const top = positionCom.y - hh;
        const bottom = positionCom.y + hh;
        tiledMapLayerView.removeInvisibleGridsByCameraView(left, right, top, bottom, hw, hh);
        
        //直接用index算出格子，定位出当前显示的格子。这个就是tiledmap的用处
        const tiledMapCom = tiledMap.getAs(TiledMapComponent);
        const tiledMapObject = tiledMapCom.o;
        const tiledMapLayerObject = tiledMapObject.layers[0];
        const gw = tiledMapLayerObject.gw;
        const gh = tiledMapLayerObject.gh;
        //
        const disx = left - 0;
        const row1 = Math.floor(disx / gw);
        const row2 = Math.floor((disx + hw * 2) / gw);
        //
        const disy = top - 0;
        const col1 = Math.floor(disy / gh);
        const col2 = Math.floor((disy + hh * 2) / gh);
        //
        tiledMapLayerView.addVisibleGridsByRowAndColIndex(row1, row2, col1, col2);
    }

    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids;
        this.group1 = pool.getGroup(entitas.Matcher.allOf(ids.TiledMapComponent, ids.TiledMapViewComponent));
        this.group2 = pool.getGroup(entitas.Matcher.allOf(ids.Camera2dComponent, ids.PositionComponent));
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