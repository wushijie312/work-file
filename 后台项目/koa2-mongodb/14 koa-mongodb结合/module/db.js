var MongoClient=require('mongodb').MongoClient;
var Config=require('./config.js');
class Db{
    static getInstance(){
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }
    constructor(){
        this.dbClient='';//属性放db对象
        this.connect();//如果这个不隐藏，相当于实例化的时候就连接数据库，运行的时候就连上数据库了，查询数据的时候第一次也快了（隐藏的时候数据库查询比较慢需要连接数据库）
    }
    connect(){//连接数据库
       return new Promise( (res,rej) =>{
           if(!this.dbClient){//解决数据库多次连接问题
               MongoClient.connect(Config.dbUrl,(err,client)=>{
                   if(err){
                       rej(err);
                   }else{
                       var db=client.db(Config.dbName);
                       this.dbClient=db;
                       res(this.dbClient);
                   }
               })
           }else{
               res(this.dbClient);
           }
       })
    }
    find(collectionName,json){
        return new Promise( (res,rej)=> {
            this.connect().then(function (db) {
                var result= db.collection(collectionName).find(json);
                result.toArray((err,docs)=>{
                   if(err){
                       rej(err);
                       return;
                   }
                   res(docs);
                });
            });
        })
    }
    update(collectionName,json1,json2){
        return new Promise((res,rej)=>{
            this.connect().then((db)=>{
                //db.user.update({},{$set:{}})
                db.collection(collectionName).updateOne(json1,{
                    $set:json2
                },function (err,result) {
                    if(err){
                        rej(err);
                        return;
                    }
                    res(result);
                })
            })
        })
    }
    insert(collectionName,json){
        return new Promise((res,rej)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,function (err,result) {
                    if(err){
                        rej(err);
                        return;
                    }
                    res(result);
                })
            })
        })
    }
    remove(collectionName,json){
        return new Promise((res,rej)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(json,function (err,result) {
                    if(err){
                        rej(err);
                        return;
                    }
                    res(result);
                })
            })
        })
    }
}

module.exports=Db.getInstance();
