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

    private createTiledMapLayer(layerdata: TiledMapLayer): egret.DisplayObjectContainer {
        if (!layerdata) {
            return null;
        }
        const row = layerdata.row;
        const col = layerdata.col;
        const grids: TiledMapGrid[][] = layerdata.grids;
        let layer = new egret.DisplayObjectContainer;
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
                bitmap.visible = false;
                layer.addChild(bitmap);
            }
        }
        return layer;
    }
}

class TiledMapViewExecuteSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {

    private group1: entitas.Group | null = null;
    private group2: entitas.Group | null = null;
    private visibleGrids: egret.Bitmap[] = [];

    public execute(): void {
        const tiledmap = this.group1.getSingleEntity() as GameObject;
        if (!tiledmap) {
            return;
        }
        const camera = this.group2.getSingleEntity() as GameObject;
        if (camera) {
            const tiledMapViewCom = tiledmap.getAs(TiledMapViewComponent);
            const childrenNum = tiledMapViewCom.numChildren;
            let tiledMapLayer: egret.DisplayObjectContainer = null;
            for (let i = 0; i < childrenNum; ++i) {
                tiledMapLayer = tiledMapViewCom.getChildAt(i) as egret.DisplayObjectContainer;
                if (tiledMapLayer) {
                    this.handleLayer(tiledMapLayer, camera, tiledmap);
                }
            }
        }
    }

    private handleLayer(tiledMapLayerDisplay: egret.DisplayObjectContainer, camera: GameObject, tiledMap: GameObject): void {
        const camera2dCom = camera.getAs(Camera2dComponent);
        const positionCom = camera.getAs(PositionComponent);

        const hw = camera2dCom.halfWidth;
        const hh = camera2dCom.halfHeight;
        const left = positionCom.x - hw;
        const right = positionCom.x + hw;
        const top = positionCom.y - hh;
        const bottom = positionCom.y + hh;
        const vgrids = this.visibleGrids;
        for (let i = vgrids.length - 1; i >= 0; --i) {
            const bitmap = vgrids[i];
            const show = (Math.abs(left - bitmap.x) <= hw * 2 && Math.abs(top - bitmap.y) < hh * 2);
            if (!show) {
                bitmap.visible = false;
                vgrids.splice(i, 1);
            }
        }

        const tiledMapCom = tiledMap.getAs(TiledMapComponent);
        const tiledMapObject = tiledMapCom.o;
        const tiledMapLayerObject = tiledMapObject.layers[0];

        const gw = tiledMapLayerObject.gw;
        const gh = tiledMapLayerObject.gh;
        
        const disx = left - 0;
        const row1 = Math.floor(disx / gw);
        const row2 = Math.floor((disx + hw * 2) / gw);

        const disy = top - 0;
        const col1 = Math.floor(disy / gh);
        const col2 = Math.floor((disy + hh * 2) / gh);

        for (let i = col1; i <= col2; ++i) {
            for (let j = row1; j <= row2; ++j) {
                const child = tiledMapLayerDisplay.getChildByName(j + ':' + i);
                if (child) {
                    if (!child.visible) {
                        child.visible = true;
                        vgrids.push(child as egret.Bitmap);
                    }
                }
                else {
                    //egret.log('invalid index = ' + j + ':' + i);
                }
            }
        }
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