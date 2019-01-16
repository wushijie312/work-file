import axios from 'axios'

const AXIOS_CONFIG_TMEOUT = 30000; //超时时间
var last_unauthorized_time = 0;  //上次发生401错误的时间

//请求拦截器
axios.interceptors.request.use(config => {
    // loading
    return config
}, error => {
    return Promise.reject(error)
})

//相应拦截器
axios.interceptors.response.use((res) => {
    return res
}, (error) => {
    //获取HTTP 401 状态码
    if (error && error.response && error.response.status === 401) {
        if (Date.now() - last_unauthorized_time < 6000) { //如果4000毫秒内连续发生401错误,则只接受一个防止多次弹窗
        } else {
            last_unauthorized_time = Date.now();
            let body = error.response.data;
            try {
                //解析相应体
                body = typeof body === 'string' ? JSON.parse(body) : body;
            } catch (e) {
                // console.log(e);
            } finally {
                if (body.code === 1) {  //登陆失效 {code: 1, msg: "未授权"}
                    localStorage.clear(); //清除本地的数据
                    alert('登录状态失效,请重新登录!');
                    window.location.href = '/'//进去登录页面
                }
            }
        }
    } else {
        //处理未知错误
        alert(error.response.data || error); //未知错误 400 404 500 ...
    }
    return Promise.reject(error)
})


export default {

    /**
    * GET请求 通常用于获取一个静态资源
    * @param {请求地址} url 
    */
    fetch(url) {
        return this.all(url);
    },

    /**
     * POST 请求
     * @param {请求地址} url 
     * @param {请求体} data 
     * @param {请求头} headers 有实参时使用实参,否则使用带Token的默认请求头
     */
    post(url, data, headers) {
        return this.all(url, 'post', data, headers || {
            token: localStorage.getItem('token'),
            brand: localStorage.getItem('brand'),
            'Content-Type': 'application/json'
        })
    },

   /**
    * PUT 请求
    * @param {请求地址} url 
    * @param {请求体} data 
    * @param {请求头} headers 有实参时使用实参,否则使用带Token的默认请求头
    */
    put(url, data, headers) {
        return this.all(url, 'put', data, headers || {
            token: localStorage.getItem('token'),
            brand: localStorage.getItem('brand'),
            'Content-Type': 'application/json'
        })
    },

    /**
     * GET请求
     * @param {请求地址} url 
     * @param {请求参数} data 
     * @param {请求头} headers 有实参时使用实参,否则使用带Token的默认请求头
     */
    get(url, data, headers) {
        return this.all(url, 'get', data, headers || {
            token: localStorage.getItem('token'),
            brand: localStorage.getItem('brand'),
            'Content-Type': 'application/json'
        })
    },

    /**
     * DELETE请求
     * @param {请求地址} url 
     * @param {请求体} data 
     * @param {请求头} headers 有实参时使用实参,否则使用带Token的默认请求头
     */
    delete(url, data, headers) {
        return this.all(url, 'delete', data, headers || {
            token: localStorage.getItem('token'),
            brand: localStorage.getItem('brand'),
            'Content-Type': 'application/json'
        })
    },

    /**
     * 通用的请求方式
     * @param {请求参数} arr 
     */
    all(url, method, data, headers) {
        let options = {
            method,
            url,
            data,
            timeout: AXIOS_CONFIG_TMEOUT,
            headers: headers
        };
        return axios(options).then(response => response.data);
    }

}
