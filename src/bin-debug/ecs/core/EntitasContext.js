//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ECS上下文环境
 */
var EntitasContext = (function () {
    function EntitasContext(register, maxEntitiesNum) {
        this.$pool = null;
        this.componentPools = null;
        this.ids = {};
        this.initialize(register, maxEntitiesNum);
    }
    Object.defineProperty(EntitasContext.prototype, "pool", {
        get: function () {
            if (!this.$pool) {
                this.$pool = new entitas.Pool(this.ids, this.ids.totalComponents);
                entitas.viewer.VisualDebugging.init(this.$pool);
            }
            return this.$pool;
        },
        enumerable: true,
        configurable: true
    });
    EntitasContext.prototype.initialize = function (register, maxEntitiesNum) {
        if (!register) {
            return;
        }
        for (var i = 0, length_1 = register.length; i < length_1; ++i) {
            var comClass = register[i];
            comClass['cid'] = i;
            var className = egret.getQualifiedClassName(comClass);
            this.ids[this.ids[className] = i] = className;
        }
        this.ids[this.ids['totalComponents'] = register.length] = 'totalComponents';
        //初始化this.componentPools
        this.componentPools = new Array(register.length);
        for (var i = 0, length_2 = this.componentPools.length; i < length_2; ++i) {
            console.log(i + ':' + this.ids[i]);
            this.componentPools[i] = new entitas.utils.Bag();
        }
        //初始化entitas环境
        console.log('entities = ' + maxEntitiesNum + ' components = ' + register.length);
        entitas.Entity.initialize(register.length, { "entities": maxEntitiesNum, "components": register.length });
    };
    EntitasContext.prototype.clearComponentPools = function () {
        if (!this.componentPools) {
            return;
        }
        for (var i = 0, length_3 = this.componentPools.length; i < length_3; ++i) {
            egret.log(i + ':' + this.ids[i] + ' clear');
            this.componentPools[i].clear();
        }
    };
    EntitasContext.prototype.cid = function (klass) {
        return klass.cid;
    };
    EntitasContext.prototype.createAs = function (klass) {
        if (!this.componentPools) {
            return null;
        }
        var cid = this.cid(klass);
        var pl = this.componentPools[cid];
        var resAsT = pl.size() > 0 ? pl.removeLast() : new klass();
        resAsT['pid'] = cid;
        return resAsT;
    };
    EntitasContext.prototype.prestorageAs = function (klass, count, clear) {
        if (!this.componentPools) {
            return;
        }
        var cid = this.cid(klass);
        var pl = this.componentPools[cid];
        if (clear) {
            pl.clear();
        }
        for (var i = 0; i < count; ++i) {
            pl.add(new klass);
        }
        console.log('prestorageAs ' + egret.getQualifiedClassName(klass) + ' = ' + count);
    };
    EntitasContext.prototype.restoreAs = function (com) {
        if (!this.componentPools) {
            return;
        }
        var cid = com.pid;
        this.componentPools[cid].add(com);
    };
    return EntitasContext;
}());
__reflect(EntitasContext.prototype, "EntitasContext");
