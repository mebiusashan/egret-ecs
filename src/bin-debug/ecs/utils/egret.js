//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var utils;
(function (utils) {
    /**
     * Create a Bitmap object according to name keyword.
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    utils.createBitmapByName = createBitmapByName;
    function setStageTouchChildren(boo) {
        egret.MainContext.instance.stage.touchChildren = boo;
    }
    utils.setStageTouchChildren = setStageTouchChildren;
    function removeFromParent(child) {
        if (child && child.parent) {
            child.parent.removeChild(child);
        }
    }
    utils.removeFromParent = removeFromParent;
    function addStageResizeListener(func, thisObj) {
        egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, func, thisObj);
    }
    utils.addStageResizeListener = addStageResizeListener;
    function removeStageResizeListener(func, thisObj) {
        egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, func, thisObj);
    }
    utils.removeStageResizeListener = removeStageResizeListener;
    function removeChild(dis) {
        if (dis && dis.parent) {
            dis.parent.removeChild(dis);
        }
    }
    utils.removeChild = removeChild;
})(utils || (utils = {}));
