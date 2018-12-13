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
        this.trigger = new entitas.TriggerOnEvent(entitas.Matcher.allOf(ids.TiledMapComponent), entitas.GroupEventType.OnEntityAdded);
    }
    public execute(entities: Array<entitas.Entity>) {
        var a = 0;
        /*
        const gameContext = this.gamecontext;
        if (gameContext.gameState !== GameState.BATTLING) {
            return;
        }
        const battleScene = gameContext.gameScene as BattleScene;
        const gameConfig = gameContext.gameConfig;
        const color = gameConfig.HERO_VIEW_COLOR;
        let e: GameObject = null;
        let heroViewCom: HeroViewComponent = null;
        let quadTreeChildCom: QuadTreeChildComponent = null;
        let gl: egret.Graphics = null;
        let rect: QuadTreeRect = null;
        for (let i = 0, length = entities.length; i < length; ++i) {
            e = entities[i] as GameObject;
            if (!e._isEnabled) {
                continue;
            }
            heroViewCom = e.hasAs(HeroViewComponent);
            if (heroViewCom) {
                battleScene.addToHeroLayer(heroViewCom);
                gl = heroViewCom.graphics;
                gl.beginFill(color, 1.0);
                gl.drawRect(0, 0, 80, 80);
                gl.endFill();
                quadTreeChildCom = e.hasAs(QuadTreeChildComponent);
                if (quadTreeChildCom) {
                    rect = quadTreeChildCom.saveRect;
                    heroViewCom.anchorOffsetX = Math.abs(rect.width - heroViewCom.width) / 2;
                    heroViewCom.anchorOffsetY = Math.abs(rect.height - heroViewCom.height) / 2;
                }
                else {
                }
            }
            else {
            }
        }
        */
    }
}

class TiledMapViewExecuteSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {
    private group1: entitas.Group | null = null;
    private group2: entitas.Group | null = null;
    public execute(): void {
        var a = 0;
        /*
        const cam = this.group2.getSingleEntity() as GameObject;
        if (!cam) {
            return;
        }
        const cameraCom = cam.getAs(CameraComponent);
        const camPosCom = cam.getAs(PositionComponent);
        const w1 = camPosCom.x - cameraCom.halfWidth;
        const h1 = camPosCom.y - cameraCom.halfHeight;
        let e: GameObject = null;
        let posCom: PositionComponent = null;
        let scaleCom: ScaleComponent = null;
        let rotationCom: RotationComponent = null;
        let heroViewCom: HeroViewComponent = null;
        const ens = this.group1.getEntities();
        for (let i = 0, length = ens.length; i < length; ++i) {
            e = ens[i] as GameObject;
            posCom = e.getAs(PositionComponent);
            heroViewCom = e.getAs(HeroViewComponent);
            heroViewCom.x = posCom.x - w1;
            heroViewCom.y = posCom.y - h1;
            scaleCom = e.hasAs(ScaleComponent);
            if (scaleCom) {
                heroViewCom.scaleX = scaleCom.scaleX;
                heroViewCom.scaleY = scaleCom.scaleY;
            }
            rotationCom = e.hasAs(RotationComponent);
            if (rotationCom) {
                heroViewCom.rotation = rotationCom.rotation;
            }
        }
        */
    }

    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids;
        // this.group1 = pool.getGroup(entitas.Matcher.allOf(ids.HeroViewComponent, ids.PositionComponent).anyOf(ids.ScaleComponent, ids.RotationComponent));
        // this.group2 = pool.getGroup(entitas.Matcher.allOf(ids.CameraComponent, ids.PositionComponent));
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