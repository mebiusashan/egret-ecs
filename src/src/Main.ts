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

    protected enterScene(): void {
       //这次layers
       this.registerAllLayers();
       //设置场景内容
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
        const testObject = GameObject.create(this.ecscontext, 'testObject');
        testObject.addAs(BitmapComponent);
    }

    public addToLayer0(displayObject: egret.DisplayObject, childIndex?: number): void {
        this.addToLayer(this.layer0, displayObject, childIndex);
    }   
}

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
        const posx = gamecontext.stage.stageWidth/2;
        const posy = gamecontext.stage.stageHeight/2;
        for (let i = 0, length = ens.length; i < length; ++i) {
            e = ens[i] as GameObject;
            bitmapCom = e.getAs(BitmapComponent);
            if (!bitmapCom.parent) {
                scene.addToLayer0(bitmapCom, 10000);
                bitmapCom.texture = RES.getRes('egret_icon_png');
                bitmapCom.anchorOffsetX = bitmapCom.width/2;
                bitmapCom.anchorOffsetY = bitmapCom.height/2;
                bitmapCom.x = posx;
                bitmapCom.y = posy;
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

class Main extends Application<MyGameContext> {

    protected start(): void {
        this._start().catch(e => {
            egret.log(e);
        });
    } 

    private initGame(): void {
        //初始化ECS环境        
        this.createECSContext(ComponentsClassesRegister, 200);
        //初始化游戏上下文
        const gamecontext = new MyGameContext;
        this.__gamecontext__ = gamecontext;
        gamecontext.clear();
        gamecontext.setRoot(this);
        //
        gamecontext.changeScene(new TestScene(this.__ecscontext__, gamecontext, 'TestScene'));
    }

    private async _start() {
        await this.loadResource();
        this.initGame();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            const stage = this.stage;
            stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            stage.removeChild(loadingView);
        }
        catch (e) {
            egret.error(e);
        }
    }
}
