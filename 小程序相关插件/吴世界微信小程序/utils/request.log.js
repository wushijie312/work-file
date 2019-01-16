
/**
 * 日志输出类
 */
class Logger{

    constructor() {
        this.requestConfig = null;  //请求参数
        this.response = null; //响应结果
        this.err = null;    //错误体
    }

    /**
     * 记录请求
     * @param {请求配置} config 
     */
    begin(requestConfig){
        this.requestConfig = requestConfig;
    }

    /**
     * 记录响应
     * @param {响应结果} response 
     */
    end(response){
        this.response = response;
    }

    /**
     * 记录错误
     * @param {Error} e 
     */
    error(e){
        this.err = e;
    }

}

/**
 * 老版HTTP日志输出
 */
class HTTPLogger extends Logger{

    constructor() {
        super();
    }

    /**
     * 打印日志
     */
    print(){
        let { url,method,data,header} = this.requestConfig;
        let response = this.response;
        console.log(`===> 🌎 ${method}:${url} HTTP/1.1`)
        for(let key in header){
            console.log(`${key}:${header[key]}`);
        }
        console.log();
        if(data){
            console.log(JSON.stringify(data))
        }
        
        if(this.err){
            console.log(`💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀`);
            console.log(this.err);
        }else{
            console.log(`🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗`);
            console.log(`status:  ${response.statusCode} ${url}`);
            console.log(response.data);
        }
        
        console.log(`<=== 🌑 ${method}:${url} HTTP/1.1`);
    }
}

/**
 * 新版HTTP日志输出
 */
class RequestLogger extends Logger{

    constructor() {
        super();
    }

    /**
     * 打印日志
     */
    print(){
        let { url,method,data,header} = this.requestConfig;
        let response = this.response;
        console.log(`===> 🌎 ${method}:${url} Request/1.1`)
        for(let key in header){
            console.log(`${key}:${header[key]}`);
        }
        console.log();
        if(data){
            console.log(JSON.stringify(data))
        }

        if(this.err){
            console.log(`💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀`);
            console.log(this.err);
        }else{
            console.log(`🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗🍗`);
            console.log(`status:  ${response.statusCode} ${url}`);
            console.log(response.data);
        }

        console.log(`<=== 🌑 ${method}:${url} Request/1.1`);
    }
}



export{
    RequestLogger,
    HTTPLogger
}
