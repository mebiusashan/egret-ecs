//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


/**
 * 游戏场景
 */
class GameScene extends egret.DisplayObjectContainer {

    protected gamecontext: GameContext | null = null;

    constructor(gamecontext: GameContext, name?: string) {
        super();
        this.gamecontext = gamecontext;
        this.name = name;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }

    private onAddToStage(event: egret.Event): void {
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
        console.log('enterScene = ' + this.name);
        this.enterScene();
    }

    private onRemovedFromStage(event: egret.Event): void {
        egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
        console.log('exitScene = ' + this.name);
        this.exitScene();
    }

    private onEnterFrame(advancedTime: number): void {
        const ctx = this.gamecontext;
        //debug
        if (advancedTime > 1000 / 30) {
            advancedTime = 1000 / 30;
        }
        ctx.dtMs = advancedTime;
        ctx.dtSec = advancedTime / 1000;
        this.updateScene();
    }

    protected enterScene(): void {
    }

    protected exitScene(): void {
    }

    protected updateScene(): void {
    }

    protected registerLayer(layerOrder: number, name?: string): egret.DisplayObjectContainer {
        const layer = new egret.DisplayObjectContainer();
        this.addChild(layer);
        layer.name = name;
        this.setChildIndex(layer, layerOrder);
        return layer;
    }
}