//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


interface IData {
    restore: () => void;
}

interface IView {
    removeView: () => void;
}

class GameEntity extends entitas.Entity {

    public readonly ecscontext: EntitasContext | null = null;

    protected constructor(componentsEnum, totalComponents, ecsctx: EntitasContext) {
        super(componentsEnum, totalComponents);
        this.ecscontext = ecsctx;
    }

    public active(): GameEntity {
        this.onComponentRemoved.add(this.$onComponentRemoved);
        return this;
    }

    private $onComponentRemoved = (entity: entitas.Entity, index: number, previousComponent: entitas.IComponent): void => {
        const cast: entitas.IComponent | any = previousComponent;
        if (cast['restore']) {
            cast['restore']();
        }
        if (cast['removeView']) {
            cast['removeView']();
        }
        this.ecscontext.restoreAs(previousComponent);
    }

    public addAs<T>(klass: new () => T): T | null {
        if (!this.ecscontext) {
            return null;
        }
        const cid: number = this.ecscontext.cid(klass);
        const resAsCom = this.ecscontext.createAs(klass);
        this.addComponent(cid, resAsCom as entitas.IComponent);
        return resAsCom;
    }

    public getAs<T>(klass: new () => T): T {
        const cid: number = this.ecscontext.cid(klass);
        return this.getComponent(cid) as T;
    }

    public removeAs<T>(klass: new () => T): GameEntity {
        const cid: number = this.ecscontext.cid(klass);
        if (this.hasComponent(cid)) {
            this.removeComponent(cid);
        }
        return this;
    }

    public hasAs<T>(klass: new () => T): T | null {
        const cid: number = this.ecscontext.cid(klass);
        if (this.hasComponent(cid)) {
            return this.getComponent(cid) as T;
        }
        return null;
    }
}