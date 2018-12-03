//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 框架入口
 */
class ECSApp<T extends GameContext> extends egret.DisplayObjectContainer {

    protected __ecscontext__: EntitasContext | null = null;
    protected __gamecontext__: T | null = null;

    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event): void {
        this.start();
    }

    protected start(): void {
        //在这里写实现。。。。。。
    }   

    protected createECSContext(register: Array<entitas.IComponent> | null, maxEntitiesNum: number): EntitasContext {
        if (this.__ecscontext__) {
            this.__ecscontext__.clearComponentPools();
            this.__ecscontext__ = null;
        }
        this.__ecscontext__ = new EntitasContext(register, maxEntitiesNum);
        return this.__ecscontext__;
    }
}