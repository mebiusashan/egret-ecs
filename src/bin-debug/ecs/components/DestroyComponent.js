//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 销毁
 */
var DestroyComponent = (function () {
    function DestroyComponent() {
    }
    DestroyComponent.prototype.restore = function () {
    };
    return DestroyComponent;
}());
__reflect(DestroyComponent.prototype, "DestroyComponent", ["entitas.IComponent", "IRestore"]);
