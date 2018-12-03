//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(componentsEnum, totalComponents, ecsctx) {
        return _super.call(this, componentsEnum, totalComponents, ecsctx) || this;
    }
    //static readonly ZeroPosition = new egret.Point(0, 0);
    GameObject.create = function (ecsctx, name) {
        if (!ecsctx) {
            return null;
        }
        var pool = ecsctx.pool;
        if (pool._reusableEntities.size() === 0) {
            var entity = new GameObject(pool._componentsEnum, pool._totalComponents, ecsctx);
            pool._reusableEntities.add(entity);
        }
        return (pool.createEntity(name).active());
    };
    GameObject.destroy = function (gameObject) {
        if (gameObject && gameObject._isEnabled) {
            gameObject.ecscontext.pool.destroyEntity(gameObject);
        }
    };
    GameObject.prototype.setDestroy = function () {
        if (!this.hasAs(DestroyComponent)) {
            this.addAs(DestroyComponent);
        }
        return this;
    };
    return GameObject;
}(GameEntity));
__reflect(GameObject.prototype, "GameObject");
