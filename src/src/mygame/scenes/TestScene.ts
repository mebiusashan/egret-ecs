//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


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
        MyGameObjectFactory.getInstance().setBuilder(new MyGameObjectBuilder(this.ecscontext));
        const testObject = MyGameObjectFactory.getInstance().createTestGameObject();
        //testObject.builder.addDestroy();
    }

    public addToLayer0(displayObject: egret.DisplayObject, childIndex?: number): void {
        this.addToLayer(this.layer0, displayObject, childIndex);
    }   
}

