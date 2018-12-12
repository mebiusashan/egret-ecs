//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 单一游戏系统
 */
class GameSystem<T extends GameContext > {
    protected ecscontext: EntitasContext | null = null;
    protected gamecontext: T | null = null;
    constructor(ecscontext: EntitasContext, gameContext: T) {
        this.ecscontext = ecscontext;
        this.gamecontext = gameContext;
    }
}