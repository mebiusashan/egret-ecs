//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 多游戏系统
 */
class GameSystems extends entitas.Systems {
    protected ecscontext: EntitasContext | null = null;
    protected gamecontext: GameContext | null = null;
    constructor(ecscontext: EntitasContext, gameContext: GameContext) {
        super();
        this.ecscontext = ecscontext;
        this.gamecontext = gameContext;
    }

    public removeSystem(klass: any): void {
        if ('function' === typeof klass) {
            let sys = null;
            let sys1 = null;
            const initializeSys = this._initializeSystems;
            for (let i = initializeSys.length - 1; i >= 0; --i) {
                sys = initializeSys[i];
                if (sys instanceof klass) {
                    initializeSys.splice(i, 1);
                }
            }
            const executeSys = this._executeSystems;
            for (let i = executeSys.length - 1; i >= 0; --i) {
                sys = executeSys[i];
                if (sys instanceof klass) {
                    sys1 = this.as(sys, 'subsystem');
                    if (sys1 != null) {
                        sys1.clear();
                    }
                    sys1 = this.as(sys, 'clearReactiveSystems');
                    if (sys1 != null) {
                        sys1.clearReactiveSystems();
                    }
                    executeSys.splice(i, 1);
                }
            }
        }
        else {
        }
    }

    private as(object, method) {
        return method in object ? object : null;
    }
}