// 原型链继承和对象冒充
    // 对象冒充继承：没法继承原型链上面的属性和方法
    // 原型链继承：可以继承构造函数里面以及原型链上的属性和方法，实例化子类的时候没发给父类传值


function Person(name,age){
    this.name=name;
    this.age=age;
    this.run=function(){
        console.log(this.name+'----'+this.age);
    }
}
Person.prototype.work=function(){
    console.log('work');
}
//1对象冒充继承
// function Web(name,age){
//     Person.call(this,name,age);
// }
// var web=new Web('lisi',20);
// web.run();
// web.work();

//2原型链继承
// function Web(name,age){
// }
// Web.prototype=new Person();
// var web=new Web('lisi',20);
// web.run();
// web.work();

//3上面两种结合使用
function Web(name,age){
    Person.call(this,name,age);
}
Web.prototype=new Person();
var web=new Web('lisi',20);
web.run();
web.work();