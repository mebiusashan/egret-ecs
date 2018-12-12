//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////

module utils {
    export function concatArr(targetArr, ...args): void {
        let arr = [];
        for (let i = 1, length = arguments.length; i < length; ++i) {
            arr = arguments[i];
            Array.prototype.push.apply(targetArr, arr);
        }
    }

    export function spliceArr(arr, index, num): void {
        const len = arr.length;
        for (let i = index + num; i < len; ++i) {
            arr[i - num] = arr[i];
        }
        arr.length = len - num;
    }

    /**
     * Randomly returns an element from an array
     * @param arr the array
     * @returns {any} result
     */
    export function randomArray(arr: Array<any>): any {
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    export function copy(obj: Object): Object {
        let newobj = {};
        for (let attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    }

    export function deepCopy(obj: Object): Object {
        if (typeof obj !== 'object') {
            return obj;
        }
        let newobj = {};
        for (let attr in obj) {
            newobj[attr] = deepCopy(obj[attr]);
        }
        return newobj;
    }

    export function numberToFloorString(value: number): string {
        let z: number = value;
        return Math.floor(z).toString();
    }

    export function ObjectToKeyValue(obj: Object): string {
        let str: string = "";
        for (let attr in obj) {
            str += attr + "=" + obj[attr].toString();
            str += "&";
        }
        return str.slice(0, str.length - 1);
    }
}