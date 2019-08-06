
class Db{
    static getInstance(){
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }
    constructor(name){
        console.log('实例化会触发构造函数');
        this.connent();
    }
    connent(){//实例方法
        console.log(`连接数据库`);
    }
    find(){  //静态方法
        console.log('查询数据库');
    }
}
//实例化  下面多次实例化不好
// var myDb1=new Db();
// var myDb2=new Db();

//单例的时候 只执行一次new Db()
var myDb3=Db.getInstance();
var myDb4=Db.getInstance();
myDb3.find();
myDb4.find();