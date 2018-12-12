//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class GameObject extends GameEntity {

    private _builder: GameObjectBuilder | null = null;

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
            gameObject.clear();
            gameObject.ecscontext.pool.destroyEntity(gameObject);
        }
    }

    private constructor(componentsEnum, totalComponents, ecsctx: EntitasContext) {
        super(componentsEnum, totalComponents, ecsctx);
    }

    private clear(): void {
        this._builder = null;
    }

    public set builder(value: GameObjectBuilder) {
        this._builder = value;
    }

    public get builder(): GameObjectBuilder {
        if (!this._builder) {
            egret.warn('this._builder is null, new GameObjectBuilder is not good');
            this._builder = new GameObjectBuilder(this.ecscontext);
            this._builder.set(this);
        }
        return this._builder;
    }
}
