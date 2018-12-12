//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

module utils {
    // 角度为 a, 则弧度为(a/180)*π;
    // 弧度为 a, 则角度为(a*180) /π;
    export function dot(axisA: number[], axisB: number[]): number {
        return axisA[0] * axisB[0] + axisA[1] * axisB[1];
    }

    export function v2_dot(axisA: egret.Point, axisB: egret.Point): number {
        return axisA.x * axisB.x + axisA.y * axisB.y;
    }

    export function v2_normalize(out: egret.Point, v2: egret.Point): egret.Point {
        const x = v2.x;
        const y = v2.y;
        let len = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.setTo(x * len, y * len);
        }
        return out;
    }

    export function v2_angle(a: egret.Point, b: egret.Point): number {
        const x1 = a.x;
        const y1 = a.y;
        const x2 = b.x;
        const y2 = b.y;
        let len1 = x1 * x1 + y1 * y1;
        if (len1 > 0) {
            len1 = 1 / Math.sqrt(len1);
        }
        let len2 = x2 * x2 + y2 * y2;
        if (len2 > 0) {
            len2 = 1 / Math.sqrt(len2);
        }
        const cosine = (x1 * x2 + y1 * y2) * len1 * len2;
        egret.log('cosine = ' + cosine);
        if (cosine > 1.0) {
            return 0;
        }
        else if (cosine < -1.0) {
            return Math.PI;
        }
        return Math.acos(cosine);
    }

    export function v2_angle1(v1: egret.Point, v2: egret.Point): number {
        //需要注意的是：atan2的取值范围是[−π,π]，在进行相减之后得到的夹角是在[−2π,2π]，因此当得到的结果大于π时，对结果减去2π，当结果小于−π时，对结果加上2π
        const m2 = Math.atan2(v2.y, v2.x);
        const m1 = Math.atan2(v1.y, v1.x);
        let a = m2 - m1;
        const pi = Math.PI;
        if (a > pi) {
            a -= pi * 2;
        }
        else if (a < -pi) {
            a += pi * 2;
        }
        return a;
    }

    export function v2_squaredDistance(a: egret.Point | egret.DisplayObject, b: egret.Point | egret.DisplayObject) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        return x * x + y * y;
    }

    export function checkDistance(view1: egret.DisplayObject | egret.Point, view2: egret.DisplayObject | egret.Point, limit: number): boolean | number {
        const x1 = view1.x;
        const y1 = view1.y;
        const x2 = view2.x;
        const y2 = view2.y;
        const x = Math.pow((x1 - x2), 2);
        const y = Math.pow((y1 - y2), 2);
        const distance = Math.pow((x + y), 0.5);
        if (!(distance <= limit)) {
            return false;
        } else {
            return distance;
        }
    }
}