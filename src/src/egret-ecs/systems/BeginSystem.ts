//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


class BeginSystem extends GameSystem<MyGameContext> implements entitas.IExecuteSystem, entitas.ISetPool {
    private group1: entitas.Group | null = null;
    public execute(): void {
        const se = this.group1.getSingleEntity() as GameObject;
        if (!se) {
            return;
        }
        const camera2dCom = se.getAs(Camera2dComponent);
        const positionCom = se.getAs(PositionComponent);
        if (camera2dCom.lastCameraX !== positionCom.x || camera2dCom.lastCameraY !== positionCom.y) {
            camera2dCom.lastCameraX = positionCom.x;
            camera2dCom.lastCameraY = positionCom.y;
            camera2dCom.viewChanged = true;
        }
    }

    public setPool(pool: entitas.Pool): void {
        const ids = this.ecscontext.ids; 
        this.group1 = pool.getGroup(entitas.Matcher.allOf(ids.Camera2dComponent, ids.PositionComponent));
    }
}