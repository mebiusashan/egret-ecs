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
var GameEntity = (function (_super) {
    __extends(GameEntity, _super);
    function GameEntity(componentsEnum, totalComponents, ecsctx) {
        var _this = _super.call(this, componentsEnum, totalComponents) || this;
        _this.ecscontext = null;
        _this.$onComponentRemoved = function (entity, index, previousComponent) {
            var cast = previousComponent;
            if (cast['restore']) {
                cast['restore']();
            }
            if (cast['removeView']) {
                cast['removeView']();
            }
            _this.ecscontext.restoreAs(previousComponent);
        };
        _this.ecscontext = ecsctx;
        return _this;
    }
    GameEntity.prototype.active = function () {
        this.onComponentRemoved.add(this.$onComponentRemoved);
        return this;
    };
    GameEntity.prototype.addAs = function (klass) {
        if (!this.ecscontext) {
            return null;
        }
        var cid = this.ecscontext.cid(klass);
        var resAsCom = this.ecscontext.createAs(klass);
        this.addComponent(cid, resAsCom);
        return resAsCom;
    };
    GameEntity.prototype.getAs = function (klass) {
        var cid = this.ecscontext.cid(klass);
        return this.getComponent(cid);
    };
    GameEntity.prototype.removeAs = function (klass) {
        var cid = this.ecscontext.cid(klass);
        if (this.hasComponent(cid)) {
            this.removeComponent(cid);
        }
        return this;
    };
    GameEntity.prototype.hasAs = function (klass) {
        var cid = this.ecscontext.cid(klass);
        if (this.hasComponent(cid)) {
            return this.getComponent(cid);
        }
        return null;
    };
    return GameEntity;
}(entitas.Entity));
__reflect(GameEntity.prototype, "GameEntity");
