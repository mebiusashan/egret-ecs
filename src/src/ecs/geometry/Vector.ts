//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

/**
 * 向量
 */
class Vector {
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * 获取当前向量的模
     */
    public get norm(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * 当前向量与标量相乘
     */
    public multiply(s: number): void {
        this.x *= s;
        this.y *= s;
    }

    /**
     * 归一化，不改变当前向量方向，使其模为1
     */
    public normalize(): void {
        if (this.norm === 0) {
            return;
        }
        this.multiply(1 / this.norm);
    }

    public negative(): void {
        this.multiply(-1);
    }

    /**
     * 复制另外一个向量的值
     */
    public copy(v: Vector): void {
        this.x = v.x;
        this.y = v.y;
    }

    /**
     * 设置向量的值
     */
    public setTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * 新建一个向量，Vector(1, 1)
     */
    public static one(): Vector {
        return new Vector(1, 1);
    }

    /**
     * 新建一个向量，Vector(0, 0)
     */
    public static zero(): Vector {
        return new Vector(0, 0);
    }

    /**
     * 新建一个向量，Vector(-1, 0)
     */
    public static left(): Vector {
        return new Vector(-1, 0);
    }

    /**
     * 新建一个向量，Vector(1, 0)
     */
    public static right(): Vector {
        return new Vector(1, 0);
    }

    /**
     * 新建一个向量，Vector(0, 1)
     */
    public static down(): Vector {
        return new Vector(0, 1);
    }

    /**
     * 新建一个向量，Vector(0, -1)
     */
    public static up(): Vector {
        return new Vector(0, -1);
    }

    /**
     * 向量加
     */
    public static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * 向量减
     */
    public static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * 向量点乘
     */
    public static dotProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * 求两个向量的夹角度数，返回角度值
     */
    public static angle(v1: Vector, v2: Vector): number {
        let a: number = Vector.dotProduct(v1, v2);
        let b: number = v1.norm * v2.norm;
        let c: number = a / b;
        let rad: number = Math.acos(c);
        let deg: number = rad * 180 / Math.PI
        return deg;
    }

    //投影
    public static projection(v1: Vector, v2: Vector): number {
        let a: number = Vector.dotProduct(v1, v2);
        return a / v2.norm;
    }

}
