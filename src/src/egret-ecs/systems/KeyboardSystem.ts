//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

const DEBUG_KEYBOARD: boolean = false;


class KeyboardSystem extends GameSystem<MyGameContext> implements entitas.IInitializeSystem, entitas.IExecuteSystem, entitas.ISetPool {

    public setPool(pool: entitas.Pool): void {
    }

    public initialize(): any {
        const gamecontext = this.gamecontext;
        gamecontext.activeKeyboard();
        gamecontext.onKeyBoardDown.add(this.onKeyboradDown);
        gamecontext.onKeyBoardUp.add(this.onKeyboradUp);
    }

    public execute(): void {
        if (DEBUG_KEYBOARD) {
            const gamecontext = this.gamecontext;
            const ks = gamecontext.keystate;
            let tt: string = '';
            for (let s in ks) {
                tt += s;
                tt += ';'
            }
            if (tt.length > 0) {
                egret.log('key down = ' + tt);
            }
        }
    }

    private onKeyboradDown = (data: string[]): void => {
        let kv = '';
        const gamecontext = this.gamecontext;
        for (let i = 0, length = data.length; i < length; ++i) {
            kv = data[i] as string;
            gamecontext.keystate[kv] = true;
        }
    }

    private onKeyboradUp = (data: string[]): void => {
        let kv = '';
        const gamecontext = this.gamecontext;
        for (let i = 0, length = data.length; i < length; ++i) {
            kv = data[i] as string;
            delete gamecontext.keystate[kv];
            if (DEBUG_KEYBOARD) {
                egret.log('key up = ' + kv);
            }
        }
    }
}