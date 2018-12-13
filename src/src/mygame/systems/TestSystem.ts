//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////



class TestExecuteSystem extends GameSystem<MyGameContext> implements entitas.IInitializeSystem, entitas.IExecuteSystem, entitas.ISetPool {
    private group1: entitas.Group | null = null;
    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids; 
        this.group1 = pool.getGroup(entitas.Matcher.allOf(ids.BitmapComponent));
    }

    public initialize(): any {
    }

    public execute(): void {
        const ens = this.group1.getEntities();
        if (ens.length === 0) {
            return;
        }
        let e: GameObject = null;
        let bitmapCom: BitmapComponent = null;
        const gamecontext: MyGameContext = this.gamecontext;
        const scene = gamecontext.gameScene as TestScene;
        for (let i = 0, length = ens.length; i < length; ++i) {
            e = ens[i] as GameObject;
            bitmapCom = e.getAs(BitmapComponent);
            if (!bitmapCom.parent) {
                scene.addToLayer1(bitmapCom, 10000);
                bitmapCom.texture = RES.getRes('egret_icon_png');
                bitmapCom.anchorOffsetX = bitmapCom.width/2;
                bitmapCom.anchorOffsetY = bitmapCom.height/2;
            }
        }
    }
}

class TestInputSystem extends GameSystems<MyGameContext> {
    public setPool(pool: entitas.Pool): void {
        const ecscontext = this.ecscontext;
        const gamecontext = this.gamecontext;
        this.add(pool.createSystem(new KeyboardSystem(ecscontext, gamecontext)));
    }
}

class TestViewSystem extends GameSystems<MyGameContext> {
    public setPool(pool: entitas.Pool): void {
        const ecscontext = this.ecscontext;
        const gamecontext = this.gamecontext;
        this.add(pool.createSystem(new TiledMapViewSystem(ecscontext, gamecontext)));
    }
}

class TestSystem extends GameSystems<MyGameContext> {
    public setPool(pool: entitas.Pool): void {
        const ecscontext = this.ecscontext;
        const gamecontext = this.gamecontext;
        
        this.add(pool.createSystem(new TestInputSystem(ecscontext, gamecontext)));
        this.add(pool.createSystem(new TestExecuteSystem(ecscontext, gamecontext)));
        this.add(pool.createSystem(new TestViewSystem(ecscontext, gamecontext)));
        this.add(pool.createSystem(new DestroySystem(ecscontext, gamecontext)));
    }
}