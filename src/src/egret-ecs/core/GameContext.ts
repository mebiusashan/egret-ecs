//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


/**
 * 游戏核心上下文
 */
class GameContext {

    public dtMs: number = 0;
    public dtSec: number = 0;
    public main: egret.DisplayObjectContainer | null = null;
    public stage: egret.Stage | null = null;
    public gameScene: egret.DisplayObjectContainer | null = null;

    public setRoot(main: egret.DisplayObjectContainer): GameContext {
        this.main = main;
        this.stage = main.stage;
        return this;
    }

    public clear(): GameContext {
        return this;
    }

    public changeScene(target: egret.DisplayObjectContainer): boolean {
        if (!target || !this.main) {
            return false;
        }
        const scn = this.gameScene;
        if (scn && scn.parent) {
            scn.parent.removeChild(scn);
        }
        this.gameScene = target;
        this.main.addChild(target);
        return true;
    }
}