//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class GameObject extends GameEntity {

    //static readonly ZeroPosition = new egret.Point(0, 0);

    public static create(ecsctx: EntitasContext, name: string): GameObject {
        if (!ecsctx) {
            return null;
        }
        const pool = ecsctx.pool;
        if (pool._reusableEntities.size() === 0) {
            const entity: GameObject = new GameObject(pool._componentsEnum, pool._totalComponents, ecsctx);
            pool._reusableEntities.add(entity);
        }
        return (pool.createEntity(name).active()) as GameObject;
    }

    public static destroy(gameObject: GameObject): void {
        if (gameObject && gameObject._isEnabled) {
            gameObject.ecscontext.pool.destroyEntity(gameObject);
        }
    }

    private constructor(componentsEnum, totalComponents, ecsctx: EntitasContext) {
        super(componentsEnum, totalComponents, ecsctx);
    }

    public setDestroy(): GameObject {
        if (!this.hasAs(DestroyComponent)) {
            this.addAs(DestroyComponent);
        }
        return this;
    }

}