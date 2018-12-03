//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var utils;
(function (utils) {
    // 角度为 a, 则弧度为(a/180)*π;
    // 弧度为 a, 则角度为(a*180) /π;
    function dot(axisA, axisB) {
        return axisA[0] * axisB[0] + axisA[1] * axisB[1];
    }
    utils.dot = dot;
    function v2_dot(axisA, axisB) {
        return axisA.x * axisB.x + axisA.y * axisB.y;
    }
    utils.v2_dot = v2_dot;
    function v2_normalize(out, v2) {
        var x = v2.x;
        var y = v2.y;
        var len = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.setTo(x * len, y * len);
        }
        return out;
    }
    utils.v2_normalize = v2_normalize;
    function v2_angle(a, b) {
        var x1 = a.x;
        var y1 = a.y;
        var x2 = b.x;
        var y2 = b.y;
        var len1 = x1 * x1 + y1 * y1;
        if (len1 > 0) {
            len1 = 1 / Math.sqrt(len1);
        }
        var len2 = x2 * x2 + y2 * y2;
        if (len2 > 0) {
            len2 = 1 / Math.sqrt(len2);
        }
        var cosine = (x1 * x2 + y1 * y2) * len1 * len2;
        egret.log('cosine = ' + cosine);
        if (cosine > 1.0) {
            return 0;
        }
        else if (cosine < -1.0) {
            return Math.PI;
        }
        return Math.acos(cosine);
    }
    utils.v2_angle = v2_angle;
    function v2_angle1(v1, v2) {
        //需要注意的是：atan2的取值范围是[−π,π]，在进行相减之后得到的夹角是在[−2π,2π]，因此当得到的结果大于π时，对结果减去2π，当结果小于−π时，对结果加上2π
        var m2 = Math.atan2(v2.y, v2.x);
        var m1 = Math.atan2(v1.y, v1.x);
        var a = m2 - m1;
        var pi = Math.PI;
        if (a > pi) {
            a -= pi * 2;
        }
        else if (a < -pi) {
            a += pi * 2;
        }
        return a;
    }
    utils.v2_angle1 = v2_angle1;
    function v2_squaredDistance(a, b) {
        var x = b.x - a.x;
        var y = b.y - a.y;
        return x * x + y * y;
    }
    utils.v2_squaredDistance = v2_squaredDistance;
    function checkDistance(view1, view2, limit) {
        var x1 = view1.x;
        var y1 = view1.y;
        var x2 = view2.x;
        var y2 = view2.y;
        var x = Math.pow((x1 - x2), 2);
        var y = Math.pow((y1 - y2), 2);
        var distance = Math.pow((x + y), 0.5);
        if (!(distance <= limit)) {
            return false;
        }
        else {
            return distance;
        }
    }
    utils.checkDistance = checkDistance;
})(utils || (utils = {}));
