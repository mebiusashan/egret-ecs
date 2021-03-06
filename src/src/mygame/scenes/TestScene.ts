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
    private testSystem: TestSystem | null = null;

    protected enterScene(): void {
        //这次layers
        this.registerAllLayers();
        //设置场景内容
        this.createScene();
    }

    private registerAllLayers(): void {
        this.layer0 = this.registerLayer(TestSceneLayer.LAYER0, 'LAYER0');
        this.layer1 = this.registerLayer(TestSceneLayer.LAYER1, 'LAYER1');
        this.registerDebugViewLayer();
    }

    protected exitScene(): void {
    }

    protected updateScene(): void {
        if (this.testSystem) {
            this.testSystem.execute();
        }
    }

    private createScene(): void {
        //
        const testSystem = new TestSystem(this.ecscontext, this.gamecontext);
        this.testSystem = testSystem;
        testSystem.setPool(this.ecscontext.pool);
        testSystem.initialize();
        //
        const gamecontext = this.gamecontext;
        const posx = gamecontext.stage.stageWidth/2;
        const posy = gamecontext.stage.stageHeight/2 + 500;
        MyGameObjectFactory.getInstance().setBuilder(new MyGameObjectBuilder(this.ecscontext));
        const testObject1 = MyGameObjectFactory.getInstance().createTestGameObject(posx, posy);
        //const testObject2 = MyGameObjectFactory.getInstance().createTestGameObject(posx + 200, posy);
        this.testTileMap();
    }

    private testTileMap(): void {
        const col = 4;
        const row = 3;
        const gridsize = 200;
        const testTiledMap = MyGameObjectFactory.getInstance().createTestTiledMap('TiledMap');
        const tiledMapCom = testTiledMap.getAs(TiledMapComponent);
        const tlm = tiledMapCom.o;
        const layer = new TiledMapLayer('testlayer', tlm, row, col, gridsize, gridsize);
        tlm.addTiledMapLayer(layer);
        for (let i = 0; i < col; ++i) {
            for (let j = 0; j < row; ++j) {
                layer.addGrid(j, i);
            }
        }
    }

    public addToLayer0(displayObject: egret.DisplayObject, childIndex?: number): void {
        this.addToLayer(this.layer0, displayObject, childIndex);
    }

    public addToLayer1(displayObject: egret.DisplayObject, childIndex?: number): void {
        this.addToLayer(this.layer1, displayObject, childIndex);
    }
}

