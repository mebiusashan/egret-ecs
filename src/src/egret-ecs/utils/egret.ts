//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

module utils {
    /**
     * Create a Bitmap object according to name keyword.
     */
    export function createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    export function setStageTouchChildren(boo: boolean): void {
        egret.MainContext.instance.stage.touchChildren = boo;
    }

    export function removeFromParent(child: egret.DisplayObject): void {
        if (child && child.parent) {
            child.parent.removeChild(child);
        }
    }

    export function addStageResizeListener(func: Function, thisObj: any) {
        egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, func, thisObj);
    }

    export function removeStageResizeListener(func: Function, thisObj: any) {
        egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, func, thisObj);
    }

    export function removeChild(dis: egret.DisplayObject): void {
        if (dis && dis.parent) {
            dis.parent.removeChild(dis);
        }
    }
}