//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var utils;
(function (utils) {
    function concatArr(targetArr) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var arr = [];
        for (var i = 1, length_1 = arguments.length; i < length_1; ++i) {
            arr = arguments[i];
            Array.prototype.push.apply(targetArr, arr);
        }
    }
    utils.concatArr = concatArr;
    function spliceArr(arr, index, num) {
        var len = arr.length;
        for (var i = index + num; i < len; ++i) {
            arr[i - num] = arr[i];
        }
        arr.length = len - num;
    }
    utils.spliceArr = spliceArr;
    /**
     * Randomly returns an element from an array
     * @param arr the array
     * @returns {any} result
     */
    function randomArray(arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
    utils.randomArray = randomArray;
    function copy(obj) {
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    }
    utils.copy = copy;
    function deepCopy(obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = deepCopy(obj[attr]);
        }
        return newobj;
    }
    utils.deepCopy = deepCopy;
    function numberToFloorString(value) {
        var z = value;
        return Math.floor(z).toString();
    }
    utils.numberToFloorString = numberToFloorString;
    function ObjectToKeyValue(obj) {
        var str = "";
        for (var attr in obj) {
            str += attr + "=" + obj[attr].toString();
            str += "&";
        }
        return str.slice(0, str.length - 1);
    }
    utils.ObjectToKeyValue = ObjectToKeyValue;
})(utils || (utils = {}));
