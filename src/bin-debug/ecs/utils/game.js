//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////
var utils;
(function (utils) {
    var goldUnit = ['', 'K', 'M', 'B', 'T', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WWW', 'XX', 'YY', 'ZZ'];
    function numberToUnitString(value) {
        var z = Math.floor(value);
        if (z < 10000) {
            return z.toString();
        }
        var unit = 0;
        var nextZ = z / 1000;
        while (z >= 1000) {
            z = nextZ;
            unit++;
            nextZ = nextZ / 1000;
        }
        return z.toFixed(1).toString() + goldUnit[unit];
    }
    utils.numberToUnitString = numberToUnitString;
    function SecToString(sec) {
        var minute = Math.floor(sec % 60);
        var hour = Math.floor(sec / 60);
        var str = hour < 10 ? "0" + hour : hour.toString();
        str += ":";
        str += minute < 10 ? "0" + minute : minute.toString();
        return str;
    }
    utils.SecToString = SecToString;
})(utils || (utils = {}));
