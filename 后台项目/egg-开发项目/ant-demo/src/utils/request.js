//HTTP工具
const request = async (URL,config = {}) =>{

    //默认配置
    config.method = config.method || 'GET';
    config.headers = config.headers || { 
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8' 
    }

    //序列化请求体
    if(config.body && typeof config.body === 'object'){
        config.body = JSON.stringify(config.body);
    }

    //追加TK
    let loginState = global.loginState;
    if(loginState && !URL.includes('login')){
        Object.assign(config.headers,loginState);
    }
    
    //发起请求（第一项是地址,第二项是请求参数）
    return fetch(URL,config)
            .then((response) => {
                return response.json().then((obj)=>{
                    if(obj.code == 0){
                        return obj;
                    }else{
                        let e = new Error(obj.message||'未知错误');
                        e.code = obj.code;
                        e.message = obj.message;
                        throw e;
                    }
                });
            })
            .catch((e) => {
                let body = {
                    code: e.code || -1,
                    message: e.message
                }
                //判断登录态失效
                if(body.code == 401){
                    body.message = '登录状态发生变化，请重新登录!';
                }
                return body;
            });
}

export default request;