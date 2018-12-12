//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class Main extends Application<MyGameContext> {

    protected start(): void {
        this._start().catch(e => {
            egret.log(e);
        });
    } 

    private startGame(): void {
        //初始化ECS环境        
        this.createECSContext(ComponentsClassesRegister.concat(MyComponentsClassesRegister), 200);
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
        this.startGame();
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
