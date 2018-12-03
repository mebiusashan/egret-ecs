//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 向量
 */
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector2.prototype, "norm", {
        /**
         * 获取当前向量的模
         */
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 当前向量与标量相乘
     */
    Vector2.prototype.multiply = function (s) {
        this.x *= s;
        this.y *= s;
    };
    /**
     * 归一化，不改变当前向量方向，使其模为1
     */
    Vector2.prototype.normalize = function () {
        if (this.norm === 0) {
            return;
        }
        this.multiply(1 / this.norm);
    };
    Vector2.prototype.negative = function () {
        this.multiply(-1);
    };
    /**
     * 复制另外一个向量的值
     */
    Vector2.prototype.copy = function (v) {
        this.x = v.x;
        this.y = v.y;
    };
    /**
     * 设置向量的值
     */
    Vector2.prototype.setTo = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**
     * 新建一个向量，Vector(1, 1)
     */
    Vector2.one = function () {
        return new Vector2(1, 1);
    };
    /**
     * 新建一个向量，Vector(0, 0)
     */
    Vector2.zero = function () {
        return new Vector2(0, 0);
    };
    /**
     * 新建一个向量，Vector(-1, 0)
     */
    Vector2.left = function () {
        return new Vector2(-1, 0);
    };
    /**
     * 新建一个向量，Vector(1, 0)
     */
    Vector2.right = function () {
        return new Vector2(1, 0);
    };
    /**
     * 新建一个向量，Vector(0, 1)
     */
    Vector2.down = function () {
        return new Vector2(0, 1);
    };
    /**
     * 新建一个向量，Vector(0, -1)
     */
    Vector2.up = function () {
        return new Vector2(0, -1);
    };
    /**
     * 向量加
     */
    Vector2.add = function (v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    };
    /**
     * 向量减
     */
    Vector2.subtract = function (v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    };
    /**
     * 向量点乘
     */
    Vector2.dotProduct = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    /**
     * 求两个向量的夹角度数，返回角度值
     */
    Vector2.angle = function (v1, v2) {
        var a = Vector2.dotProduct(v1, v2);
        var b = v1.norm * v2.norm;
        var c = a / b;
        var rad = Math.acos(c);
        var deg = rad * 180 / Math.PI;
        return deg;
    };
    //投影
    Vector2.projection = function (v1, v2) {
        var a = Vector2.dotProduct(v1, v2);
        return a / v2.norm;
    };
    return Vector2;
}());
__reflect(Vector2.prototype, "Vector2");
