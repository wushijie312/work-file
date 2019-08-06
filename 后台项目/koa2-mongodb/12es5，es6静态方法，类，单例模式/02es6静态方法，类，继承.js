// 类

// class Person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
//
//    getName(){
//         console.log(this.name);
//     }
//     setName(name){
//         this.name=name;
//     }
//
// }
// var p=new Person('zhangsan',20);
// p.getName();
// p.setName('lisi');
// p.getName();

//继承
// class Person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
//
//     getInfo(){
//         console.log(`姓名:${this.name} 年龄${this.age}`);
//     }
//     run(){
//         console.log(`run`);
//     }
//
// }
//
// class Web extends Person{
//     constructor(name,age,sex){
//         super(name,age);//实例化子类的时候把子类数据的数据传给父类
//         this.sex=sex;
//     }
//     print(){
//         console.log(this.sex);
//     }
// }
// var w=new Web('zhangsan',20,'男');
// w.print();


//静态方法

class Person{
    constructor(name){
        this.name=name;//属性
    }
    run(){//实例方法
        console.log(`${this.name}`);
    }
    static work(){  //静态方法
        console.log('这是静态方法');
    }
}
Person.eat="foods";
var p=new Person('zhangsan')

p.run();
Person.work();//这是es6静态方法
console.log(Person.eat);//这是es6静态属性02es6.js