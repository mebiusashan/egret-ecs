//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


class PositionComponent implements entitas.IComponent, IData {
    
    private _x: number = 0;
    private _y: number = 0;
    public lastx: number = 0;
    public lasty: number = 0;

    public restore(): void {
        this._x = 0;
        this._y = 0;
        this.lastx = 0;
        this.lasty = 0;
    }

    public set x(value: number){
        this.lastx = this._x;
        this._x = value;
    }

    public get x(): number {
        return this._x;
    }

    public set y(value: number){
        this.lasty = this._y;
        this._y = value;
    }

    public get y(): number {
        return this._y;
    }
}