//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

module utils {
    const goldUnit: Array<string> = ['', 'K', 'M', 'B', 'T', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WWW', 'XX', 'YY', 'ZZ'];
    export function numberToUnitString(value: number): string {
        let z: number = Math.floor(value);
        if (z < 10000) {
            return z.toString();
        }

        let unit: number = 0;
        let nextZ: number = z / 1000;
        while (z >= 1000) {
            z = nextZ;
            unit++;
            nextZ = nextZ / 1000;
        }
        return z.toFixed(1).toString() + goldUnit[unit];
    }

    export function SecToString(sec: number): string {
        let minute: number = Math.floor(sec % 60);
        let hour: number = Math.floor(sec / 60);
        let str: string = hour < 10 ? "0" + hour : hour.toString();
        str += ":";
        str += minute < 10 ? "0" + minute : minute.toString();
        return str;
    }
}