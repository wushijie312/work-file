// node.js 操作mongo数据库
//1 安装mongo库
//  cnpm install mongodb --save
//  2 引入mongodb下面的MongoClient
// var MongoClient=require('mongodb').MongoClient;
 
//3 定义数据库连接的地址 以及配置数据库
//  koa数据库的名称
//
// var url='mongodb://localhost:27017';
// var dbname='koa'

// 4 node.js 连接数据库
// MongoClient.connect(url,function (err,client) {
//     const db=client.db(dbname);//数据库db对象
// })


// 5 操作数据库

// db.user.insert
// MongoClient.connect(url,function (err,db) {
//     db.collection('user').insertOne({'name':'zhangsan'},function (err,result) {
//         db.close()//关闭连接
//     })
// })

var MongoClient=require('mongodb').MongoClient;
var dbUrl='mongodb://localhost:27017';
var dbName='koa';
//添加数据
//连接数据库
// console.time('start');
// MongoClient.connect(dbUrl,function (err,client) {
//     if(err){
//         console.log(err);
//         return;
//     }
//     const db=client.db(dbName);//数据库db对象
//     //    增加数据
//     db.collection('user').insertOne({'username':'zhangsan',age:23,status:'0',sex:'男'},function (err,result) {
//         if(!err){
//             console.log('增加数据成功');
//             client.close()//关闭连接
//             console.timeEnd('start');
//         }
//
//     })
// })


//查询数据
MongoClient.connect(dbUrl,function (err,client) {
    if(err){
        console.log(err);
        return;
    }
    const db=client.db(dbName);//数据库db对象
    //    增加数据
   var result= db.collection('user').find({'username':'zhangsan'});
   result.toArray((err,docs)=>{
       console.log(docs);
   });
})