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
        // this.connect();
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
    updata(){

    }
    insert(){

    }
}

var myDb=Db.getInstance();
setTimeout(()=>{
    console.time('start')
    myDb.find('user',{username:'李四'}).then(function (data) {
        // console.log(data);
        console.timeEnd('start')

    });
},100)
setTimeout(()=>{
    console.time('start1')
    myDb.find('user',{username:'李四'}).then(function (data) {
        // console.log(data);
        console.timeEnd('start1')

    });
},3000)
var myDb2=Db.getInstance();
setTimeout(()=>{
    console.time('start3')
    myDb2.find('user',{username:'李四'}).then(function (data) {
        // console.log(data);
        console.timeEnd('start3')

    });
},6000)
setTimeout(()=>{
    console.time('start4')
    myDb2.find('user',{username:'李四'}).then(function (data) {
        // console.log(data);
        console.timeEnd('start4')

    });
},8000)
//输出结果
// start: 1071.404ms
// start1: 4.701ms
// start3: 2.601ms
// start4: 2.638ms