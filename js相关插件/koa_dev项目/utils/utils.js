function getTimes(time){
	var date = new Date( time  );//.转换成毫秒  
   var time = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) ;  
   return time;
}
function getTimess(time){
	var readStream=fs.createReadStream(file);
    var writeStream=fs.createWriteStream('public/uploads/file');
    readStream.on('data',function(chunk){
        if(writeStream.write(chunk)==false){
            // console.log('still cached');
            readStream.pause();
        };
    });
    readStream.on('end',function(){
        writeStream.end();
    });

    writeStream.on('drain',function(){
        // console.log('data drains');
        readStream.resume();
    });
}

module.exports = {getTimes,getTimess};