//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

//测试的游戏上下文
class MyGameContext extends GameContext {
    public testValue: number = 0;
}

//测试的游戏场景
const enum TestSceneLayer {
    LAYER0,
    LAYER1
}

class TestScene extends GameScene<MyGameContext> {

    public layer0: egret.DisplayObjectContainer | null = null;
    public layer1: egret.DisplayObjectContainer | null = null;
    private testSceneSystem: TestSceneSystem | null = null;

    protected enterScene() {
       this.registerAllLayers();
       this.createScene();
    }

    private registerAllLayers(): void {
        this.layer0 = this.registerLayer(TestSceneLayer.LAYER0, 'LAYER0');
        this.layer1 = this.registerLayer(TestSceneLayer.LAYER1, 'LAYER1');
    }

    protected exitScene(): void {
    }

    protected updateScene(): void {
        if (this.testSceneSystem) {
            this.testSceneSystem.execute();
        }
    }

    private createScene(): void {
        //
        const testSceneSystem = new TestSceneSystem(this.ecscontext, this.gamecontext);
        this.testSceneSystem = testSceneSystem;
        testSceneSystem.setPool(this.ecscontext.pool);
        testSceneSystem.initialize();
        //
        const gameObject = GameObject.create(this.ecscontext, 'gameobj');
        gameObject.addAs(BitmapComponent);
    }
}

class TestExecuteSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {
    private group1: entitas.Group | null = null;
    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids; 
        this.group1 = pool.getGroup(entitas.Matcher.allOf(ids.BitmapComponent));
    }
    public execute(): void {
        const ens = this.group1.getEntities();
        if (ens.length === 0) {
            return;
        }
        let e: GameObject = null;
        let bitmapCom: BitmapComponent = null;
        let gamecontext: MyGameContext = this.gamecontext;
        let scene = gamecontext.gameScene as TestScene;
        for (let i = 0, length = ens.length; i < length; ++i) {
            e = ens[i] as GameObject;
            bitmapCom = e.getAs(BitmapComponent);
            if (!bitmapCom.parent) {
                scene.addChild(bitmapCom);
                bitmapCom.texture = RES.getRes('egret_icon_png');
                bitmapCom.x = 640/2;
                bitmapCom.y = 1136/2;
            }
        }
    }
}

class TestSceneSystem extends GameSystems<MyGameContext> {
    public setPool(pool: entitas.Pool): void {
        const ecscontext = this.ecscontext;
        const gamecontext = this.gamecontext;
        this.add(pool.createSystem(new TestExecuteSystem(ecscontext, gamecontext)));
        this.add(pool.createSystem(new DestroySystem(ecscontext, gamecontext)));
    }
}

class Main extends ECSApp<MyGameContext> {

    protected start(): void {
        //初始化ECS环境        
        this.createECSContext(ComponentsClassesRegister, 200);
        //初始化游戏上下文
        this.__gamecontext__ = new MyGameContext;
        this.__gamecontext__.clear();
        this.__gamecontext__.setRoot(this);
        //
        this.gotoNextScene();
    } 

    private gotoNextScene() {
        this.__gamecontext__.changeScene(new TestScene(this.__ecscontext__, this.__gamecontext__, 'TestScene'));
    }
}
