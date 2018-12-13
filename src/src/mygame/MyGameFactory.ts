//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class MyGameObjectBuilder extends GameObjectBuilder {

    public create(name: string): GameObjectBuilder {
        super.create(name);
        this.gameObject.builder = this;
        return this;
    }

    public addBitmap(x: number, y: number): MyGameObjectBuilder {
        const bitmapCom = this.gameObject.addAs(BitmapComponent);
        bitmapCom.x = x;
        bitmapCom.y = y;
        return this;
    }

    public addTiledMap(tiledMapName: string): MyGameObjectBuilder {
        const tiledMapCom = this.gameObject.addAs(TiledMapComponent);
        tiledMapCom.o = new TiledMap(tiledMapName);
        this.gameObject.addAs(TiledMapViewComponent);
        return this;
    }

    public addCamera2d(halfWidth: number, halfHeight: number, viewScale: number): MyGameObjectBuilder {
        const camera2dCom = this.gameObject.addAs(Camera2dComponent);
        camera2dCom.halfWidth = halfWidth;
        camera2dCom.halfHeight = halfHeight;
        camera2dCom.viewScale = viewScale;
        this.gameObject.addAs(Camera2dDebugViewComponent);
        return this;
    }

    public addPosition(x: number, y: number): MyGameObjectBuilder {
        const posCom = this.gameObject.addAs(PositionComponent);
        posCom.setTo(x, y);
        return this;
    }
}

class MyGameObjectFactory {

    private builder: MyGameObjectBuilder | null = null;

    private static instance: MyGameObjectFactory | null = null;

    public static getInstance(): MyGameObjectFactory {
        if (!MyGameObjectFactory.instance) {
            MyGameObjectFactory.instance = new MyGameObjectFactory;
        }
        return MyGameObjectFactory.instance;
    }

    public static destroy(): void {
        if (MyGameObjectFactory.instance) {
            MyGameObjectFactory.instance.clear();
            MyGameObjectFactory.instance = null;
        }
    }

    public setBuilder(builder: MyGameObjectBuilder): MyGameObjectFactory {
        this.builder = builder;
        return this;
    }

    private constructor() {

    }

    private clear(): void {
        egret.log('MyGameObjectFactory clear');
    }

    public createTestGameObject(x: number, y: number): GameObject {
        const bd = this.builder;
        (bd.create('TestGameObject') as MyGameObjectBuilder)
        .addBitmap(x, y)
        .addCamera2d(60, 100, 1)
        .addPosition(x, y);
        return bd.get();
    }

    public createTestTiledMap(tiledMapName: string): GameObject {
        const bd = this.builder;
        (bd.create('TestTiledMap') as MyGameObjectBuilder)
        .addTiledMap(tiledMapName);
        return bd.get();
    }
}





