//////////////////////////
//
// ashan ashan@mebius.org
//
//////////////////////////


class MyGameContext extends GameContext {
    public testValue: number = 0;
}

class Main extends ECSApp<MyGameContext> {

    protected start(): void {
        //初始化ECS环境        
        this.createECSContext(ComponentsClassesRegister, 200);
        //初始化游戏上下文
        this.__gamecontext__ = new MyGameContext;
        this.__gamecontext__.clear();
    } 
}
