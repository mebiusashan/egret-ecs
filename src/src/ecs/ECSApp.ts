//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

let __ecscontext__: EntitasContext | null = null;

/**
 * 框架入口
 */
class ECSApp extends egret.DisplayObjectContainer {

    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event): void {
        this.initialize();
    }

    protected initialize(): void {

    }

    
}