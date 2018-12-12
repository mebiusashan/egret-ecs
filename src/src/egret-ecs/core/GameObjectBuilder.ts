//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

class GameObjectBuilder {

    protected gameObject: GameObject | null = null;
    protected ecscontext: EntitasContext | null = null;
    
    constructor(ecscontext: EntitasContext) {
        this.ecscontext = ecscontext;
    }

    public set(gameObject: GameObject): GameObjectBuilder {
        this.clear();
        this.gameObject = gameObject;
        return this;
    }

    public get(): GameObject {
        return this.gameObject;
    }

    public clear(): GameObjectBuilder {
        this.gameObject = null;
        return this;
    }

    public create(name: string): GameObjectBuilder {
        this.clear();
        this.gameObject = GameObject.create(this.ecscontext, name);
        return this;
    }

    public addDestroy(): GameObject {
        if (!this.gameObject.hasAs(DestroyComponent)) {
            this.gameObject.addAs(DestroyComponent);
        }
        return this.gameObject;
    }
}