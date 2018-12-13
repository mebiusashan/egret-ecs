//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////





class CameraViewReactiveSystem extends GameSystem<MyGameContext> implements entitas.IReactiveSystem, entitas.IReactiveExecuteSystem, entitas.IClearReactiveSystem, entitas.IEnsureComponents {

    public trigger: entitas.TriggerOnEvent;
    public clearAfterExecute: boolean = true;
    public ensureComponents: entitas.IMatcher | null = null;

    constructor(ecscontext: EntitasContext, gamecontext: MyGameContext) {
        super(ecscontext, gamecontext);
        const ids = ecscontext.ids; 
        this.trigger = new entitas.TriggerOnEvent(entitas.Matcher.allOf(ids.Camera2dComponent, ids.Camera2dDebugViewComponent), entitas.GroupEventType.OnEntityAdded);
    }

    public execute(entities: Array<entitas.Entity>) {

        const gamecontext = this.gamecontext;
        const currentScene = gamecontext.gameScene as GameScene<MyGameContext>;
        let e: GameObject = null;
        let camera2dCom: Camera2dComponent = null;
        let camera2dViewCom: Camera2dDebugViewComponent = null;

        for (let i = 0, length = entities.length; i < length; ++i) {
            e = entities[i] as GameObject;
            if (!e._isEnabled) {
                continue;
            }
            camera2dCom = e.hasAs(Camera2dComponent);
            camera2dViewCom = e.hasAs(Camera2dDebugViewComponent);
            if (camera2dCom && camera2dViewCom) {
                currentScene.addToDebugViewLayer(camera2dViewCom);
                this.createCamera2dDebugView(camera2dViewCom, camera2dCom);
            }
            else {
            }
        }
    }

    private createCamera2dDebugView(camera2dViewCom: Camera2dDebugViewComponent, camera2dCom: Camera2dComponent): void {
        const debugview = camera2dViewCom;
        const data = camera2dCom;
        debugview.anchorOffsetX = debugview.width / 2;
        debugview.anchorOffsetY = debugview.height / 2;
        //
        const hw = data.halfWidth;
        const hh = data.halfHeight;
        const left = 0 - hw;
        const right = 0 + hw;
        const top = 0 - hh;
        const bottom = 0 + hh;
        const gl = debugview.graphics;
        gl.clear();
        gl.beginFill(0x000000, 0.0);
        gl.lineStyle(3, 0xFF0000);
        gl.moveTo(left, top);
        gl.lineTo(right, top);
        gl.lineTo(right, bottom);
        gl.lineTo(left, bottom);
        gl.moveTo(right, top);
        gl.lineTo(left, bottom);
        gl.lineTo(left, top);
        gl.lineTo(right, bottom);
        gl.endFill();
    }
}

class CameraViewExecuteSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {
    private group1: entitas.Group | null = null;
    public execute(): void {
        const se = this.group1.getSingleEntity() as GameObject;
        if (!se) {
            return;
        }
        const posCom = se.getAs(PositionComponent);
        const camera2dDebugViewCom = se.getAs(Camera2dDebugViewComponent);
        camera2dDebugViewCom.x = posCom.x;
        camera2dDebugViewCom.y = posCom.y;
    }

    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids; 
        this.group1 = pool.getGroup(entitas.Matcher.allOf(ids.Camera2dComponent, ids.Camera2dDebugViewComponent, ids.PositionComponent));
    }
}

class CameraViewSystem extends GameSystems<MyGameContext> implements entitas.ISetPool {
    public setPool(pool: entitas.Pool): void {
        const ecscontext = this.ecscontext;
        const gamecontext = this.gamecontext;
        this.add(pool.createSystem(new CameraViewReactiveSystem(ecscontext, gamecontext)));
        this.add(pool.createSystem(new CameraViewExecuteSystem(ecscontext, gamecontext)));
    }
}