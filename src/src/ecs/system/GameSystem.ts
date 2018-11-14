//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 单一游戏系统
 */
class GameSystem {
    protected ecscontext: EntitasContext | null = null;
    protected gamecontext: GameContext | null = null;
    constructor(ecscontext: EntitasContext, gameContext: GameContext) {
        this.ecscontext = ecscontext;
        this.gamecontext = gameContext;
    }
}