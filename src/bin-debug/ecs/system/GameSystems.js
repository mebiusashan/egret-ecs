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
/**
 * 多游戏系统
 */
var GameSystems = (function (_super) {
    __extends(GameSystems, _super);
    function GameSystems(ecscontext, gameContext) {
        var _this = _super.call(this) || this;
        _this.ecscontext = null;
        _this.gamecontext = null;
        _this.ecscontext = ecscontext;
        _this.gamecontext = gameContext;
        return _this;
    }
    GameSystems.prototype.removeSystem = function (klass) {
        if ('function' === typeof klass) {
            var sys = null;
            var sys1 = null;
            var initializeSys = this._initializeSystems;
            for (var i = initializeSys.length - 1; i >= 0; --i) {
                sys = initializeSys[i];
                if (sys instanceof klass) {
                    initializeSys.splice(i, 1);
                }
            }
            var executeSys = this._executeSystems;
            for (var i = executeSys.length - 1; i >= 0; --i) {
                sys = executeSys[i];
                if (sys instanceof klass) {
                    sys1 = this.as(sys, 'subsystem');
                    if (sys1 != null) {
                        sys1.clear();
                    }
                    sys1 = this.as(sys, 'clearReactiveSystems');
                    if (sys1 != null) {
                        sys1.clearReactiveSystems();
                    }
                    executeSys.splice(i, 1);
                }
            }
        }
        else {
        }
    };
    GameSystems.prototype.as = function (object, method) {
        return method in object ? object : null;
    };
    return GameSystems;
}(entitas.Systems));
__reflect(GameSystems.prototype, "GameSystems");
