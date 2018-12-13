//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


/**
 * 游戏场景
 */

const DEBUG_VIEW_LAYER = 10000;

class GameScene<T extends GameContext> extends egret.DisplayObjectContainer {

    protected ecscontext: EntitasContext | null = null;
    protected gamecontext: T | null = null;
    protected debugViewLayer: egret.DisplayObjectContainer | null = null;

    constructor(ecscontext: EntitasContext, gamecontext: T, name?: string) {
        super();
        this.ecscontext = ecscontext;
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

    protected registerDebugViewLayer(): egret.DisplayObjectContainer {
        this.debugViewLayer = this.registerLayer(DEBUG_VIEW_LAYER, 'DEBUG_VIEW_LAYER');
        return this.debugViewLayer;
    }

    public addToDebugViewLayer(displayObject: egret.DisplayObject, childIndex?: number): void {
        if (this.debugViewLayer) {
            this.addToLayer(this.debugViewLayer, displayObject, childIndex);
        }
    }

    protected addToLayer(target: egret.DisplayObjectContainer, displayObject: egret.DisplayObject, childIndex?: number): void {
        if (target) {
            if (displayObject.parent !== target) {
                target.addChild(displayObject);
            }
            if (childIndex !== undefined) {
                target.setChildIndex(displayObject, childIndex);
            }
        }
    }
}