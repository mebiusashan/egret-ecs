//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 多游戏系统
 */
class GameSystems<T extends GameContext> extends entitas.Systems {
    protected ecscontext: EntitasContext | null = null;
    protected gamecontext: T | null = null;
    constructor(ecscontext: EntitasContext, gameContext: T) {
        super();
        this.ecscontext = ecscontext;
        this.gamecontext = gameContext;
    }

    private checkSystemAddedRepeatedly(system: any): boolean {
        let sys = null;
        let sameClass = false;
        const initializeSys = this._initializeSystems;
        for (let i = initializeSys.length - 1; i >= 0; --i) {
            sys = initializeSys[i];
            if ('function' === typeof system) {
                sameClass = sys instanceof system;
            }
            else {
                sameClass = (sys.constructor === system.constructor);
            }
            if (sameClass) {
                egret.error('repeat add initialize system = ' + egret.getQualifiedClassName(system));
                return true;
            }
        }
        const executeSys = this._executeSystems;
        for (let i = executeSys.length - 1; i >= 0; --i) {
            sys = executeSys[i];
            if ('function' === typeof system) {
                sameClass = sys instanceof system;
            }
            else {
                sameClass = (sys.constructor === system.constructor);
            }
            if (sameClass) {
                egret.error('repeat add execute system = ' + egret.getQualifiedClassName(system));
                return true;
            }
        }
        return false;
    }

    public add(system: any): void {
        if (!this.checkSystemAddedRepeatedly(system)) {
            super.add(system);
        }
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
            egret.error('This function has not been implemented yet');
        }
    }

    private as(object, method) {
        return method in object ? object : null;
    }
}