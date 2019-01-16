//状态机
import store from '../index';
// import { receiveLoginSuccess } from '../actions'
// const routerRedux = require('react-router-redux');

//HTTP工具
const request = (URL,options = {}) =>{

    //默认配置
    const defaultOptions = {
        // credentials: 'include',
        method: 'GET'
    }

    //结构赋值生成最终配置
    const newOptions = { ...defaultOptions, ...options };
    let m = newOptions.method.toUpperCase();
    if(m === 'POST' || m === 'PUT' || m == 'DELETE'){
        //服务器统一JSON格式
        newOptions.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8' 
        }

        //如传来的是对象时手动转换为字符
        if(newOptions.body && typeof newOptions.body === 'object'){
            newOptions.body = JSON.stringify(newOptions.body);
        }
    }

    //追加Token
    let state = null;
    if(store 
        && (state = store.getState()) 
        && state.currentLoginInfo 
        && state.currentLoginInfo.token){
        newOptions.headers = newOptions.headers || {};
        newOptions.headers['token'] = state.currentLoginInfo.token;
    }

    console.log(newOptions);

    return fetch(URL,newOptions)
            .then((response) => {
                return response.json().then((obj)=>{
                    if(obj.code === 0){
                        return obj;
                    }else{
                        let e = new Error(obj.msg || '未知错误');
                        e.code = obj.code;
                        e.message = obj.msg;
                        throw e;
                    }
                });
            })
            .catch((e) => {
                let body = { code: e.code, msg: e.message}
                //判断登录态失效
                if(body.code === -1){
                    body.msg = '登录状态发生变化，请重新登录!';
                    // store.dispatch(routerRedux.push('/main/file'));
                    //Todo 如何自动跳转
                    
                }
                return body;
            });
}

export default request;