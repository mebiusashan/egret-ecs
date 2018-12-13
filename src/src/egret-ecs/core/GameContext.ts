//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


/**
 * 游戏核心上下文
 */


interface KeyboradDown { (data: any[]): void; }
interface IKeyboradDown<T> extends entitas.utils.ISignal<T> {
    dispatch(data: any[]): void;
}

interface KeyboradUp { (data: any[]): void; }
interface IKeyboradUp<T> extends entitas.utils.ISignal<T> {
    dispatch(data: any[]): void;
}


class GameContext {

    public dtMs: number = 0;
    public dtSec: number = 0;
    public main: egret.DisplayObjectContainer | null = null;
    public stage: egret.Stage | null = null;
    public gameScene: egret.DisplayObjectContainer | null = null;
    public keyboard: Keyboard | null = null;
    public readonly keystate: any = {};
    public readonly onKeyBoardDown: IKeyboradDown<KeyboradDown> = new entitas.utils.Signal<KeyboradDown>(this);
    public readonly onKeyBoardUp: IKeyboradUp<KeyboradUp> = new entitas.utils.Signal<KeyboradUp>(this);

    public setRoot(main: egret.DisplayObjectContainer): GameContext {
        this.main = main;
        this.stage = main.stage;
        return this;
    }

    public clear(): GameContext {
        this.onKeyBoardDown.clear();
        this.onKeyBoardUp.clear();
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

    public activeKeyboard(): Keyboard {
        this.keyboard = new Keyboard;
        this.keyboard.addEventListener(Keyboard.onKeyDown, this.onkeydown, this);
        this.keyboard.addEventListener(Keyboard.onKeyUp, this.onkeyup, this);
        return this.keyboard;
    }

    private onkeydown = (event) => {
        if (this.keyboard) {
            this.onKeyBoardDown.dispatch(event.data);
        }
        else {
            egret.error('keyboard is null');
        }
    }

    private onkeyup = (event) => {
        if (this.keyboard) {
            this.onKeyBoardUp.dispatch(event.data);
        }
        else {
            egret.error('keyboard is null');
        }
    }
}