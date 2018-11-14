//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * ECS上下文环境
 */
class EntitasContext {

    private $pool: entitas.Pool | null = null;
    private componentPools: Array<entitas.utils.Bag<entitas.IComponent>> | null = null;
    public readonly ids: any | null = {};

    constructor(register: Array<entitas.IComponent> | null, maxEntitiesNum: number) {
        this.initialize(register, maxEntitiesNum);
    }

    public get pool(): any {
        if (!this.$pool) {
            this.$pool = new entitas.Pool(this.ids, this.ids.totalComponents);
            entitas.viewer.VisualDebugging.init(this.$pool);
        }
        return this.$pool;
    }

    private initialize(register: Array<entitas.IComponent> | null, maxEntitiesNum: number): void {
        if (!register) {
            return;
        }
        for (let i = 0, length = register.length; i < length; ++i) {
            const comClass: entitas.IComponent | any = register[i];
            comClass['cid'] = i;
            const className = egret.getQualifiedClassName(comClass);
            this.ids[this.ids[className] = i] = className;
        }
        this.ids[this.ids['totalComponents'] = register.length] = 'totalComponents';
        //初始化this.componentPools
        this.componentPools = new Array(register.length);
        for (let i = 0, length = this.componentPools.length; i < length; ++i) {
            console.log(i + ':' + this.ids[i]);
            this.componentPools[i] = new entitas.utils.Bag();
        }
        //初始化entitas环境
        console.log('entities = ' + maxEntitiesNum + ' components = ' + register.length);
        entitas.Entity.initialize(register.length, { "entities": maxEntitiesNum, "components": register.length });
    }

    public clearComponentPools(): void {
        if (!this.componentPools) {
            return;
        }
        for (let i = 0, length = this.componentPools.length; i < length; ++i) {
            egret.log(i + ':' + this.ids[i] + ' clear');
            this.componentPools[i].clear();
        }
    }

    public cid<T>(klass: new () => T): number {
        return (klass as any).cid;
    }

    public createAs<T>(klass: new () => T): T | null {
        if (!this.componentPools) {
            return null;
        }
        const cid: number = this.cid(klass);
        const pl = this.componentPools[cid];
        const resAsT: T | any = pl.size() > 0 ? (pl.removeLast() as T) : new klass();
        resAsT['pid'] = cid;
        return resAsT;
    }

    public prestorageAs<T>(klass: new () => T, count: number, clear: boolean): void {
        if (!this.componentPools) {
            return;
        }
        const cid: number = this.cid(klass);
        const pl = this.componentPools[cid];
        if (clear) {
            pl.clear();
        }
        for (let i = 0; i < count; ++i) {
            pl.add(new klass as T);
        }
        console.log('prestorageAs ' + egret.getQualifiedClassName(klass) + ' = ' + count);
    }

    public restoreAs<T>(com: T): void {
        if (!this.componentPools) {
            return;
        }
        const cid: number = (com as any).pid;
        this.componentPools[cid].add(com);
    }
}